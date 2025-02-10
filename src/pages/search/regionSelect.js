import React, { useState } from "react";
import { Select, Row, Col } from "antd";
import { hospital_location, facility_location } from "./location"; // Assuming both are imported

const { Option } = Select;

const RegionSelect = (props) => {
  const { setRegion, setAdminPttnCd, visibleType = true } = props;
  const [province, setProvince] = useState("11");
  const [city, setCity] = useState(null);
  const [locationType, setLocationType] = useState("hospital"); // Default to 'facility'

  const handleProvinceChange = (value) => {
    setProvince(value);
    setCity(null); // Reset city when province changes
    setRegion({ province: value, city: null });
  };

  const handleCityChange = (value) => {
    setCity(value);
    setRegion({ province: province, city: value });
  };

  const handleLocationTypeChange = (value) => {
    setAdminPttnCd(facility[value]);
    setLocationType(value); // Update the location type (hospital or facility)
    setProvince(null); // Reset province and city when location type changes
    setCity(null);
  };

  const facility = {
    hospital: null,
    요양원: ["A01", "A02", "A03"],
    노인요양공동생활가정: ["A04", "S41"],
    재가노인복지시설: ["B01", "B02", "B03", "B04", "B05"],
    재가장기요양기관: ["C01", "C02", "C03", "C04", "C05"],
    방문요양: ["B01", "C01"],
    방문목욕: ["B02", "C02"],
    주야간보호: ["B03", "C03"],
    단기보호: ["B04", "C04"],
    방문간호: ["B05", "C05"],
    치매전담실: [
      "G31",
      "G32",
      "G33",
      "G34",
      "G35",
      "G36",
      "H31",
      "H32",
      "H33",
      "I31",
      "I32",
      "I33",
      "M31",
      "M32",
      "M33",
      "M34",
      "S41",
    ],
  };
  // Select location type (hospital or facility)
  const locationTypeOptions = [
    { value: "hospital", label: "요양병원" },
    { value: "요양원", label: "요양원" },
    { value: "노인요양공동생활가정", label: "노인요양공동생활가정" },
    { value: "재가노인복지시설", label: "재가노인복지시설" },
    { value: "재가장기요양기관", label: "재가장기요양기관" },
    { value: "방문요양", label: "방문요양" },
    { value: "방문목욕", label: "방문목욕" },
    { value: "주야간보호", label: "주야간보호" },
    { value: "단기보호", label: "단기보호" },
    { value: "방문간호", label: "방문간호" },
    { value: "치매전담실", label: "치매전담실" },
  ];

  // Generate options for provinces based on location type
  const locationData =
    locationType === "hospital" ? hospital_location : facility_location;

  const provinceOptions = Object.keys(locationData).map((key) => {
    const provinceName = Object.keys(locationData[key])[0];
    return (
      <Option key={key} value={key}>
        {provinceName}
      </Option>
    );
  });

  // Generate options for cities based on selected province
  const cityOptions = province
    ? locationData[province][Object.keys(locationData[province])[0]].map(
        (city) => (
          <Option key={city.code} value={city.code}>
            {city.name}
          </Option>
        )
      )
    : [];

  // Add "All" option to both Selects
  // provinceOptions.unshift(
  //   <Option key="allProvince" value={null}>
  //     전체
  //   </Option>
  // );
  cityOptions.unshift(
    <Option key="allCity" value={null}>
      전체
    </Option>
  );

  return (
    <Row gutter={[8, 8]}>
      {/* Location Type Selector */}
      <Col span={24} style={{ display: visibleType ? "block" : "none" }}>
        <Select
          value={locationType}
          onChange={handleLocationTypeChange}
          style={{ width: "100%" }}
          placeholder="시설형태"
          size="large"
        >
          {locationTypeOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Col>

      {/* Province Selector */}
      <Col span={12}>
        <Select
          placeholder="지역을 선택하세요"
          value={province}
          onChange={handleProvinceChange}
          style={{ width: "100%" }}
          size="large"
        >
          {provinceOptions}
        </Select>
      </Col>

      {/* City Selector */}
      <Col span={12}>
        <Select
          placeholder="도시를 선택하세요"
          value={city}
          onChange={handleCityChange}
          style={{ width: "100%" }}
          disabled={!province}
          size="large"
        >
          {cityOptions}
        </Select>
      </Col>
    </Row>
  );
};

export default RegionSelect;
