import React from "react";

function Ground({ turnData, close }) {
  return (
    <>
      <div className={"ground"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>위치 : {turnData.name}</div>
        <div>가격 : {turnData.price}</div>
        <div>통행료 : {turnData.cost}</div>
      </div>
    </>
  );
}
export default Ground;
