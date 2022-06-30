import { Col, Row } from "antd";
import { CodeOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "../styles/HeadLine.module.css";
import classNames from "classnames/bind";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
export default function HeadLine({ devLog }) {
  const [fold, setFold] = useState(true);
  const resizeHeadline = function () {
    setFold(!fold);
  };
  const rowData = [...devLog].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  console.log(rowData);
  return (
    <div className={cx("headline", { fold: fold })}>
      <Row className={styles.logBoard}>
        <Col span={24}>
          <Row>
            <Col span={4}>
              <h1 className={cx("title", { unfold: !fold })}>
                <CodeOutlined /> 업데이트 로그
              </h1>
            </Col>
            <Col>
              <div
                className={styles.foldBtn}
                style={{ fontSize: 15, fontWeight: "bold" }}
                onClick={resizeHeadline}
              >
                {fold ? "펼치기" : "접기"}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24} className={styles["logBoard_body"]}>
          {rowData.map((data, idx) => (
            <div
              style={{ fontSize: 20 }}
              className={styles["logBoard_body_content"]}
              key={idx}
            >
              <CaretRightOutlined />{" "}
              <span className="date">
                {dayjs(data.createdAt).format("YYYY / M. DD")}
              </span>
              <div style={{ marginLeft: "20px" }}>
                <div className="content">{data.name}</div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
}
