const admin = require("firebase-admin");
const database = admin.database();
const userRef = database.ref("users"); // 'users' 컬렉션 참조
const bcrypt = require("bcrypt"); // bcrypt 라이브러리 추가
const SALT_ROUNDS = 10; // 해싱에 사용할 salt 라운드 수
const crypto = require("crypto");

class UserModel {
  constructor(data) {
    this.uid = data.uid || null;
    this.nickname = data.nickname || null;
    this.email = data.email;
    this.password = data.password; // 비밀번호 추가
    this.type = data.type;
    this.phoneNumber = data.phoneNumber || null;
  }

  toJSON() {
    const result = {
      email: this.email,
      type: this.type,
      nickname: this.nickname,
      phoneNumber: this.phoneNumber,
    };

    if (this.password) {
      result.password = this.password;
    }

    if (this.uid) {
      result.uid = this.uid;
    }

    return result;
  }

  async hashPassword() {
    try {
      // 비밀번호 해싱
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    } catch (error) {
      console.error("비밀번호 해싱 중 오류 발생:", error);
      throw new Error("비밀번호를 해싱할 수 없습니다.");
    }
  }

  async create() {
    try {
      // 이메일 중복 체크
      const emailSnapshot = await userRef
        .orderByChild("email")
        .equalTo(this.email)
        .once("value");
      if (emailSnapshot.exists()) {
        throw new Error("이미 사용 중인 이메일입니다.");
      }

      // 닉네임 중복 체크
      const nicknameSnapshot = await userRef
        .orderByChild("nickname")
        .equalTo(this.nickname)
        .once("value");
      if (nicknameSnapshot.exists()) {
        throw new Error("이미 사용 중인 닉네임입니다.");
      }

      // 비밀번호 해싱
      if (this.password) {
        await this.hashPassword();
      }

      // Firebase에 데이터 푸시
      const newUserRef = await userRef.push({
        email: this.email,
        password: this.password, // 해싱된 비밀번호 저장
        type: this.type,
        nickname: this.nickname,
      });

      // uid 설정 후 업데이트
      this.uid = newUserRef.key;
      await newUserRef.update({ uid: this.uid });

      return this;
    } catch (error) {
      console.error("사용자 생성 중 오류 발생:", error);

      // 중복된 이메일 또는 닉네임 오류인 경우, 해당 오류만 던지기
      if (
        error.message === "이미 사용 중인 이메일입니다." ||
        error.message === "이미 사용 중인 닉네임입니다."
      ) {
        throw error; // 중복 오류만 던지고 종료
      }

      // 다른 오류에 대해서만 기본 오류 메시지 던지기
      throw new Error("사용자를 생성할 수 없습니다.");
    }
  }

  static async getUserByEmail(email) {
    try {
      const snapshot = await userRef
        .orderByChild("email")
        .equalTo(email)
        .once("value");
      const userData = snapshot.val();

      if (userData) {
        const userId = Object.keys(userData)[0];
        return { id: userId, ...userData[userId] };
      }
      return null;
    } catch (error) {
      console.error("사용자 조회 중 오류 발생:", error);
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  }

  static async verifyPassword(inputPassword, hashedPassword) {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      throw new Error("비밀번호 검증에 실패했습니다.");
    }
  }

  static async generateVerificationCode(email) {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const code = crypto.randomInt(100000, 999999); // 6자리 인증 코드 생성
      const expiration = Date.now() + 10 * 60 * 1000; // 코드 유효기간 10분
      await userRef
        .child(user.id)
        .update({ verificationCode: code, codeExpiration: expiration });

      return { code, expiration };
    } catch (error) {
      console.error("인증 코드 생성 중 오류 발생:", error);
      throw new Error("인증 코드를 생성할 수 없습니다.");
    }
  }

  static async verifyCode(email, code) {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const { verificationCode, codeExpiration } = user;
      if (!verificationCode || !codeExpiration || Date.now() > codeExpiration) {
        throw new Error("인증 코드가 만료되었습니다.");
      }

      if (parseInt(code, 10) !== verificationCode) {
        throw new Error("잘못된 인증 코드입니다.");
      }

      // 인증 성공 시 인증 코드 제거
      await userRef
        .child(user.id)
        .update({ verificationCode: null, codeExpiration: null });
      return true;
    } catch (error) {
      console.error("인증 코드 검증 중 오류 발생:", error);
      throw error;
    }
  }

  static async resetPassword(email, newPassword) {
    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRef.child(user.id).update({ password: hashedPassword });
      return true;
    } catch (error) {
      console.error("비밀번호 재설정 중 오류 발생:", error);
      throw new Error("비밀번호를 재설정할 수 없습니다.");
    }
  }

  // 사용자 정보를 가져올 때 UserModel 인스턴스를 반환
  static async getUser(userId) {
    const userSnapshot = await userRef.child(userId).once("value");
    const userData = userSnapshot.val();
    if (userData) {
      return new UserModel(userData); // UserModel 인스턴스로 감싸서 반환
    } else {
      return null; // 사용자가 없으면 null 반환
    }
  }

  // 닉네임 업데이트 메소드
  async updateNickname(newNickname) {
    try {
      // 닉네임 중복 체크
      const nicknameSnapshot = await userRef
        .orderByChild("nickname")
        .equalTo(newNickname)
        .once("value");

      if (nicknameSnapshot.exists()) {
        throw new Error("이미 사용 중인 닉네임입니다.");
      }

      // 닉네임 업데이트
      await userRef.child(this.uid).update({ nickname: newNickname });
      this.nickname = newNickname; // 모델의 nickname도 업데이트

      return this;
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
      throw new Error("닉네임을 변경할 수 없습니다.");
    }
  }
}

module.exports = UserModel;
