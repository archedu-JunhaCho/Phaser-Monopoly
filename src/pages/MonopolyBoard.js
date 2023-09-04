import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import BoardInfo from "./BoardInfo";

// 기본 값
let pNum = 4; // Number of players
let turn = 0; // Turn number
let colorPalette = ["ff0000", "0000FF", "00FF00", "FFFF00"];
const first_money = process.env.REACT_APP_FIRST_MONEY;
const playerDeafaults = [];
for (let i = 1; i <= pNum; i++) {
  playerDeafaults.push({
    name: `Player ${i}`,
    money: first_money, // first_money는 초기 돈 값입니다.
    color: colorPalette[i - 1],
  });
}

const MonopolyBoard = () => {
  const [dice1, setDice1Value] = useState(null);
  const [dice2, setDice2Value] = useState(null);
  const [isRolling, setIsRolling] = useState(false); // 버튼 활성화 상태를 관리
  const [playerData] = useState(playerDeafaults);
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: "game-container",
      width: window.innerWidth,
      height: window.innerHeight * 0.9,
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
    let players = []; // Array of players
    let playersPositions = []; // Array of players positions

    function preload() {
      this.load.image("tile", "path_to_tile_image.png"); // Load your tile image
    }

    function create() {
      // Create Board
      const tileSize = 64; // Assuming each tile is 64x64 pixels
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (row === 0 || col === 0 || row === 7 || col === 7) {
            // Border tiles
            const x = (col - row) * (tileSize / 2) + game.config.width / 2;
            const y = (col + row) * (tileSize / 4) + game.config.height / 2;
            this.add.image(x, y, "tile").setOrigin(0.5, 0.5);
          }
        }
      }

      // Create Players dynamically
      for (let i = 0; i < pNum; i++) {
        const player = this.add.circle(
          game.config.width / 2 + setPosition[i][0],
          game.config.height / 2 + setPosition[i][1],
          tileSize / 10,
          parseInt(colorPalette[i], 16)
        );

        players.push(player);
        playersPositions.push({
          row: 0,
          col: 0,
          mx: setPosition[i][0],
          my: setPosition[i][1],
        });
      }
    }

    // Function - Move Player in Board
    const movePlayer = (rowOffset, colOffset) => {
      const tileSize = 64;
      const newRow = playersPositions[turn].row + rowOffset;
      const newCol = playersPositions[turn].col + colOffset;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
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

    document.getElementById("move-button").addEventListener("click", () => {
      if (isRolling) return; // 이미 굴리는 중이면 무시
      setIsRolling(true); // 굴리는 중으로 설정
      // Dice Roll
      const Dice1 = Math.floor(Math.random() * 6) + 1;
      const Dice2 = Math.floor(Math.random() * 6) + 1;
      setDice1Value(Dice1);
      setDice2Value(Dice2);
      const TotalDice = Dice1 + Dice2;
      console.log("주사위 눈금은", Dice1, Dice2);

      // Select Player
      console.log("이동할 플레이어는", turn);

      // Move Player
      for (let i = 0; i < TotalDice; i++) {
        setTimeout(() => {
          if (
            playersPositions[turn].row === 0 &&
            playersPositions[turn].col < 7
          ) {
            movePlayer(0, 1);
          } else if (
            playersPositions[turn].col === 7 &&
            playersPositions[turn].row < 7
          ) {
            movePlayer(1, 0);
          } else if (
            playersPositions[turn].row === 7 &&
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
              setIsRolling(false);
              turn = (turn + 1) % pNum;
            }, 500);
          }
        }, i * 200);
      }

      console.log(turn, "의 턴입니다.");
    });
  }, []);

  return (
    <div>
      <BoardInfo playerData={playerData} turn={turn} />
      <div id="game-container" />
      <button id="move-button" disabled={isRolling}>
        Roll Dice
      </button>
      <div>
        주사위 눈금 : {dice1},{dice2}
      </div>
    </div>
  );
};

export default MonopolyBoard;
