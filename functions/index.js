const functions = require("firebase-functions");
const express = require("express");

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello from Express in Firebase Functions!");
});

// Firebase Functions에 Express 앱을 연결
exports.api = functions.https.onRequest(app);
