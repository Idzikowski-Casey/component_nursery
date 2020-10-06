import React, { useState, useRef, useEffect } from "react";
import "./ForeverScroll2.css";
import h from "@macrostrat/hyper";
import { useReducer } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useOnScreen } from "./useOnScreen";
import List from "react-virtualized-listview";

// This Component uses Intersection Observer to know when an element is being displayed
// And when that item is being displayed state is updated by the reducer callback.

// There are several important variables the application needs to keep track
// of to know how much data is left to load above and below the list:
//      loadingBottom: if data is being loaded, on the case 'start'
//      loadingTop: if Data is being loaded at the top, start case
//      hasMoreBefore: More to be loaded at top
//      hasMoreAfter: More to be loaded at bottom
//      before: Point/index in data to load at top
//      after: Point/index in data to load at bottom

const IntergerList = () => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    list.push(i + 1);
  }
  return list;
};
/**
 * How do I make this virtualized?
 *
 * Need to know height of items: need a callback for each item useElementDimensions?
 * The height of the ENTIRE list once rendered (innerHeight)
 * A measurement that shows how far the list has scrolled
 *
 * How to know when items intersect top and bottom of list:
 *  divide pixel position of item by height of items. Math.floor() turns pixel position into index
 *
 *
 */

const testData = IntergerList();
// const listProps = {
//   numItems: testData.length,
//   itemHeight: ,
//   renderItem: ,
//   windowHeight: ,

// }

/**
 * Next Steps:
 *
 * itemHeight needs to be found in the list using REFS, ref.current.getBoundingClientRect().height
 *
 *
 */
const renderItem = ({ index, style }) => <div key={index} style={style}></div>;

export function VirtualizedList({ dataSource, renderItem }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeight, setItemHeight] = useState(100);
  const heightRef = useRef(null);

  const windowHeight = window.outerHeight;

  const numItems = dataSource.length;

  const innerHeight = numItems * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
          width: "100%",
          backgroundColor: "blue",
        },
      })
    );
  }
  // useEffect(() => {
  //   if (items.length > 0) {
  //     setItemHeight(heightRef.current.getBoundingClientRect().height);
  //   }
  // }, [items]);
  const onScroll = (e) => setScrollTop(e.target.scrollTop);
  return (
    <div className="scroll" style={{ overflowY: "scroll" }} onScroll={onScroll}>
      <div
        className="inner"
        style={{ position: "relative", height: `${innerHeight}px` }}
        ref={heightRef}
      >
        {items}
      </div>
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "startBottom":
      return { ...state, loadingBottom: true };
    case "loadedBottom":
      console.log(state.after);
      return {
        ...state,
        loadingBottom: false,
        data: [...state.data, ...action.newData],
        hasMoreAfter: action.newData.length === perPage,
        after: state.after + action.newData.length,
      };
    default:
      throw new Error("Don't understand action");
  }
};
const perPage = 15;

function ForeverScroll() {
  const [state, dispatch] = useReducer(reducer, {
    loadingBottom: false,
    hasMoreAfter: true,
    data: [],
    after: 0,
  });
  const [setBottom, visibleBottom] = useOnScreen({
    threshold: 1,
  });

  // List of Data that the application references for indexes
  const totalData = IntergerList();

  const loadBottom = () => {
    dispatch({ type: "startBottom" });

    const newData = totalData.slice(after, after + perPage);

    dispatch({ type: "loadedBottom", newData });
  };

  const { loadingBottom, data, after, hasMoreAfter } = state;

  useEffect(() => {
    if (visibleBottom) {
      loadBottom();
    }
  }, [visibleBottom]);

  // START OF VIRUALTIZATION CODE
  //const data = IntergerList();

  const [itemHeight, setItemHeight] = useState(10);
  const [scrollTop, setScrollTop] = useState(0);
  const heightRef = useRef(null);

  const numItems = data.length;

  const windowHeight = window.outerHeight;
  console.log(windowHeight);

  const innerHeight = numItems * itemHeight;

  const scrollBottom =
    numItems - windowHeight / itemHeight - scrollTop / itemHeight;

  console.log(scrollBottom);

  const indexBottomWin = Math.floor(numItems - scrollBottom);
  const indexTopWin = Math.floor(
    numItems - (scrollBottom + windowHeight / itemHeight)
  );

  const startIndex = Math.max(0, indexTopWin - 10);
  const endIndex = Math.min(after, indexBottomWin);

  //To listen to a scroll event, you need to add a eventLisenter
  useEffect(() => {
    window.addEventListener("scroll", (e) => onScroll(e));
    return () => window.removeEventListener("scroll", onScroll);
  }, [window]);

  const onScroll = (e) => setScrollTop(e.target.scrollingElement.scrollTop);

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(data[i]);
  }

  useEffect(() => {
    if (items.length > 0 && heightRef.current) {
      console.log(heightRef.current.getBoundingClientRect());
      setItemHeight(heightRef.current.getBoundingClientRect().height + 32);
    }
  }, [items]);

  console.log(`after: ${after}`);
  console.log(items);
  console.log(data);
  console.log(`startIndex: ${startIndex}`);
  console.log(`endIndex: ${endIndex}`);
  console.log(`numItems: ${numItems}`);
  console.log(`innerHeight: ${innerHeight}`);
  console.log(`scrollTop: ${scrollTop}`);
  console.log(`item height ${itemHeight}`);

  return (
    <div
      className="ForeverScroll"
      //style={{ overflowY: "scroll" }}
      onScroll={() => onScroll}
    >
      <ul style={{ position: "relative", height: `${innerHeight}px` }}>
        {data.map((number) => (
          <h4
            onClick={() => console.log("clicked")}
            key={number}
            // style={number}
            ref={heightRef}
          >
            {number}
          </h4>
        ))}

        {loadingBottom && <h4>Loading...</h4>}

        {!loadingBottom && hasMoreAfter && <div ref={setBottom}></div>}
      </ul>
    </div>
  );
}

export default ForeverScroll;
