const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  EstimateModel,
  EstimateQuestionModel,
} = require("../model/estimateModel");

// estimate_question_data.json 파일을 로드하는 함수
async function loadLocationData(format) {
  try {
    const filePath = path.join(__dirname, "estimate_question_data.json"); // 상대 경로로 지정
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
 *   name: Estimate
 *   description: Estimate API
 */

/**
 * @swagger
 * /estimate/question:
 *   get:
 *     tags: [Estimate]
 *     summary: Estimate data
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/question", async (req, res) => {
  const data = await loadLocationData("estimate");

  if (!data) {
    return res.status(404).json({ message: "Estimate data not found" });
  }

  data.sort((a, b) => a.index - b.index);

  data.forEach((element) => {
    const question = new EstimateQuestionModel(element);
    console.log(question);
  });

  res.send(data);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     EstimateRequest:
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
 * /estimate:
 *   post:
 *     tags: [Estimate]
 *     summary: Estimate data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstimateRequest'
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/", async (req, res) => {
  const { uid, answer } = req.body;

  if (!uid || !answer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const question = await loadLocationData("estimate");

  answer.forEach((element, index) => {
    console.log(index, element);
    question[index].answer = element;
  });

  console.log(question);

  const estimate = new EstimateModel({
    answer: question,
    state: "waiting",
    createdAt: new Date(),
    uid,
  });

  const estimateData = await estimate.create();

  res.status(200).json(estimateData);
});

/**
 * @swagger
 * /estimate/{uid}:
 *   get:
 *     tags: [Estimate]
 *     summary: Estimate data
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
  const estimateData = await EstimateModel.findAllByUid(req.params.uid);

  res.status(200).json(estimateData);
});

module.exports = router;
