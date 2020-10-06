import * as React from "react";
import { useState, useEffect, useRef } from "react";
import h from "@macrostrat/hyper";
import MapGl, { Marker } from "react-map-gl";
import { Card, FormGroup, InputGroup, NumericInput } from "@blueprintjs/core";
import { MyNumericInput } from "./edit-sample";

export function InputTests() {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  const onChangelat = (value) => {
    setState({ ...state, latitude: value });
  };
  const onChangelng = (value) => {
    setState({ ...state, longitude: value });
  };

  return h("div", [
    h(MyNumericInput, {
      min: -90,
      max: 90,
      labelInfo: " (-90 to 90)",
      label: "Latitude",
      onChange: onChangelat,
      value: state.latitude,
      id: "Lat",
      labelFor: "Lat",
    }),
    h(MyNumericInput, {
      min: -180,
      max: 180,
      labelInfo: " (-180 to 180)",
      label: "Longitude",
      onChange: onChangelng,
      value: state.longitude,
      id: "Long",
      labelFor: "Long",
    }),
    h("br"),
    h(
      FormGroup,
      {
        labelFor: "text-input2",
        label: "Test",
        labelInfo: "This is a test",
      },
      [h(NumericInput, { id: "text-input2" })]
    ),
  ]);
}
