const jwt = require("jsonwebtoken");

require("dotenv").config();

/**
 * 인증 미들웨어
 * Authorization 헤더에서 Bearer token을 추출하고, 이를 검증하여 사용자 정보를 요청에 첨부
 */
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 비밀키로 JWT 검증
    req.user = decoded; // 사용자 정보 추가
    next(); // 인증된 사용자는 다음 미들웨어로 진행
  } catch (error) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
}

module.exports = { authenticateUser };
