const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hospital
 *   description: 요양병원 API
 */

/**
 * @swagger
 * /hospital:
 *   post:
 *     summary: 요양병원 정보 조회
 *     tags: [Hospital]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sidoCd:
 *                 type: string
 *                 description: 시도 코드
 *               sgguCd:
 *                 type: string
 *                 description: 시군구 코드
 *     responses:
 *       200:
 *         description: 요양병원 정보를 찾었습니다.
 *       400:
 *         description: 요양병원 정보를 찾을 수 없습니다.
 */
router.post("/", function (req, res, next) {
  // sidoCd와 sgguCd는 let으로 선언하여 값을 수정 가능하게 합니다.
  let { sidoCd, sgguCd, pageNo = 1, pageSize = 10 } = req.body;

  console.log(pageSize);

  if (!sidoCd) {
    sidoCd = "";
  } else if (sidoCd.length === 2) {
    sidoCd = sidoCd + "0000"; // 2자리 sidoCd는 뒤에 "0000"을 추가
  } else {
    sidoCd = sidoCd.padStart(6, "0"); // 3자리 이상이면 6자리로 패딩
  }

  // sgguCd가 비어 있으면 sidoCd와 동일하게 처리
  if (!sgguCd) {
    sgguCd = "";
  }

  const url = `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=${process.env.SERVICE_KEY}&sidoCd=${sidoCd}&sgguCd=${sgguCd}&numOfRows=${pageSize}&pageNo=${pageNo}&clCd=28&resultType=json`;

  axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data.response.body);
    })
    .catch((error) => {
      res.status(400).json({ message: "요양병원 정보를 찾을 수 없습니다." });
    });
});

module.exports = router;
