import { Chart } from "react-google-charts";
import { Col, Image, Row } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "../styles/Career.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import rollTransition from "../styles/transition/roll.module.css";

import { useRef } from "react";
const cx = classNames.bind(styles);
export default function Career({ career, makeSubTitle }) {
  const [hide, setHide] = useState(false);
  const nodeRef = useRef(null);
  const columns = [
    { type: "string", id: "name" },
    { type: "string", id: "Content" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];
  return (
    <div className={cx("career")}>
      {makeSubTitle("career")}
      <div className={cx("descriptionWrapper")}>
        {career.map((rowData, idx) => (
          <div className={cx("description")} key={idx}>
            <div className={cx("descriptionHeader")}>
              <div className={cx("el")}>{rowData.name}</div>
              <div className={cx("el")}>
                [{dayjs(rowData.from).format("YYYY.M.DD")} -
                {dayjs(rowData.to).format("YYYY.M.DD")}]
              </div>
              {!hide && (
                <CaretUpOutlined
                  className={cx("el", "arrow")}
                  onClick={() => {
                    setHide(!hide);
                  }}
                />
              )}
              {hide && (
                <CaretDownOutlined
                  className={cx("el", "arrow")}
                  onClick={() => {
                    setHide(!hide);
                  }}
                />
              )}
            </div>
            <CSSTransition
              in={!hide}
              classNames={rollTransition}
              timeout={500}
              mountOnEnter
              nodeRef={nodeRef}
            >
              <div className={cx("descriptionBody")} ref={nodeRef}>
                <Row className={cx("descriptionBodyHeader")}>
                  <Col span={2}></Col>
                  <Col span={14}>업무</Col>
                  <Col span={2}></Col>
                  <Col span={6}>활용 기술</Col>
                </Row>
                {rowData.works.map((work, idx) => {
                  return (
                    <>
                      <Row className={cx("descriptionCol")}>
                        <Col span={2}></Col>
                        <Col span={14}>
                          <span>{dayjs(work.from).format("YYYY.M.DD")}</span>
                          {" ~"}
                          <span>{dayjs(work.to).format("YYYY.M.DD")}</span>
                          <div>{work.name}</div>
                          <div>{work.description} </div>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={6}>
                          <Row className={cx("tagWrapper")}>
                            {work.skills.map((skill, index) => (
                              <Col key={index} className={cx("tag")}>
                                {skill.name}
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </>
                  );
                })}
              </div>
            </CSSTransition>
          </div>
        ))}
      </div>
    </div>
  );
}
