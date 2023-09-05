import React from "react";

function Oil({ turnData, close }) {
  return (
    <>
      <div className={"oil"}>
        <div>
          <button onClick={() => close(false)}>닫기</button>
        </div>
        <div>오일랜드</div>
      </div>
    </>
  );
}
export default Oil;
