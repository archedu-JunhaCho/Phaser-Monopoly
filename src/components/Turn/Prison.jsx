import React from "react";

function Prison({ turnData, close }) {
  return (
    <>
      <div className={"prison"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>감옥</div>
      </div>
    </>
  );
}
export default Prison;
