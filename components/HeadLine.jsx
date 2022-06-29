import { Col, Row } from "antd";
import { CodeOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "../styles/HeadLine.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function HeadLine() {
  const [fold, setFold] = useState(true);
  const resizeHeadline = function () {
    setFold(!fold);
  };
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
          <div
            style={{ fontSize: 20 }}
            className={styles["logBoard_body_content"]}
          >
            <CaretRightOutlined /> <span className="date">2022. 06. 21</span>
            <div style={{ marginLeft: "20px" }}>
              <div className="content">Career 파트 Chart 구현</div>
              <div className="content"> Portpolio 파트 레이아웃 구현</div>
              <div className="content"> Posts 파트 레이아웃 구현</div>
            </div>
          </div>
          <div
            style={{ fontSize: 20 }}
            className={styles["logBoard_body_content"]}
          >
            <CaretRightOutlined /> <span className="date">2022. 06. 20</span>
            <div style={{ marginLeft: "20px" }}>
              <div className="content">
                2022.06.20 Index 페이지 레이아웃 설계 및 구현
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
