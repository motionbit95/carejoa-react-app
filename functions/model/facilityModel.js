const admin = require("firebase-admin");
const database = admin.database();
const facilitiesRef = database.ref("facilities"); // 'facilities' 컬렉션 참조

class FacilityModel {
  /*
     "adminNm": "연세재가복지센터",
  "adminPttnCd": "C02",
  "BDongCd": 102,
  "gunmulMlno": 1414,
  "gunmulSlno": 0,
  "HDongCd": 630,
  "hmPostNo": "08548",
  "locTelNo_1": "02",
  "locTelNo_2": 830,
  "locTelNo_3": 7942,
  "longTermAdminSym": 31154500218,
  "longTermPeribRgtDt": 20190201,
  "riCd": "00",
  "roadNmCd": 115452000003,
  "siDoCd": 11,
  "siGunGuCd": 545,
  "stpRptDt": 20190201
    */
  constructor(data) {
    this.adminNm = data.adminNm || null; // 장기요양기관이름
    this.adminPttnCd = data.adminPttnCd || null; // 기관유형코드
    this.BDongCd = data.BDongCd || null; // 법정동코드
    this.gunmulMlno = data.gunmulMlno || null; // 건물본번
    this.gunmulSlno = data.gunmulSlno || null; // 건물본번
    this.HDongCd = data.HDongCd || null; // 행정동코드
    this.hmPostNo = data.hmPostNo || null; // 행망우편번호
    this.locTelNo_1 = data.locTelNo_1 || null; // 소재지전화번호-지역
    this.locTelNo_2 = data.locTelNo_2 || null; // 소재지전화번호-국번
    this.locTelNo_3 = data.locTelNo_3 || null; // 소재지전화번호-번호
    this.longTermAdminSym = data.longTermAdminSym || null; // 장기요양기관기호
    this.longTermPeribRgtDt = data.longTermPeribRgtDt || null; // 장기요양기관지정일
    this.riCd = data.riCd || null; // 리코드
    this.roadNmCd = data.roadNmCd || null; // 도로명코드
    this.siDoCd = data.siDoCd || null; // 시도코드
    this.siGunGuCd = data.siGunGuCd || null; // 시군구코드
    this.stpRptDt = data.stpRptDt || null; // 설치신고일자
  }
}
module.exports = FacilityModel;
