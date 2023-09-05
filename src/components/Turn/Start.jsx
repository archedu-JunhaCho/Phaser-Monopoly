import React from "react";

function Start({ turnData, close }) {
  return (
    <>
      <div className={"start"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>시작점</div>
      </div>
    </>
  );
}
export default Start;
