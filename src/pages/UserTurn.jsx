// 유저 턴에 대한 컴포넌트입니다.
import React, { useState } from "react";
import "./UserTurn.css";
import BoardData from "../data/BoardData";
import Ground from "../components/Turn/Ground";
import Key from "../components/Turn/Key";
import Oil from "../components/Turn/Oil";
import Prison from "../components/Turn/Prison";
import Start from "../components/Turn/Start";
import Subway from "../components/Turn/Subway";
import Tax from "../components/Turn/Tax";

function BoardInfo({ position, turn, close, pNum }) {
  const [turnData] = useState(
    BoardData[
      `${position[(turn + 3) % pNum].row}-${position[(turn + 3) % pNum].col}`
    ]
  );
  return (
    <>
      {/* Event Board */}
      <div className={"eventContainer"}>
        {turnData.kind === "ground" && (
          <Ground turnData={turnData} close={close} />
        )}
        {turnData.kind === "key" && <Key turnData={turnData} close={close} />}
        {turnData.kind === "start" && (
          <Start turnData={turnData} close={close} />
        )}
        {turnData.kind === "subway" && (
          <Subway turnData={turnData} close={close} />
        )}
        {turnData.kind === "prison" && (
          <Prison turnData={turnData} close={close} />
        )}
        {turnData.kind === "oil" && <Oil turnData={turnData} close={close} />}
        {turnData.kind === "tax" && <Tax turnData={turnData} close={close} />}
      </div>
    </>
  );
}
export default BoardInfo;
