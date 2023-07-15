import { useState } from "react";
import { Square } from "./components/Square.jsx";
import confetti from 'canvas-confetti';
import { TURNS } from "./constants.js"; 
import { checkEndGame, checkWinner } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { resetGameStorage, saveGameToStorage } from "./storage/index.js";

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage 
      ? JSON.parse(boardFromStorage) 
      : Array(9).fill(null)
  });
  
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage 
    ? turnFromStorage
    : TURNS.X
  })
  
  const [winner,setWinner] = useState(null)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
 
    // TODO: este resetGame se ejecuta cuando no es necesario
    resetGameStorage()
  }

  const updateBoard = (index)=>{
    if (board[index] || winner) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      resetGameStorage()
    } else if (checkEndGame(newBoard)){
      setWinner(false)
      resetGameStorage()
    }
  }

  return (
    <main className="board" >
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame} >reiniciar juego</button>
      <section className="game">
        {
          board.map((square, index) =>{
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard} 
              >
                {square}
              </Square>
            );
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected={turn == TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O} >
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
