import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import UserInfo from "./UserInfo";
import UserTurn from "./UserTurn";
import DiceRoll from "./DiceRoll";
import "./Monopoly.css";
// 기본 값
let pNum = 4; // Number of players
let turn = 0; // Turn number
let colorPalette = ["dd9090", "909add", "90dd9a", "dddc90"];
const first_money = process.env.REACT_APP_FIRST_MONEY;
const playerDeafaults = [];
for (let i = 1; i <= pNum; i++) {
  playerDeafaults.push({
    name: `Player ${i}`,
    money: first_money, // first_money는 초기 돈 값입니다.
    color: colorPalette[i - 1],
    position: (0, 0),
  });
}
const MonopolyBoard = () => {
  const [dice1, setDice1Value] = useState(null);
  const [dice2, setDice2Value] = useState(null);
  const [diceActive, setDiceActive] = useState(false);
  const [isRolling, setIsRolling] = useState(false); // 버튼 활성화 상태를 관리
  const [playerData] = useState(playerDeafaults);
  const [players] = useState([]);
  const [playersPositions] = useState([]);
  const [isUserTurnVisible, setIsUserTurnVisible] = useState(false);
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: "game-container",
        width: window.innerWidth,
        height: window.innerHeight * 1,
      },
      scene: {
        preload: preload,
        create: create,
      },
    };
    const game = new Phaser.Game(config);
    // Game Settings
    let setPosition = [
      [-6, -6],
      [6, -6],
      [-6, 6],
      [6, 6],
    ];
    function preload() {
      this.load.image("tile", "path_to_tile_image.png"); // Load your tile image
      this.load.image("sampleTile", "assets/Polygon3.png"); // Load your tile image
      // this.load.image("sampleTile", "assets/green_tile.png"); // Load your tile image
      this.load.image("sampleBuilding", "assets/building.png"); // Load your building image
      this.load.image("sampleShop", "assets/shop.png"); // Load your shop image
      this.load.image("Blue", "assets/alienBlue.png");
      this.load.image("Green", "assets/alienGreen.png");
      this.load.image("Pink", "assets/alienPink.png");
      this.load.image("Yellow", "assets/alienYellow.png");
    }
    function create() {
      // Create Board
      const tileSize = 81; // Assuming each tile is 64x64 pixels
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (row === 0 || col === 0 || row === 8 || col === 8) {
            // Border tiles
            const x = (col - row) * (tileSize / 2) + game.config.width / 2;
            const y = (col + row) * (tileSize / 4) + game.config.height / 2;
            const sampleTile = this.add
              .image(x, y, "sampleTile")
              .setOrigin(0.5, 3);
            sampleTile.setScale(0.5, 0.5); // scaleX와 scaleY를 원하는 크기로 설정하세요.
            // // 타일
            // const sampleTile = this.add
            //   .image(x, y, "sampleTile")
            //   .setOrigin(0.5, 1.1);
            // sampleTile.setScale(1.2, 1.2); // scaleX와 scaleY를 원하는 크기로 설정하세요.
            // 샵
            const sampleBuilding = this.add
              .image(x, y, "sampleBuilding")
              .setOrigin(0.8, 5.8);
            sampleBuilding.setScale(0.125, 0.125); // scaleX와 scaleY를 원하는 크기로 설정하세요.
            // 빌딩
            const sampleShop = this.add
              .image(x, y, "sampleShop")
              .setOrigin(1.1, 6.2);
            sampleShop.setScale(0.2, 0.2); // scaleX와 scaleY를 원하는 크기로 설정하세요.
          }
        }
      }
      const Players = ["Blue", "Green", "Pink", "Yellow"];
      // Create Players dynamically
      for (let i = 0; i < pNum; i++) {
        // const player = this.add.circle(
        //   game.config.width / 2 + setPosition[i][0],
        //   game.config.height / 2 + setPosition[i][1] - 100,
        //   tileSize / 10,
        //   parseInt(colorPalette[i], 16)
        // );
        const player = this.add.image(
          game.config.width / 2 + setPosition[i][0],
          game.config.height / 2 + setPosition[i][1] - 100,
          Players[i]
        );
        player.setScale(0.5, 0.5);
        players.push(player);
        playersPositions.push({
          row: 0,
          col: 0,
          mx: setPosition[i][0],
          my: setPosition[i][1] - 100,
        });
      }
    }
    // Function - Move Player in Board
    const movePlayer = (rowOffset, colOffset) => {
      const tileSize = 81;
      const newRow = playersPositions[turn].row + rowOffset;
      const newCol = playersPositions[turn].col + colOffset;
      if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
        playersPositions[turn].row = newRow;
        playersPositions[turn].col = newCol;
        const x = (newCol - newRow) * (tileSize / 2) + game.config.width / 2;
        const y = (newCol + newRow) * (tileSize / 4) + game.config.height / 2;
        players[turn].setPosition(
          x + playersPositions[turn].mx,
          y + playersPositions[turn].my
        );
      }
    };
    const forMovePlayer = (TotalDice) => {
      for (let i = 0; i < TotalDice; i++) {
        // eslint-disable-next-line no-loop-func
        setTimeout(() => {
          if (
            playersPositions[turn].row === 0 &&
            playersPositions[turn].col < 8
          ) {
            movePlayer(0, 1);
          } else if (
            playersPositions[turn].col === 8 &&
            playersPositions[turn].row < 8
          ) {
            movePlayer(1, 0);
          } else if (
            playersPositions[turn].row === 8 &&
            playersPositions[turn].col > 0
          ) {
            movePlayer(0, -1);
          } else if (
            playersPositions[turn].col === 0 &&
            playersPositions[turn].row > 0
          ) {
            movePlayer(-1, 0);
          }
          // 이동이 끝날때 옵션
          if (i === TotalDice - 1) {
            // 이벤트가 끝날 때 버튼 다시 활성화
            setTimeout(() => {
              setIsUserTurnVisible(true);
              setIsRolling(false);
              turn = (turn + 1) % pNum;
            }, 500);
          }
        }, i * 200);
      }
    };
    document.getElementById("move-button").addEventListener("click", () => {
      if (isRolling) return; // 이미 굴리는 중이면 무시
      setIsRolling(true); // 굴리는 중으로 설정
      // Dice Roll
      const Dice1 = Math.floor(Math.random() * 6) + 1;
      const Dice2 = Math.floor(Math.random() * 6) + 1;
      setDice1Value(Dice1);
      setDice2Value(Dice2);
      setDiceActive(true);
      const TotalDice = Dice1 + Dice2;
      // Move Player
      setTimeout(() => {
        forMovePlayer(TotalDice);
        setDiceActive(false);
      }, 2000);
      console.log(turn, "의 턴입니다.");
    });
  }, []);
  return (
    <div>
      <UserInfo playerData={playerData} turn={turn} />
      {isUserTurnVisible && (
        <UserTurn
          position={playersPositions}
          turn={turn}
          close={setIsUserTurnVisible}
          pNum={pNum}
        />
      )}
      <div className="diceContainer">
        <DiceRoll
          setDice1Value={setDice1Value}
          setDice2Value={setDice2Value}
          diceActive={diceActive}
          dice1={dice1}
          dice2={dice2}
        />
        <button id="move-button" className="rollDiceBtn">
          주사위 굴리기
        </button>
      </div>
      <div id="game-container" className="GameScreen" />
    </div>
  );
};
export default MonopolyBoard;
