import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const x = await fetch("/api/data");
      const j = await x.json();
      setData(j);
    };
    loadData();
  }, []);

  return <div>Data is: {JSON.stringify(data)}</div>;
};

export default App;
