import styles from "../styles/Menu.module.css";
import classNames from "classnames/bind";
import { CloseOutlined, CloseSquareOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Menu({ menuState, menuInfoState }) {
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;

  return (
    <div className={cx("menu")}>
      <div className={cx("menuWrapper")}>
        {menuInfo &&
          Object.entries(menuInfo).map(([key, value], idx) => (
            <div
              className={cx("nav", { sel: menu === key })}
              key={key}
              onClick={() => {
                setMenu(key);
              }}
            >
              <div className={cx("text")}>{value}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
