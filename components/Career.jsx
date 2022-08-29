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
  // const rows = rowData.works.map((work) => {
  //   return [
  //     rowData.name,
  //     work.name.trim(),
  //     new Date(work.from),
  //     new Date(work.to),
  //   ];
  // });
  const columns = [
    { type: "string", id: "name" },
    { type: "string", id: "Content" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];
  //const data = [columns, ...rows];
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
                  <Col span={6}>기간</Col>
                  <Col span={11}>업무</Col>
                  <Col span={7}>활용 기술</Col>
                </Row>
                {rowData.works.map((work, idx) => {
                  return (
                    <>
                      <Row className={cx("descriptionCol")}>
                        <Col span={5}>
                          <Row style={{ paddingTop: 15, textAlign: "center" }}>
                            <Col span={24}>
                              {dayjs(work.from).format("YYYY.M.DD")}
                            </Col>
                            <Col span={24}>
                              {dayjs(work.to).format("YYYY.M.DD")}
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          span={12}
                          style={{ textAlign: "left", padding: 15 }}
                        >
                          <div>{work.name}</div>
                          <div>{work.description} </div>
                        </Col>
                        <Col span={7}>
                          <Row className={cx("tagWrapper")}>
                            {work.skills.map((skill, idx) => (
                              <Col key={idx} className={cx("tag")}>
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
