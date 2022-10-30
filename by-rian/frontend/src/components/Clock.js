import React, { useEffect } from "react";

function Clock(props) {
  function tick() {
    return <Clock date={new Date()} />;
  }
  useEffect(() => {
    setInterval(tick, 1000);
  }, []);
  return (
    <div>
      <span className="nav-link text-light">
        {props.date.toLocaleTimeString()}
      </span>
    </div>
  );
}

export default Clock;
