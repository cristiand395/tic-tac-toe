export const saveGameToLocalStorage = ({ turn, board }) => {
    window.localStorage.setItem('turn', turn)
    window.localStorage.setItem('board', JSON.stringify(board))
}

export const resetGameFromLocalStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}