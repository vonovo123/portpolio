import { Chart } from "react-google-charts";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import styles from "../styles/Career.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Career({ view, career }) {
  const rowData = career[0];
  const rows = rowData.works.map((work) => {
    return [
      rowData.name,
      work.name.trim(),
      new Date(work.from),
      new Date(work.to),
    ];
  });
  console.log(rows);

  const columns = [
    { type: "string", id: "name" },
    { type: "string", id: "President" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];
  const data = [columns, ...rows];
  return (
    <div className={styles.career} id="career">
      <div className={styles.titleWrapper}>
        <div className={cx("titleCover", { sel: view === "career" })}></div>
        <div className={cx("titleText", { sel: view === "career" })}>
          Career
        </div>
      </div>
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
          <Col>
            <Chart
              chartType="Timeline"
              data={data}
              width="1000px"
              height="100px"
              //options={options}
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
          </Col>
          <Col>
            <Row className={styles.description}>
              <Col span={24} className={styles.descriptionColHeader}>
                <Row>
                  <Col span={4}>기간</Col>
                  <Col span={16}>프로젝트 및 상세</Col>
                  <Col span={4}>활용 기술</Col>
                </Row>
              </Col>
              {rowData.works.map((work, idx) => {
                return (
                  <Col key={idx} span={24} className={styles.descriptionCol}>
                    <Row>
                      <Col span={4}>
                        <div>{dayjs(work.from).format("YYYY / M. DD")}</div>
                        <div>{dayjs(work.to).format("YYYY / M. DD")}</div>
                      </Col>
                      <Col span={16}>
                        <div>{work.name}</div>
                        <div>{work.description} </div>
                      </Col>
                      <Col span={4}>
                        <div className={styles.skills}>
                          {work.skills.map((skill, idx) => (
                            <div key={idx}>
                              <Image
                                className={styles.skillImage}
                                src={skill.iconUrl}
                                alt={skill.name}
                                preview={false}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
