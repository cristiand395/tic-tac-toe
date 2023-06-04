import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame }) => {
    if (winner === null) return null
    const text = winner === false ? 'Draw' : 'Won: '

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{text}</h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Try Again!</button>
                </footer>
            </div>
        </section>
    )
}