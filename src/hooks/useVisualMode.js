import React, { useState } from "react";

const useVisualMode = (mode) => {
  const [state, setState] = useState(mode);
  const [history, setHistory] = useState([mode]);

  const transition = (updatedMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), updatedMode]);
    } else {
      setHistory((prev) => [...prev, updatedMode]);
    }
    setState(updatedMode);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
    setState((prev) => history[history.length - 2]);
  };
  return { mode: state, transition, back };
};

export default useVisualMode;
