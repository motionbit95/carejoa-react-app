import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  List,
  Row,
  Select,
  Space,
} from "antd";
import axios from "axios";
import SearchList from "./searchList";
import Filter from "./filter";

function Search(props) {
  const [region, setRegion] = useState({ province: "11", city: null });
  const [adminPttnCd, setAdminPttnCd] = useState("");
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords?.latitude || 0;
          const longitude = position.coords?.longitude || 0;

          console.log(latitude, longitude);
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      document.getElementById("locationInfo").innerText =
        "Geolocation is not supported by this browser.";
    }
  }, []);

  useEffect(() => {
    const fetchHospital = async () => {
      console.log("병원을 검색합니다.", region);
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/hospital`, {
          sidoCd: region.province ? region.province : "",
          sgguCd: region.city ? region.city : "",
          pageNo: pageNo,
          pageSize: pageSize,
        })
        .then((res) => {
          console.log(res.data);
          setData(
            Array.isArray(res.data.items.item)
              ? res.data.items.item
              : [res.data.items.item]
          );

          setTotalCount(res.data.totalCount);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (!adminPttnCd) {
      if (region.province) {
        setIsLoading(true);
        fetchHospital();
      }
    }
  }, [region, adminPttnCd, pageNo]);

  useEffect(() => {
    setIsLoading(true);
    setPageNo(1);
  }, [region, adminPttnCd]);

  const { device } = "mobile";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "16px",
      }}
    >
      <Row style={{ position: "relative" }}>
        <Col span={24}>
          <Filter setRegion={setRegion} />
        </Col>
        <Col span={24}>
          <List
            loading={isLoading}
            pagination={{
              align: "center",
              pageSize: pageSize,
              total: totalCount,
              current: pageNo,
              showSizeChanger: false,
              onChange: (page) => {
                console.log(page);
                setPageNo(page);
              },
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ padding: 8 }}>
                <List.Item.Meta
                  description={
                    <SearchList item={item} currentPosition={currentPosition} />
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Drawer
          title="상세조건 선택"
          placement="right"
          onClose={() => setVisible(false)}
          visible={visible}
          footer={
            <Button style={{ width: "100%" }} type="primary">
              개 항목 선택 완료
            </Button>
          }
        >
          <p>시설규모</p>
          <p>평가등급</p>
          <p>설립연도</p>
          <p>특화영역</p>
          <p>특수시설</p>
          <p>종교활동</p>
        </Drawer>
      </Row>
    </div>
  );
}

export default Search;
