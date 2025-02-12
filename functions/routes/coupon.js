const CouponModel = require("../model/couponModel");

const express = require("express");
const router = express.Router();
const couponModel = new CouponModel();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: 쿠폰 API
 */

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: 쿠폰 생성
 *     description: 새로운 쿠폰 항목을 생성합니다.
 *     tags:
 *       - Coupons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: 쿠폰 코드
 *               description:
 *                 type: string
 *                 description: 쿠폰 설명
 *               discount:
 *                 type: number
 *                 description: 할인 금액 또는 비율
 *               division:
 *                 type: string
 *                 description: 발급 대상 (기관 / 개인)
 *               expire:
 *                 type: string
 *                 format: date-time
 *                 description: 쿠폰 만료일
 *               title:
 *                 type: string
 *                 description: 쿠폰명
 *               type:
 *                 type: string
 *                 description: 쿠폰 타입
 *     responses:
 *       200:
 *         description: 성공적으로 쿠폰이 생성됨
 */
router.post("/", async (req, res) => {
  const result = await couponModel.createCoupon(req.body);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: 쿠폰 조회
 *     description: 쿠폰 ID로 특정 쿠폰 항목을 조회합니다.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 쿠폰 ID
 *     responses:
 *       200:
 *         description: 쿠폰 항목이 성공적으로 조회됨
 */
router.get("/:id", async (req, res) => {
  const result = await couponModel.getCouponById(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /coupons/{id}:
 *   patch:
 *     summary: 쿠폰 수정
 *     description: 쿠폰 ID를 사용하여 특정 쿠폰 항목을 수정합니다.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 쿠폰 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: 쿠폰 코드
 *               description:
 *                 type: string
 *                 description: 쿠폰 설명
 *               discount:
 *                 type: number
 *                 description: 할인 금액 또는 비율
 *               division:
 *                 type: string
 *                 description: 발급 대상
 *               expire:
 *                 type: string
 *                 format: date-time
 *                 description: 쿠폰 만료일
 *               title:
 *                 type: string
 *                 description: 쿠폰명
 *               type:
 *                 type: string
 *                 description: 쿠폰 타입
 *     responses:
 *       200:
 *         description: 성공적으로 쿠폰이 수정됨
 */
router.patch("/:id", async (req, res) => {
  const result = await couponModel.updateCoupon(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: 쿠폰 삭제
 *     description: 쿠폰 ID를 사용하여 특정 쿠폰 항목을 삭제합니다.
 *     tags:
 *       - Coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 쿠폰 ID
 *     responses:
 *       200:
 *         description: 성공적으로 쿠폰이 삭제됨
 */
router.delete("/:id", async (req, res) => {
  const result = await couponModel.deleteCoupon(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: 모든 쿠폰 조회
 *     description: 모든 쿠폰 항목을 조회합니다.
 *     tags:
 *       - Coupons
 *     responses:
 *       200:
 *         description: 모든 쿠폰 항목이 성공적으로 조회됨
 */
router.get("", async (req, res) => {
  const result = await couponModel.getAllCoupons();
  res.status(result.success ? 200 : 404).json(result);
});

module.exports = router;
