const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  CounselingQuestionModel,
  CounselingModel,
} = require("../model/counselingModel");

// counseling_question_data.json 파일을 로드하는 함수
async function loadLocationData(format) {
  try {
    const filePath = path.join(__dirname, "counseling_question_data.json"); // 상대 경로로 지정
    const rawData = await fs.promises.readFile(filePath, "utf-8"); // 비동기 방식으로 파일 읽기
    return JSON.parse(rawData);
  } catch (error) {
    console.error("파일 읽기 중 오류 발생:", error);
    return null;
  }
}

/**
 * @swagger
 * tags:
 *   name: Counseling
 *   description: Counseling API
 */

/**
 * @swagger
 * /counseling/question:
 *   get:
 *     tags: [Counseling]
 *     summary: Counseling data
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/question", async (req, res) => {
  const data = await loadLocationData("counseling");

  if (!data) {
    return res.status(404).json({ message: "Counseling data not found" });
  }

  data.sort((a, b) => a.index - b.index);

  data.forEach((element) => {
    const question = new CounselingQuestionModel(element);
    console.log(question);
  });

  res.send(data);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CounselingRequest:
 *       type: object
 *       required:
 *         - uid
 *         - answer
 *       properties:
 *         uid:
 *           type: string
 *           description: The unique ID of the user
 *         answer:
 *           type: array
 *           description: The answer of the user
 * /counseling:
 *   post:
 *     tags: [Counseling]
 *     summary: Counseling data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CounselingRequest'
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/", async (req, res) => {
  const { uid, answer } = req.body;

  if (!uid || !answer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const question = await loadLocationData("counseling");

  answer.forEach((element, index) => {
    console.log(index, element);
    question[index].answer = element;
  });

  console.log(question);

  const counseling = new CounselingModel({
    answer: question,
    state: "waiting",
    createdAt: new Date(),
    uid,
  });

  const counselingData = await counseling.create();

  res.status(200).json(counselingData);
});

/**
 * @swagger
 * /counseling/{uid}:
 *   get:
 *     tags: [Counseling]
 *     summary: Counseling data
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:uid", async (req, res) => {
  const counselingData = await CounselingModel.findAllByUid(req.params.uid);

  res.status(200).json(counselingData);
});

module.exports = router;
