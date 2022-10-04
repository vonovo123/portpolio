import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "../styles/Page/List.module.css";
import CodingListElement from "../components/Element/PostListElement";
import PortpolioListElement from "../components/Element/PortpolioListElement";
import CareerListElement from "../components/Element/CareerListElement";
const cx = classNames.bind(styles);
export default function List({ pageState, list, goPage, loading }) {
  const [page, setPage] = pageState;
  return {};
}
