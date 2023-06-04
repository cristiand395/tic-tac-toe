import { Square } from "./Square"

export const Participants = ({ turn, turns }) => {
    return (
        <section className='turn' >
            {/* <h2>Participants</h2> */}
            <Square isSelected={turn === turns.x}>
                {turns.x}
            </Square>
            <Square isSelected={turn === turns.o}>
                {turns.o}
            </Square>
        </section >
    )
}