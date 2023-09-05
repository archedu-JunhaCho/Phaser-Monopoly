import React from "react";

function Key({ turnData, close }) {
  return (
    <>
      <div className={"key"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>황금열쇠</div>
      </div>
    </>
  );
}
export default Key;
