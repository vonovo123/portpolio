import styles from "../../styles/Element/CareerListElement.module.css";
import classNames from "classnames/bind";
import { CSSTransition } from "react-transition-group";
import rollTransition from "../../styles/Transition/roll.module.css";
import { Col, Row } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState, useRef } from "react";
const cx = classNames.bind(styles);
export default function CareerListElement({ element }) {
  const [hide, setHide] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div className={cx("description")}>
      <div className={cx("descriptionHeader")}>
        <div className={cx("el")}>{element.name}</div>
        <div className={cx("el")}>
          [{dayjs(element.from).format("YYYY.M.DD")} -
          {dayjs(element.to).format("YYYY.M.DD")}]
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
          {element.works.map((work, idx) => {
            return (
              <Row className={cx("descriptionCol")} key={idx}>
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
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
}
