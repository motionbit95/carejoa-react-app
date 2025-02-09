const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Facility
 *   description: 요양원 API
 */

/**
 * @swagger
 * /facility:
 *   post:
 *     summary: 요양원 정보 조회
 *     tags: [Facility]
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
 *         description: 요양원 정보 조회 성공
 *       400:
 *         description: 요양원 정보 조회 실패
 */
router.post("/", function (req, res, next) {
  // sidoCd와 sgguCd는 let으로 선언하여 값을 수정 가능하게 합니다.
  let { sidoCd, sgguCd } = req.body;

  if (!sidoCd) {
    res.status(400).json({ message: "시도 코드를 입력해주세요." });
  }

  // sgguCd가 비어 있으면 sidoCd와 동일하게 처리
  if (!sgguCd) {
    sgguCd = "";
  }

  console.log(sidoCd, sgguCd);

  const url = `http://apis.data.go.kr/B550928/searchLtcInsttService01/getLtcInsttSeachList01?serviceKey=${process.env.SERVICE_KEY}&siDoCd=${sidoCd}&siGunGuCd=${sgguCd}&numOfRows=10&pageNo=1&resultType=json`;

  axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json({ message: "요양원 정보를 찾을 수 없습니다." });
    });
});

/**
 * @swagger
 * /facility/detail:
 *   post:
 *     summary: 요양원 정보 조회
 *     tags: [Facility]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longTermAdminSym:
 *                 type: string
 *                 description: 요양원 정보 조회
 *               adminPttnCd:
 *                 type: string
 *                 description: 요양원 정보 조회
 *     responses:
 *       200:
 *         description: 요양원 정보 조회 성공
 *       400:
 *         description: 요양원 정보 조회 실패
 */
router.post("/detail", function (req, res, next) {
  const { longTermAdminSym, adminPttnCd } = req.body;

  if (!longTermAdminSym || !adminPttnCd) {
    res.status(400).json({ message: "요양원 정보를 찾을 수 없습니다." });
  }

  var data = {};
  // 일반현황 상세 정보조회
  const url = `http://apis.data.go.kr/B550928/getLtcInsttDetailInfoService02/getGeneralSttusDetailInfoItem02?longTermAdminSym=${longTermAdminSym}&adminPttnCd=${adminPttnCd}&serviceKey=${process.env.SERVICE_KEY}&resultType=json`;
  axios
    .get(url)
    .then((response) => {
      data = response.data.response.body.items
        ? response.data.response.body.items[0]
        : response.data.response.body.item;
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: "요양원 정보를 찾을 수 없습니다." });
    });

  console.log(longTermAdminSym, adminPttnCd);
  //   res.status(200).json({ longTermAdminSym, adminPttnCd });
});

module.exports = router;
