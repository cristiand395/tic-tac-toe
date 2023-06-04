import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './components/constans.js'
import { checkWinner } from './logic/board'
import { Participants } from './components/Participants'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToLocalStorage, resetGameFromLocalStorage } from './logic/localStorage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    resetGameFromLocalStorage()
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    // Skip if square is filled or there is a winner
    if (board[index] || winner) return
    // Update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Change turn
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    // Save values on LocalStorage
    saveGameToLocalStorage({
      board: newBoard,
      turn: newTurn
    })
    // Check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <Participants
        turn={turn}
        turns={TURNS} />

      <WinnerModal
        winner={winner}
        resetGame={resetGame} />
    </main>
  )
}

export default App
