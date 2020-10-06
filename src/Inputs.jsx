import React, { useState, useEffect } from "react";
import h from "@macrostrat/hyper";
import { Card, NumericInput } from "@blueprintjs/core";
import "./App.css";

export function MapFilterInputs({ coordinates, setFeature }) {
  const [state, setState] = useState({
    minlng: 0,
    maxlng: 0,
    minlat: 0,
    maxlat: 0,
  });

  //console.log(state);

  useEffect(() => {
    if (coordinates != null) {
      const {
        geometry: {
          coordinates: [[[minlng, maxlat], [, minlat], [maxlng]]],
        },
      } = coordinates;
      setState({
        minlng: minlng,
        maxlng: maxlng,
        minlat: minlat,
        maxlat: maxlat,
      });
    }
  }, [coordinates]);

  useEffect(() => {});

  return h(Card, [
    h("div", [
      h("p"),
      ["Maximum Longitude:"],
      h("br"),
      h(NumericInput, {
        defaultValue: state.maxlng,
        value: Number(state.maxlng).toFixed(0),
        onValueChange: (change) => setState({ ...state, maxlng: change }),
        min: -180,
        max: 180,
      }),
    ]),
    h("div", [
      h("p"),
      ["Minimum Longitude:"],
      h("br"),
      h(NumericInput, {
        defaultValue: state.minlng,
        value: Number(state.minlng).toFixed(0),
        onValueChange: (change) => setState({ ...state, minlng: change }),
        min: -180,
        max: 180,
      }),
    ]),
    h("div", [
      h("p"),
      ["Maximum Latitude:  "],
      h("br"),
      h(NumericInput, {
        defaultValue: state.maxlat,
        value: Number(state.maxlat).toFixed(0),
        onValueChange: (change) => setState({ ...state, maxlat: change }),
        min: -90,
        max: 90,
      }),
    ]),
    h("div", [
      h("p"),
      ["Minimum Latitude:  "],
      h("br"),
      h(NumericInput, {
        //defaultValue: minlat,
        value: Number(state.minlat).toFixed(0),
        onValueChange: (change) => setState({ ...state, minlat: change }),
        min: -90,
        max: 90,
      }),
    ]),
  ]);
}
