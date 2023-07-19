import React, { useRef, useState } from "react";
import "./password.css";

const rotaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const rotaryLimits: Map<number, number> = new Map<number, number>();

rotaryLimits.set(1, 63);
rotaryLimits.set(2, 83);
rotaryLimits.set(3, 103);
rotaryLimits.set(4, 123);
rotaryLimits.set(5, 143);
rotaryLimits.set(6, 163);
rotaryLimits.set(7, 183);
rotaryLimits.set(8, 203);
rotaryLimits.set(9, 223);
rotaryLimits.set(0, 243);

export default function PasswordEnter(props: { onNumberDial?: (num: number) => void }) {
  const [rotateAmount, setRotateAmount] = useState(0);

  const rotateRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timer>();

  const handleNumReached = (reachedNumber: number) => {
    props.onNumberDial && props.onNumberDial(reachedNumber);
  };
  const handleHitboxMouseDown = (clickedNumber: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const tr = setInterval(() => {
      const limit = rotaryLimits.get(clickedNumber);

      if (limit && rotateRef.current! >= limit) {
        clearInterval(timerRef.current);
        handleNumReached(clickedNumber);
        return;
      }
      setRotateAmount((x) => x + 4);
    }, 30);

    timerRef.current = tr;
  };

  const handleHitboxMouseUp = () => {
    clearTimeout(timerRef.current);
    const tr = setInterval(() => {
      if (rotateRef.current! <= 0) {
        clearTimeout(timerRef.current);
        setRotateAmount(0);
        return;
      }
      setRotateAmount((x) => x - 3);
    }, 30);

    timerRef.current = tr;
  };
  rotateRef.current = rotateAmount;
  return (
    <>
      <div className="rotary">
        {rotaryNumbers.map((item) => {
          return (
            <div
              key={item}
              id={`num${item}-hitbox`}
              onMouseDown={() => handleHitboxMouseDown(item)}
              onMouseUp={handleHitboxMouseUp}
              onMouseLeave={handleHitboxMouseUp}></div>
          );
        })}

        <img
          draggable={false}
          className="numbers"
          src={require("../numbers4.png")}
          alt="rotary numbers"
        />
        <img
          draggable={false}
          className="dialer"
          src={require("../dialer3.png")}
          alt="rotary numbers"
          style={{
            transform: `rotateZ(${rotateAmount}deg)`,
          }}
        />
      </div>

      <span>{rotateAmount}</span>
    </>
  );
}
