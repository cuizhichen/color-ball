import React from "react";
import styled from "styled-components";

const MainHeaderStyled = styled.header`
  margin-top: 40px;
  text-align: center;

  .app-logo {
    .ball {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: inline-block;

      &.blue {
        border: 1px solid #39f;
      }

      &.red {
        border: 1px solid #f54646;
      }
    }
  }

  .app-title {
    margin-top: 4px;
    font-size: 32px;
    font-weight: 200;
    color: #555;
    color: #f54646;
  }

  .app-description {
    color: #aaa;
    margin-top: 6px;
    font-size: 18px;
  }
`;

function MainHeader() {
  return (
    <MainHeaderStyled>
      <div className="app-logo">
        <span className="ball red"></span>
        <span className="ball blue"></span>
      </div>
      <div className="app-title">双色球随机器</div>
      {/* <div className="app-description">距离千万富翁还会远么？</div> */}
    </MainHeaderStyled>
  );
}

export default MainHeader;
