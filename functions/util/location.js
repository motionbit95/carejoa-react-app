const fs = require("fs");
const path = require("path");

// location_data.json 파일을 로드하는 함수
async function loadLocationData(format) {
  try {
    const filePath = path.join(__dirname, `${format}_location_data.json`); // 상대 경로로 지정
    const rawData = await fs.promises.readFile(filePath, "utf-8"); // 비동기 방식으로 파일 읽기
    return JSON.parse(rawData);
  } catch (error) {
    console.error("파일 읽기 중 오류 발생:", error);
    return null;
  }
}

// 주어진 코드로 지역 이름을 반환하는 함수
async function getLocationByCode(format, code) {
  const locationData = await loadLocationData(format);
  if (!locationData) return null;

  for (const regionCode in locationData) {
    const regions = locationData[regionCode];
    for (const regionName in regions) {
      const cities = regions[regionName];
      for (const city of cities) {
        if (city.code === code) {
          return [regionName, city.name];
        }
      }
    }
  }

  return null; // 해당하는 코드가 없으면 null 반환
}

// 주어진 코드를 입력하면 해당 지역의 구 목록을 반환하는 함수
async function getCitiesByRegionCode(format, regionCode) {
  const locationData = await loadLocationData(format);
  if (!locationData) return null;

  // 지역 코드에 해당하는 지역 목록을 찾기
  const region = locationData[regionCode];
  if (region) {
    const cities = region[Object.keys(region)[0]]; // 첫 번째 지역(예: 서울)을 선택하여 구 목록을 가져옴
    return cities; //.map((city) => city.name); // 해당 지역의 구 이름만 배열로 반환
  } else {
    return null; // 해당 지역 코드가 없으면 null 반환
  }
}

module.exports = {
  loadLocationData,
  getLocationByCode,
  getCitiesByRegionCode,
};
