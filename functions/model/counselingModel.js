const admin = require("firebase-admin");
const database = admin.database();
const counselingRef = database.ref("counselings"); // 'counselings' 컬렉션 참조

class CounselingQuestionModel {
  constructor(data) {
    this.index = data.index || null; // 문항 순서
    this.question = data.question || null; // 질문
    this.answer = data.answer || null; // 선지
    this.type = data.type || null; // 응답 타입
  }
}

class CounselingModel {
  constructor(data) {
    this.answer = data.answer || null; // 답변 리스트
    this.createdAt = data.createdAt || null; // 제출 시간
    this.state = data.state || null; // 설문 상태
    this.uid = data.uid || null; // 사용자 아이디
  }

  toJSON() {
    return {
      answer: this.answer,
      createdAt: this.createdAt,
      state: this.state,
      uid: this.uid,
    };
  }

  async create() {
    try {
      const newCounselingRef = await counselingRef.push(this.toJSON());
      const id = newCounselingRef.key;

      return { id, ...this.toJSON() };
    } catch (error) {
      console.error("Error creating counseling:", error);
      throw error;
    }
  }

  static async findAllByUid(uid) {
    try {
      const snapshot = await counselingRef
        .orderByChild("uid")
        .equalTo(uid)
        .once("value");

      const data = snapshot.val();

      // 데이터를 배열로 변환
      if (data) {
        return Object.keys(data).map((key) => ({
          id: key, // 키를 포함하려면
          ...data[key],
        }));
      }

      return []; // 데이터가 없을 경우 빈 배열 반환
    } catch (error) {
      console.error("Error fetching counseling by uid:", error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const snapshot = await counselingRef.once("value");
      return snapshot.val();
    } catch (error) {
      console.error("Error fetching counseling by id:", error);
      throw error;
    }
  }
}

module.exports = {
  CounselingModel,
  CounselingQuestionModel,
};
