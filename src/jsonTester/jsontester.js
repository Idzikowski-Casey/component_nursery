import React, { useState, useEffect } from "react";
import { TextArea, Text, Button } from "@blueprintjs/core";
import { useAPIResult } from "@macrostrat/ui-components";

export function JSONTester(props) {
  const [json, setJSON] = useState();
  console.log("This is Working");

  const testData = [
    {
      id: 18,
      igsn: null,
      name: "M2C",
      material: "Lava Flows",
      geometry: {
        type: "Point",
        coordinates: [-149.66, -17.66],
      },
      location_name: null,
      location_precision: 0,
      location_name_autoset: null,
      project_id: null,
      project_name: null,
      is_public: true,
    },
    {
      id: 19,
      igsn: null,
      name: "90T151A",
      material: "Baslt",
      geometry: {
        type: "Point",
        coordinates: [-156.2311, 20.6368],
      },
      location_name: null,
      location_precision: 0,
      location_name_autoset: null,
      project_id: null,
      project_name: null,
      is_public: true,
    },
  ];

  const EditJSON = (e) => {
    setJSON(e.target.value);
  };

  const onSetData = () => {
    setJSON(JSON.stringify(testData));
  };

  return (
    <div>
      <Button onClick={onSetData}>Click to Show JSON</Button>
      <TextArea onChange={EditJSON} value={json} />
    </div>
  );
}
