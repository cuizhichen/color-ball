import React, { useState } from "react";
import styled from "styled-components";
import cs from "classnames";
import { DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import makeMoney from "../../core/core";
import { copyTextToClipboard } from "../../core/copy";

const HomeStyled = styled.div`
  margin-top: 148px;
  padding-bottom: 60px;

  .ball-list {
    display: flex;
    justify-content: center;

    .ball-item {
      width: 100px;
      height: 100px;
      border: 4px solid #f54646;
      color: #f54646;
      /* background: red; */
      /* color: #dfcbcb; */
      font-size: 60px;
      line-height: 1em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      outline: none;
    }

    .blue-ball {
      border-color: #39f;
      color: #39f;
    }

    .ball-item + .ball-item {
      margin-left: 28px;
    }
  }

  .ball-actions {
    display: flex;
    justify-content: center;
    margin-top: 100px;

    .make-money-btn,
    .record-btn {
      width: 200px;
      height: 60px;
      font-size: 32px;
      border-radius: 16px;
      background: white;
      cursor: pointer;
    }

    .make-money-btn {
      background: white;
      color: #f54646;
      border: 2px solid #f54646;
      transition: all 0.3s;

      span {
        font-size: 32px;
        display: inline-block;
        transition: all 0.3s;
      }

      &:hover {
        background: rgba(245, 70, 70, 0.1);

        span {
          transform: scale(1.2);
        }
      }
    }

    .record-btn {
      width: 200px;
      height: 60px;
      margin-left: 32px;
      color: #39f;
      border: 2px solid #39f;
      transition: all 0.3s;

      &:hover {
        background: rgba(51, 153, 255, 0.1);
      }
    }
  }

  .record-balls {
    width: 400px;
    margin: 60px auto 0 auto;

    .record-balls-inner {
      .record-balls-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .copy-all,
        .delete-all {
          cursor: pointer;
          color: #555;
          font-size: 13px;
          &:hover {
            color: #999;
          }
        }

        .copy-all {
          margin-left: auto;
        }
        .delete-all {
          margin-left: 12px;
        }
      }

      .record-ball + .record-ball {
        margin-top: 12px;
      }
      .record-ball {
        display: flex;

        .record-ball-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border: 1px solid #999;
          border-radius: 50%;
          color: #f54646;
          border: 1px solid #f54646;
          font-size: 13px;

          &.blue-ball {
            color: #39f;
            border: 1px solid #39f;
          }
        }
        .record-ball-item + .record-ball-item {
          margin-left: 12px;
        }

        .record-ball-right {
          margin-left: auto;

          .anticon {
            color: #999;
            transition: all 0.3s;

            &:hover {
              opacity: 0.6;
            }
          }

          .delete-icon {
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

function Home() {
  const [balls, setBalls] = useState<number[]>(makeMoney);
  const [ballsRecord, setBallsRecord] = useState<number[][]>([]);

  const handleMakeMoney = () => {
    setBalls(makeMoney());
  };

  const handleRecord = () => {
    setBallsRecord([
      ...ballsRecord,
      balls
        .slice(0, 6)
        .sort((a, b) => a - b)
        .concat([balls[6]]),
    ]);
  };

  const handleDeleteRecordItem = (index: number) => {
    setBallsRecord(ballsRecord.filter((r, i) => i !== index));
  };

  const handleCopyBall = (text: string) => {
    copyTextToClipboard(text);
    message.success(`财富密码 ${text} 拷贝成功`);
  };

  const handleCopyAll = () => {
    if (ballsRecord.length) {
      copyTextToClipboard(
        ballsRecord.map((balls) => balls.join(" ")).join("\n")
      );
      message.success("所有财富密码拷贝成功");
    } else {
      message.warning("还没有财富密码");
    }
  };

  const handleRemoveAll = () => {
    setBallsRecord([]);
    message.success("已清空全部财富密码");
  };

  return (
    <HomeStyled>
      <div className="ball-list">
        {balls.map((ball, i) => (
          <div
            key={i}
            className={cs("ball-item", i === 6 && "blue-ball")}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.target.innerText;
              if (!/^\d+$/.test(newValue)) {
                e.target.innerText = balls[i].toString();
                message.error("财富密码应该是一个整数");
                return;
              }
              const valueNumber = Number(newValue);
              if (valueNumber === balls[i]) return;

              if (i === 6) {
                if (valueNumber <= 0 || valueNumber >= 17) {
                  e.target.innerText = balls[i].toString();
                  message.error("蓝色财富密码在 1——16 之间");
                  return;
                }
              } else {
                if (valueNumber <= 0 || valueNumber >= 34) {
                  e.target.innerText = balls[i].toString();
                  message.error("红色财富密码在 1——33 之间");
                  return;
                }
                if (balls.slice(0, 6).includes(valueNumber)) {
                  e.target.innerText = balls[i].toString();
                  message.error("已有此财富密码");
                  return;
                }
              }

              setBalls(
                balls.map((ball, idx) => (i === idx ? valueNumber : ball))
              );
            }}
          >
            {ball}
          </div>
        ))}
      </div>
      <div className="ball-actions">
        <button className="make-money-btn" onClick={handleMakeMoney}>
          <span>发财</span>
        </button>
        <button className="record-btn" onClick={handleRecord}>
          记录
        </button>
      </div>
      <div className="record-balls">
        <div className="record-balls-inner">
          <div className="record-balls-header">
            <div className="record-total">共 {ballsRecord.length} 注</div>
            <div className="copy-all" onClick={handleCopyAll}>
              复制所有
            </div>
            <div className="delete-all" onClick={handleRemoveAll}>
              清空
            </div>
          </div>
          {ballsRecord.map((record, index) => {
            return (
              <div className="record-ball" key={index}>
                {record.map((item, i) => (
                  <span
                    className={cs("record-ball-item", i === 6 && "blue-ball")}
                    key={i}
                  >
                    {item}
                  </span>
                ))}
                <span className="record-ball-right">
                  <CopyOutlined
                    className="copy-icon"
                    title="拷贝"
                    onClick={() => {
                      handleCopyBall(record.join(" "));
                    }}
                  />
                  <DeleteOutlined
                    className="delete-icon"
                    title="删除"
                    onClick={() => {
                      handleDeleteRecordItem(index);
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </HomeStyled>
  );
}

export default Home;
