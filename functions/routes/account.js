var express = require("express");
const UserModel = require("../model/userModel");
const { sendEmail } = require("../util/mailer");
var router = express.Router();
const { authenticateUser } = require("../util/authenticateUser"); // 인증 미들웨어
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 API
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
 *           description: The email of the user
 *           example: test1@example.com
 *         type:
 *           type: string
 *           description: The type of the user
 *           example: person
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: 1q2w3e4r!
 *         nickname:
 *           type: string
 *           description: The nickname of the user
 *           example: John Doe
 *
 * /users/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 회원가입 API
 *     description: 신규 유저를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully created user
 */
router.post("/signup", async function (req, res, next) {
  try {
    const { email, type, password, nickname } = req.body;

    // 필수 필드 확인
    if (!email || !type || !password || !nickname) {
      return res.status(400).json({
        message:
          "email, type, password, nickname, phoneNumber는 필수 항목입니다.",
      });
    }

    // UserModel 생성 및 저장
    const user = new UserModel({
      email,
      type,
      password,
      nickname,
    });
    const createdUser = await user.create();

    // 성공 응답
    res.status(201).json({
      message: "사용자가 성공적으로 생성되었습니다.",
      user: createdUser.toJSON(),
    });
  } catch (error) {
    console.error("사용자 생성 중 오류:", error);
    res
      .status(500)
      .json({ message: "사용자 생성 중 오류", error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 계정 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: test1@example.com
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: 1q2w3e4r!
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         user:
 *           type: object
 *           properties:
 *             uid:
 *               type: string
 *               description: The unique ID of the user
 *             email:
 *               type: string
 *               description: The email of the user
 *             type:
 *               type: string
 *               description: The type of the user
 *
 * /users/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 로그인
 *     description: 이메일 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 필수 필드 검증
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email과 password는 필수 항목입니다." });
    }

    // 사용자 조회
    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 검증
    const isPasswordValid = await UserModel.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "잘못된 비밀번호입니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // 토큰 만료 시간 (24시간)
      }
    );

    // 로그인 성공
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
 *           description: User's email
 *           example: test1@example.com
 *     VerifyCodeRequest:
 *       type: object
 *       required:
 *         - email
 *         - code
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         code:
 *           type: string
 *           description: Verification code
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         newPassword:
 *           type: string
 *           description: New password
 *
 * /users/password/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 비밀번호 찾기 - 인증코드 전송
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Verification code sent
 *
 * /users/password/verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 비밀번호 찾기 - 인증코드 확인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyCodeRequest'
 *     responses:
 *       200:
 *         description: Code verified successfully
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
 *         description: Password reset successfully
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
 *     summary: Update user's nickname
 *     description: Updates the user's nickname after checking for duplication.
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
 *                 description: The new nickname for the user.
 *     responses:
 *       200:
 *         description: Nickname updated successfully.
 *       400:
 *         description: Invalid nickname or already taken.
 *       500:
 *         description: Internal server error.
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
