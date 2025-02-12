var express = require("express");
const UserModel = require("../model/userModel");
const { sendEmail } = require("../util/mailer");
var router = express.Router();
const { authenticateUser } = require("../util/authenticateUser"); // 인증 미들웨어
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("응답 성공");
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - type
 *         - password
 *         - nickname
 *       properties:
 *         email:
 *           type: string
 *           description: 사용자의 이메일
 *           example: test1@example.com
 *         type:
 *           type: string
 *           description: 사용자의 유형
 *           example: person
 *         password:
 *           type: string
 *           description: 사용자의 비밀번호
 *           example: 1q2w3e4r!
 *         nickname:
 *           type: string
 *           description: 사용자의 닉네임
 *           example: John Doe
 *
 * /users/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 회원가입 API
 *     description: 새로운 사용자를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: 사용자 생성 성공
 */
router.post("/signup", async function (req, res, next) {
  try {
    const { email, type, password, nickname } = req.body;

    if (!email || !type || !password || !nickname) {
      return res.status(400).json({
        message: "email, type, password, nickname은 필수 항목입니다.",
      });
    }

    const user = new UserModel({
      email,
      type,
      password,
      nickname,
    });
    const createdUser = await user.create();

    res.status(201).json({
      message: "사용자가 성공적으로 생성되었습니다.",
      user: createdUser.toJSON(),
    });
  } catch (error) {
    console.error("사용자 생성 중 오류:", error);
    res
      .status(500)
      .json({ message: "사용자 생성 중 오류 발생", error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 API
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 * /users/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 로그인 API
 *     description: 이메일을 사용하여 로그인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 잘못된 인증 정보
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email과 password는 필수 항목입니다." });
    }

    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const isPasswordValid = await UserModel.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "잘못된 비밀번호입니다." });
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "로그인 성공",
      user: {
        uid: user.id,
        email: user.email,
        type: user.type,
        token: token,
      },
    });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).json({
      message: "로그인 중 문제가 발생했습니다.",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: 사용자의 이메일
 *           example: test1@example.com
 *     VerifyCodeRequest:
 *       type: object
 *       required:
 *         - email
 *         - code
 *       properties:
 *         email:
 *           type: string
 *           description: 사용자의 이메일
 *         code:
 *           type: string
 *           description: 인증 코드
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           description: 사용자의 이메일
 *         newPassword:
 *           type: string
 *           description: 새로운 비밀번호
 *
 * /users/password/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 비밀번호 찾기 - 인증 코드 전송
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: 인증 코드가 전송됨
 *
 * /users/password/verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 비밀번호 찾기 - 인증 코드 확인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyCodeRequest'
 *     responses:
 *       200:
 *         description: 인증 코드가 확인됨
 *
 * /users/password/reset:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 비밀번호 찾기 - 비밀번호 재설정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: 비밀번호가 성공적으로 재설정됨
 */
// 비밀번호 찾기 - 인증 코드 요청
router.post("/password/forgot", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "이메일을 입력하세요." });
    }

    const { code } = await UserModel.generateVerificationCode(email);

    // 이메일 전송 로직 (생략)
    console.log(`인증 코드: ${code}`); // 실제로는 이메일 발송

    // 이메일 전송
    const subject = "비밀번호 재설정을 위한 인증 코드";
    const text = `안녕하세요,\n\n다음 인증 코드를 입력하여 비밀번호를 재설정하세요: ${code}\n\n인증 코드는 10분 동안 유효합니다.\n\n감사합니다.`;
    await sendEmail(email, subject, text);

    res.status(200).json({ message: "인증 코드가 발송되었습니다." });
  } catch (error) {
    res.status(500).json({
      message: "비밀번호 찾기 요청 중 오류 발생",
      error: error.message,
    });
  }
});

// 인증 코드 검증
router.post("/password/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "이메일과 인증 코드를 입력하세요." });
    }

    const isValid = await UserModel.verifyCode(email, code);

    if (isValid) {
      res.status(200).json({ message: "인증 코드가 확인되었습니다." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 비밀번호 재설정
router.post("/password/reset", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "이메일과 새 비밀번호를 입력하세요." });
    }

    await UserModel.resetPassword(email, newPassword);
    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "비밀번호 변경 중 오류 발생", error: error.message });
  }
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  // JWT 토큰 형식을 사용한다고 명시
 */

/**
 * @swagger
 * /users/nickname:
 *   put:
 *     tags:
 *       - Users
 *     summary: 사용자의 닉네임 변경
 *     description: 닉네임 중복 확인 후 사용자의 닉네임을 변경합니다.
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newNickname:
 *                 type: string
 *                 description: 사용자의 새로운 닉네임
 *     responses:
 *       200:
 *         description: 닉네임이 성공적으로 변경됨.
 *       400:
 *         description: 잘못된 닉네임이거나 이미 사용 중인 닉네임.
 *       500:
 *         description: 서버 내부 오류.
 */
router.put("/nickname", authenticateUser, async (req, res) => {
  try {
    const { newNickname } = req.body;
    const userId = req.user.uid; // 인증된 사용자의 uid를 가져옵니다.

    if (!newNickname) {
      return res.status(400).json({ message: "새로운 닉네임을 입력해주세요." });
    }

    const user = await UserModel.getUser(userId); // 사용자 정보 가져오기
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 닉네임 업데이트
    const updatedUser = await user.updateNickname(newNickname);

    res.status(200).json({
      message: "닉네임이 성공적으로 변경되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("닉네임 변경 중 오류 발생:", error);
    res
      .status(400)
      .json({ message: error.message || "닉네임 변경에 실패했습니다." });
  }
});

module.exports = router;
