import React, { useRef, useState } from "react";
import "./password.css";

export default function PasswordEnter() {
  const [isRotating, setIsRotating] = useState(false);

  const [rotateAmount, setRotateAmount] = useState(0);

  const rotateRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timer>();
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const handleMouseMove = () => {
    if (!isRotating) {
      return;
    }

    setRotateAmount((x) => x + 2);
  };

  rotateRef.current = rotateAmount;
  //console.log("render");
  return (
    <>
      <div className="rotary" onMouseMove={handleMouseMove}>
        <img
          draggable={false}
          className="numbers"
          src={require("../numbers2.png")}
          alt="rotary numbers"
        />
        <img
          draggable={false}
          onMouseDown={() => {
            const tr = setInterval(() => {
              setRotateAmount((x) => x + 3);
            }, 30);

            timerRef.current = tr;
          }}
          onMouseUp={() => {
            clearTimeout(timerRef.current);
            //setIsRotating(false);
            const tr = setInterval(() => {
              if (rotateRef.current! <= 0) {
                clearTimeout(timerRef.current);
                setRotateAmount(0);
                return;
              }
              setRotateAmount((x) => x - 3);
            }, 30);

            timerRef.current = tr;
          }}
          className="dialer"
          src={require("../dialer2.png")}
          alt="rotary numbers"
          style={{
            transform: `rotateZ(${rotateAmount}deg)`,
          }}
        />
      </div>
    </>
  );
}
