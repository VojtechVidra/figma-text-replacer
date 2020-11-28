import React, { useState } from "react";

export const App = () => {
  const [value, setValue] = useState("");

  const handleReplace = () => {
    parent.postMessage(
      { pluginMessage: { type: "replace", pattern: value } },
      "*"
    );
  };

  return (
    <div>
      <h2>Replace text</h2>
      <p>This will replace text of all selected text nodes</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => setValue((prev) => prev + "$fn")}>
        First name
      </button>
      <button onClick={handleReplace}>Replace</button>
    </div>
  );
};
