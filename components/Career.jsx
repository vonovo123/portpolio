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
import { useRef } from "react";
const cx = classNames.bind(styles);
export default function Career({ view, career, width }) {
  const rowData = career[0];
  const [hide, setHide] = useState(true);
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
      data-idx="career"
    >
      <Title view={view} type={"career"}></Title>
      <div>
        <Row align="middle">
          <Col span={24}>
            <div
              style={{
                marginBottom: 30,
              }}
            >
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
                [{dayjs(rowData.from).format("YYYY / M. DD")} -{" "}
                {dayjs(rowData.to).format("YYYY / M. DD")}]
              </span>
            </div>
          </Col>
          <Col span={24}>
            {width >= 767 && (
              <Chart
                chartType="Timeline"
                data={data}
                width="950px"
                height="100px"
                chartEvents={[
                  {
                    eventName: "ready",
                    callback: ({ chartWrapper, google }) => {
                      const chart = chartWrapper.getChart();
                      google.visualization.events.addListener(
                        chart,
                        "select",
                        (e) => {
                          const test = chart.getSelection();
                        }
                      );
                    },
                  },
                ]}
              />
            )}
          </Col>
          <Col span={24}>
            <Row className={cx("description", { sel: view === "career" })}>
              <Col span={24} className={styles.descriptionColHeader}>
                <Row>
                  {width >= 767 && (
                    <>
                      <Col span={4}>기간</Col>
                      <Col span={14}>프로젝트 및 상세</Col>
                      <Col span={4}>활용 기술</Col>
                      <Col span={2}>
                        {hide && (
                          <CaretDownOutlined
                            onClick={() => {
                              setHide(!hide);
                            }}
                          />
                        )}
                        {!hide && (
                          <CaretUpOutlined
                            onClick={() => {
                              setHide(!hide);
                            }}
                          />
                        )}
                      </Col>
                    </>
                  )}
                  {width < 767 && (
                    <>
                      <Col span={22}>타임라인</Col>
                      <Col span={2}>
                        <CaretDownOutlined
                          onClick={() => {
                            setHide(!hide);
                          }}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <CSSTransition
                in={hide}
                classNames={fadeTransition}
                timeout={500}
                mountOnEnter
                nodeRef={nodeRef}
              >
                <Row ref={nodeRef}>
                  {rowData.works.map((work, idx) => {
                    return (
                      <Col
                        key={idx}
                        span={24}
                        className={cx("descriptionCol", {
                          sel: view === "career",
                        })}
                      >
                        {width >= 767 && (
                          <>
                            <Row>
                              <Col span={4}>
                                <div>
                                  {dayjs(work.from).format("YYYY / M. DD")}
                                </div>
                                <div>
                                  {dayjs(work.to).format("YYYY / M. DD")}
                                </div>
                              </Col>
                              <Col span={15}>
                                <div>{work.name}</div>
                                <div>{work.description} </div>
                              </Col>
                              <Col span={4}>
                                <Row className={styles.skills}>
                                  {work.skills.map((skill, idx) => (
                                    <Col key={idx}>
                                      <Image
                                        className={cx("skillImage", {
                                          sel: view === "career",
                                        })}
                                        src={skill.iconUrl}
                                        alt={skill.name}
                                        preview={false}
                                      />
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </>
                        )}
                        {width < 767 && (
                          <>
                            <Row>
                              <Col span={24} style={{ padding: "10px" }}>
                                <div>{work.name}</div>
                                <div>{work.description} </div>
                              </Col>
                              <Col span={12} className={styles.date}>
                                <Row style={{ padding: "10px" }} align="center">
                                  <Col span={24}>
                                    {dayjs(work.from).format("YYYY / M. DD")}
                                  </Col>
                                  <Col span={24}>
                                    {dayjs(work.to).format("YYYY / M. DD")}
                                  </Col>
                                  <Col>Duration</Col>
                                </Row>
                              </Col>
                              <Col span={12}>
                                <Row className={styles.skills} align="center">
                                  <Col
                                    key={idx}
                                    span={24}
                                    style={{ paddingBottom: "10px" }}
                                  >
                                    {work.skills.map((skill, idx) => (
                                      <Image
                                        key={idx}
                                        className={styles.skillImage}
                                        src={skill.iconUrl}
                                        alt={skill.name}
                                        preview={false}
                                      />
                                    ))}
                                  </Col>
                                  <Col>Skill SET</Col>
                                </Row>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </CSSTransition>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
