import React, { useEffect, useState } from "react";

import StackedBar from "./StackedBar";
import { Recording } from "./interfaces";

import "./App.css";

const App = () => {
  const [data, setData] = useState<Recording[] | null>(null);
  useEffect(() => {
    const loadData = async () => {
      const x = await fetch("/api/records");
      const j = await x.json();
      setData(j);
    };
    // this is fine on eslint 7, but react-scripts wants 6
    // eslint-disable-next-line no-void
    void loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: 300 }}>
        stack<strong>pro</strong>
      </h1>
      {data !== null ? <StackedBar data={data} /> : "Loading..."}
    </div>
  );
};

export default App;
