import React, { useState, useEffect, useRef } from "react";
import { useOnScreen } from "./useOnScreen";

const IntergerList = (number) => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push(i + 1);
  }
  return list;
};

function NewScoller() {
  const [state, setState] = useState({
    before: 0,
    after: 0,
    hasMoreAfter: true,
    hasMoreBefore: false,
    loadingBottom: false,
    loadingTop: false,
    data: [],
  });

  const perPage = 15;

  const fullData = IntergerList(50);

  const [setBottom, visibleBottom] = useOnScreen({
    threshold: 1,
  });
  const [setTop, visibleTop] = useOnScreen({ rootMargin: "300px" });

  const loadBottom = () => {
    const newData = fullData.slice(state.after, state.after + perPage);
    const newState = state.data.slice(-10);
    const numberA = newData.slice(-1);
    const numberB = fullData.slice(-1);
    setState({
      ...state,
      after: state.after + newData.length,
      data: [...newState, ...newData],
      hasMoreAfter: numberA < numberB,
      hasMoreBefore: state.data.length > 0,
      before: state.data[0] - 1,
    });
  };

  const loadTop = () => {};

  console.log(visibleBottom);

  useEffect(() => {
    if (visibleBottom) {
      loadBottom();
    }
    if (visibleTop) {
      loadTop();
    }
  }, [visibleBottom, visibleTop]);

  return (
    <div className="ForeverScroll">
      {!state.loadingTop && !state.loadingBottom && state.hasMoreBefore && (
        <div ref={setTop}></div>
      )}
      {state.loadingTop && <h4>Loading...</h4>}

      <ul>
        {state.data.map((number) => (
          <h4 key={number} style={{ backgroundColor: "aquamarine" }}>
            {number}
          </h4>
        ))}


        {state.hasMoreAfter && (
          <div ref={setBottom}></div>
        )}
      </ul>
    </div>
  );
}

export default NewScoller;
