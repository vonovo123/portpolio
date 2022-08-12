import { Chart } from "react-google-charts";
import { Col, Image, Row } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "../styles/Career.module.css";
import classNames from "classnames/bind";
import Title from "../components/Title";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "../styles/transition/fade.module.css";
import rollTransition from "../styles/transition/roll.module.css";

import { useRef } from "react";
const cx = classNames.bind(styles);
export default function Career({ view, career, width, careerRef }) {
  const rowData = career[0];
  const [hide, setHide] = useState(false);
  const nodeRef = useRef(null);
  const rows = rowData.works.map((work) => {
    return [
      rowData.name,
      work.name.trim(),
      new Date(work.from),
      new Date(work.to),
    ];
  });
  const columns = [
    { type: "string", id: "name" },
    { type: "string", id: "Content" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];
  const data = [columns, ...rows];
  return (
    <div
      className={cx("career", { sel: view === "career" })}
      id="career"
      ref={careerRef}
      data-idx="career"
    >
      <Row className={cx("description", { sel: view === "career" })}>
        {/* <Chart
                  chartType="Timeline"
                  data={data}
                  width="1200px"
                  height="100px"
                  chartEvents={[
                    {
                      eventName: "ready",
                      callback: ({ chartWrapper, google }) => {
                        google.visualization.events.addListener(
                          const chart = chartWrapper.getChart();
                          chart,
                          "select",
                          (e) => {
                            const test = chart.getSelection();
                          }
                        );
                      },
                    },
                  ]}/> */}

        <Col span={24} className={cx("descriptionHeader")}>
          <Row>
            <Col span={1}></Col>
            <Col span={21}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginRight: 10,
                }}
              >
                {rowData.name}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                [{dayjs(rowData.from).format("YYYY / M. DD")} -
                {dayjs(rowData.to).format("YYYY / M. DD")}]
              </span>
            </Col>
            <Col span={2}>
              {!hide && (
                <CaretUpOutlined
                  onClick={() => {
                    setHide(!hide);
                  }}
                />
              )}
              {hide && (
                <CaretDownOutlined
                  onClick={() => {
                    setHide(!hide);
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
        <CSSTransition
          in={hide}
          classNames={rollTransition}
          timeout={500}
          mountOnEnter
          nodeRef={nodeRef}
        >
          <Col span={24} className={cx("descriptionBody")} ref={nodeRef}>
            <Row>
              <Col span={24} className={cx("descriptionCol", "header")}>
                <Row>
                  <Col span={6}>기간</Col>
                  <Col span={12}>업무</Col>
                  <Col span={6}>활용 기술</Col>
                </Row>
              </Col>
              {rowData.works.map((work, idx) => {
                return (
                  <Col
                    key={idx}
                    span={24}
                    className={cx("descriptionCol", {
                      sel: view === "career",
                    })}
                  >
                    <Row>
                      <Col span={5}>
                        <Row style={{ paddingTop: 15, textAlign: "center" }}>
                          <Col span={24}>
                            {dayjs(work.from).format("YYYY / M. DD")}
                          </Col>
                          <Col span={24}>
                            {dayjs(work.to).format("YYYY / M. DD")}
                          </Col>
                        </Row>
                      </Col>
                      <Col span={14} style={{ textAlign: "left" }}>
                        <div>{work.name}</div>
                        <div>{work.description} </div>
                      </Col>
                      <Col span={5}>
                        <Row className={styles.skills}>
                          {work.skills.map((skill, idx) => (
                            <Col
                              key={idx}
                              xl={{ span: 6 }}
                              lg={{ span: 6 }}
                              md={{ span: 8 }}
                              sm={{ span: 8 }}
                              xs={{ span: 8 }}
                            >
                              <Image
                                key={idx}
                                className={styles.skillImage}
                                src={skill.iconUrl}
                                alt={skill.name}
                                preview={false}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </CSSTransition>
      </Row>
    </div>
  );
}
