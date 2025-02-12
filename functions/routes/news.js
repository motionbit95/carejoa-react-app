const express = require("express");
const NewsModel = require("../model/newsModel");
const router = express.Router();

const newsModel = new NewsModel();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: 뉴스 API
 */

/**
 * @swagger
 * /news:
 *   post:
 *     summary: 뉴스 생성
 *     description: 새로운 뉴스 항목을 생성합니다.
 *     tags:
 *       - News
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 뉴스 내용
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: 작성 시간
 *               facility:
 *                 type: string
 *                 description: 관련 시설
 *               urlList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL 목록
 *               userId:
 *                 type: string
 *                 description: 작성자 UID
 *     responses:
 *       200:
 *         description: 성공적으로 뉴스가 생성됨
 */
router.post("/", async (req, res) => {
  const result = await newsModel.createNews(req.body);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: 뉴스 조회
 *     description: 뉴스 ID로 특정 뉴스 항목을 조회합니다.
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     responses:
 *       200:
 *         description: 뉴스 항목이 성공적으로 조회됨
 */
router.get("/:id", async (req, res) => {
  const result = await newsModel.getNewsById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /news/{id}:
 *   patch:
 *     summary: 뉴스 수정
 *     description: 뉴스 ID를 사용하여 특정 뉴스 항목을 수정합니다.
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 뉴스 내용
 *               facility:
 *                 type: string
 *                 description: 관련 시설
 *               urlList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URL 목록
 *     responses:
 *       200:
 *         description: 성공적으로 뉴스가 수정됨
 */
router.patch("/:id", async (req, res) => {
  const result = await newsModel.updateNews(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: 뉴스 삭제
 *     description: 뉴스 ID를 사용하여 특정 뉴스 항목을 삭제합니다.
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 뉴스 ID
 *     responses:
 *       200:
 *         description: 성공적으로 뉴스가 삭제됨
 */
router.delete("/:id", async (req, res) => {
  const result = await newsModel.deleteNews(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /news:
 *   get:
 *     summary: 모든 뉴스 조회
 *     description: 모든 뉴스 항목을 조회합니다.
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: 모든 뉴스 항목이 성공적으로 조회됨
 */
router.get("", async (req, res) => {
  const result = await newsModel.getAllNews();
  res.status(result.success ? 200 : 404).json(result.data);
});

module.exports = router;
