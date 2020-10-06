import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";
import "./datasheet.css";

export function Datasheet() {
  const [state, setState] = useState({
    grid: [
      [{ value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }],
      [{ value: 2 }, { value: 4 }, { value: 1 }, { value: 3 }],
      [{ value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }],
      [{ value: 2 }, { value: 4 }, { value: 1 }, { value: 3 }],
      [{ value: 1 }, { value: 3 }, { value: 1 }, { value: 3 }],
      [{ value: 2 }, { value: 4 }, { value: 1 }, { value: 3 }],
    ],
  });
  const [selection, setSelection] = useState(null);

  function onSelect({ start, end }) {
    const startI = start.i;
    const startJ = start.j;
    const endI = end.i;
    const endJ = end.j;
    const selected = {
      start: { i: startI, j: startJ },
      end: { i: endI, j: endJ },
    };
    console.log({ start, end });
    setSelection(selected);
  }

  console.log(selection);

  return (
    <ReactDataSheet
      onSelect={onSelect}
      selected={selection}
      data={state.grid}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={(changes) => {
        const grid = state.grid.map((row) => [...row]);
        changes.forEach(({ cell, row, col, value }) => {
          grid[row][col] = { ...grid[row][col], value };
        });
        setState({ grid });
      }}
    />
  );
}
