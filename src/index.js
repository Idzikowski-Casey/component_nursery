import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { InputTests } from "./Nursery";
import * as serviceWorker from "./serviceWorker";
import ForeverScroll, { VirtualizedList } from "./infiniteScroll2";
import NewScroller from "./infiniteScroll2/newScroller";
import { Datasheet } from "./datasheet/datasheet";
import { JSONTester } from "./jsonTester/jsontester";

const IntergerList = () => {
  const list = [];
  for (let i = 0; i < 1000; i++) {
    list.push(i + 1);
  }
  return list;
};

const data = IntergerList();
const renderItem = ({ index, style }) => (
  <div key={index} style={style}>
    Hello {index}
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <ForeverScroll />
  </React.StrictMode>,
  document.getElementById("root")
);
