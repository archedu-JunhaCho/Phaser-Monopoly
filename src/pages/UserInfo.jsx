// 보드판에 있는 칸에 대한 정보입니다.
import React from "react";
import "./UserInfo.css";

function UserInfo({ playerData, turn }) {
  return (
    <>
      {/* Player Board */}
      <div className="playerContainer">
        {playerData.map((player, index) => (
          <div
            key={index}
            className={`playerBox ${index === turn ? "activePlayer" : ""}`}
          >
            <p style={{ color: `#${player.color}` }}>{player.name}</p>
            <p>{player.money}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default UserInfo;
