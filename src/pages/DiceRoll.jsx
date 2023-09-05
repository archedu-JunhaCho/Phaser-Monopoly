import React, { useState } from "react";
import "./DiceRoll.css"; // CSS 파일을 import 해야 합니다.

function DiceRoll() {
  const [diceOneClass, setDiceOneClass] = useState("");
  const [diceTwoClass, setDiceTwoClass] = useState("");
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return; // 이미 굴리고 있는 중이면 중복 클릭 방지
    const diceOne = Math.floor(Math.random() * 6) + 1;
    const diceTwo = Math.floor(Math.random() * 6) + 1;

    console.log(diceOne + " " + diceTwo);

    setDiceOneClass("show-" + diceOne);
    setDiceTwoClass("show-" + diceTwo);

    setTimeout(() => {
      setRolling(false); // 굴리기 완료 후 다시 클릭 가능하도록 설정
    }, 1000);
  };

  return (
    <div className="diceRoll">
      <div className="diceContainer">
        <div className="container">
          <div id="dice1" className={`dice dice-one ${diceOneClass}`}>
            <div id="dice-one-side-one" className="side one">
              <div className="dot one-1"></div>
            </div>
            <div id="dice-one-side-two" className="side two">
              <div className="dot two-1"></div>
              <div className="dot two-2"></div>
            </div>
            <div id="dice-one-side-three" className="side three">
              <div className="dot three-1"></div>
              <div className="dot three-2"></div>
              <div className="dot three-3"></div>
            </div>
            <div id="dice-one-side-four" className="side four">
              <div className="dot four-1"></div>
              <div className="dot four-2"></div>
              <div className="dot four-3"></div>
              <div className="dot four-4"></div>
            </div>
            <div id="dice-one-side-five" className="side five">
              <div className="dot five-1"></div>
              <div className="dot five-2"></div>
              <div className="dot five-3"></div>
              <div className="dot five-4"></div>
              <div className="dot five-5"></div>
            </div>
            <div id="dice-one-side-six" className="side six">
              <div className="dot six-1"></div>
              <div className="dot six-2"></div>
              <div className="dot six-3"></div>
              <div className="dot six-4"></div>
              <div className="dot six-5"></div>
              <div className="dot six-6"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div id="dice2" className={`dice dice-two ${diceTwoClass}`}>
            <div id="dice-two-side-one" className="side one">
              <div className="dot one-1"></div>
            </div>
            <div id="dice-two-side-two" className="side two">
              <div className="dot two-1"></div>
              <div className="dot two-2"></div>
            </div>
            <div id="dice-two-side-three" className="side three">
              <div className="dot three-1"></div>
              <div className="dot three-2"></div>
              <div className="dot three-3"></div>
            </div>
            <div id="dice-two-side-four" className="side four">
              <div className="dot four-1"></div>
              <div className="dot four-2"></div>
              <div className="dot four-3"></div>
              <div className="dot four-4"></div>
            </div>
            <div id="dice-two-side-five" className="side five">
              <div className="dot five-1"></div>
              <div className="dot five-2"></div>
              <div className="dot five-3"></div>
              <div className="dot five-4"></div>
              <div className="dot five-5"></div>
            </div>
            <div id="dice-two-side-six" className="side six">
              <div className="dot six-1"></div>
              <div className="dot six-2"></div>
              <div className="dot six-3"></div>
              <div className="dot six-4"></div>
              <div className="dot six-5"></div>
              <div className="dot six-6"></div>
            </div>
          </div>
        </div>
        <div id="roll" className="roll-button">
          <button className="diceRollBtn" onClick={rollDice}>
            주사위 굴리기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiceRoll;
