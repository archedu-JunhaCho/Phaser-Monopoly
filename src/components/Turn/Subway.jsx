import React from "react";

function Subway({ turnData, close }) {
  return (
    <>
      <div className={"subway"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>서울메트로</div>
      </div>
    </>
  );
}
export default Subway;
