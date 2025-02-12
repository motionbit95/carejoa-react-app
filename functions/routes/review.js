const express = require("express");
const ReviewModel = require("../model/reviewModel");
const router = express.Router();

const reviewModel = new ReviewModel();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: 리뷰 API
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: 리뷰 생성
 *     description: 새로운 리뷰 항목을 생성합니다.
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 리뷰 내용
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
 *         description: 성공적으로 리뷰가 생성됨
 */
router.post("/", async (req, res) => {
  const result = await reviewModel.createReview(req.body);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: 리뷰 조회
 *     description: 리뷰 ID로 특정 리뷰 항목을 조회합니다.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰 항목이 성공적으로 조회됨
 */
router.get("/:id", async (req, res) => {
  const result = await reviewModel.getReviewById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: 리뷰 수정
 *     description: 리뷰 ID를 사용하여 특정 리뷰 항목을 수정합니다.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 리뷰 내용
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
 *         description: 성공적으로 리뷰가 수정됨
 */
router.patch("/:id", async (req, res) => {
  const result = await reviewModel.updateReview(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: 리뷰 삭제
 *     description: 리뷰 ID를 사용하여 특정 리뷰 항목을 삭제합니다.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰 ID
 *     responses:
 *       200:
 *         description: 성공적으로 리뷰가 삭제됨
 */
router.delete("/:id", async (req, res) => {
  const result = await reviewModel.deleteReview(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: 모든 리뷰 조회
 *     description: 모든 리뷰 항목을 조회합니다.
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: 모든 리뷰 항목이 성공적으로 조회됨
 */
router.get("", async (req, res) => {
  const result = await reviewModel.getAllReviews();
  res.status(result.success ? 200 : 404).json(result);
});

module.exports = router;
