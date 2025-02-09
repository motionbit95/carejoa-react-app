import React, { useEffect, useState } from "react";
import { PushpinTwoTone } from "@ant-design/icons";
import { Space } from "antd";

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (킬로미터 단위)
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 거리 (킬로미터 단위)
}

const Distance = (props) => {
  const [coords, setCoords] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (props.address) {
      if (!window.kakao) {
        alert("카카오맵 API가 로드되지 않았습니다.");
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(props.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          setCoords(coords);
          const distance = haversineDistance(
            coords.getLat(),
            coords.getLng(),
            props.currentPosition?.latitude || 0,
            props.currentPosition?.longitude || 0
          );
          setDistance(distance);
        } else {
          console.error("주소를 찾을 수 없습니다.");
        }
      });
    }
  }, [props.address]);

  useEffect(() => {
    if (props.pos) {
      const dist = haversineDistance(
        parseFloat(props.pos.yPos),
        parseFloat(props.pos.xPos),
        props.currentPosition?.latitude || 0,
        props.currentPosition?.longitude || 0
      );

      setDistance(dist);
    }
  }, [props.pos]);

  return (
    <Space>
      <PushpinTwoTone />
      {distance ? (
        <div>
          {distance >= 1
            ? parseInt(distance) + "km"
            : parseInt(distance * 1000) + "m"}
        </div>
      ) : (
        <div>0m</div>
      )}
    </Space>
  );
};

export default Distance;
