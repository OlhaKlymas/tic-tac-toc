import React from 'react';
import Square from "./Square";

class Board extends React.Component{

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick = {()=> this.props.onClickHandler(i)}
        />
    }

    render() {
        const winner = this.props.calculateWinner(this.props.squares);
        let status;
        if (winner) {
            status = 'Выиграл ' + winner;
        } else {
            status = 'Следующий ход: ' + (this.props.xIsNext ? 'X' : 'O');
        }

        return(
            <div>
                <p>{status}</p>
                <div className="board">
                    <div className="board__row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board__row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board__row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Board;