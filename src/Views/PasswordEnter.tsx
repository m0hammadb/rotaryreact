import React, { useState } from "react";
import "./password.css";

export default function PasswordEnter() {
  const [isRotating, setIsRotating] = useState(false);

  const [rotateAmount, setRotateAmount] = useState(0);

  const handleMouseMove = () => {
    if (!isRotating) {
      return;
    }

    setRotateAmount((x) => x + 2);
  };
  return (
    <>
      <div className="rotary" onMouseMove={handleMouseMove}>
        <img
          draggable={false}
          className="numbers"
          src={require("../numbers.png")}
          alt="rotary numbers"
        />
        <img
          draggable={false}
          onMouseDown={() => setIsRotating(true)}
          onMouseUp={() => {
            setIsRotating(false);
            setRotateAmount(0);
          }}
          className="dialer"
          src={require("../dialer.png")}
          alt="rotary numbers"
          style={{
            transform: `rotateZ(${rotateAmount}deg)`,
          }}
        />
      </div>
    </>
  );
}
