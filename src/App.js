import React, { useState } from "react";
import { useEffect } from "react";
import h from "@macrostrat/hyper";
import { Button } from "@blueprintjs/core";
import { MapFilterInputs } from "./Inputs";
import "./App.css";

const geoJSON = {
  type: "Feature",
  properties: {
    shape: "Rectangle",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-130, 50],
        [-130, 20],
        [120, 20],
        [120, 50],
        [-130, 50],
      ],
    ],
  },
};

function App() {
  const [state, setState] = useState(geoJSON);
  const [clicked, setClicked] = useState(false);

  console.log(state);

  const {
    geometry: {
      coordinates: [[[minlng, maxlat], [, minlat], [maxlng]]],
    },
  } = state;
  console.log(minlng, maxlat, minlat, maxlng);

  const newCoords = [-100, 70, 15, 96];

  function handClick() {
    const [minlng, maxlat, minlat, maxlng] = newCoords;
    setClicked(!clicked);
    setState({
      ...state,
      geometry: {
        ...state.geometry,
        coordinates: [
          [
            [minlng, maxlat],
            [minlng, minlat],
            [maxlng, minlat],
            [maxlng, maxlat],
            [minlng, maxlat],
          ],
        ],
      },
    });
  }

  function setFeature(coordinates) {
    const [minlng, maxlat, minlat, maxlng] = coordinates;
    setState({
      ...state,
      geometry: {
        ...state.geometry,
        coordinates: [
          [
            [minlng, maxlat],
            [minlng, minlat],
            [maxlng, minlat],
            [maxlng, maxlat],
            [minlng, maxlat],
          ],
        ],
      },
    });
  }

  return h("div", [
    h(Button, {
      onClick: handClick,
      text: clicked ? "New State Set" : "O.G State",
    }),
    h(MapFilterInputs, { coordinates: state, setFeature: setFeature }),
  ]);
}

export default App;
