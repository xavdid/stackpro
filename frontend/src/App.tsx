import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
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
      <h1>Currently Under Construction!</h1>
      Data is:{" "}
      <pre
        style={{
          backgroundColor: "#efefef",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "40%",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default App;
