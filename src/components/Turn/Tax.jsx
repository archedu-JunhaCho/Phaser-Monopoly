import React from "react";

function Tax({ turnData, close }) {
  return (
    <>
      <div className={"tax"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>국세청</div>
      </div>
    </>
  );
}
export default Tax;
