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
    <div style={{ padding: "10px" }}>
      <h1 style={{ fontWeight: 300, paddingLeft: "30px" }}>
        stack<strong>pro</strong>
      </h1>
      <h3 style={{ fontWeight: 300, paddingLeft: "50px" }}>
        When do the most questions get answered on{" "}
        <a
          href="https://stackoverflow.com"
          style={{
            color: "#cc7000",
          }}
        >
          StackOverflow
        </a>
        ?
      </h3>
      {data !== null ? (
        <div
          className="chartContainer"
          style={{
            width: "80%",
            margin: "auto",
            backgroundColor: "#efefef",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <StackedBar data={data} />{" "}
        </div>
      ) : (
        "Loading..."
      )}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <span>
          Created by{" "}
          <a href="https://xavd.id" style={{ color: "#cc7000" }}>
            David Brownman
          </a>
        </span>

        <span>
          Learn more about this project and peep the source on{" "}
          <a
            href="https://github.com/xavdid/stackpro"
            style={{ color: "#cc7000" }}
          >
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
