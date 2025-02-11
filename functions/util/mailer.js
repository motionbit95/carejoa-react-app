const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail", // Gmail을 사용하는 경우
  auth: {
    user: process.env.EMAIL_USER, // 발신자 이메일 주소
    pass: process.env.EMAIL_PASS, // 발신자 이메일 비밀번호 또는 앱 비밀번호
  },
});

/**
 * 이메일 전송 함수
 * @param {string} to - 수신자 이메일
 * @param {string} subject - 이메일 제목
 * @param {string} text - 이메일 본문
 */
async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"케어조아" <${process.env.EMAIL_USER}>`, // 발신자 정보
      to, // 수신자 이메일
      subject, // 제목
      text, // 본문 내용
    });

    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("이메일을 전송하는 데 실패했습니다.");
  }
}

module.exports = { sendEmail };
