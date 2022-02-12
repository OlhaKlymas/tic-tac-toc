import React from 'react';
import Board from "./Board";
import Step from "./Step";

class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.jumpToHandler = this.jumpToHandler.bind(this);
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpToHandler(step){
        this.setState( {
            ...this.state,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        const move = history.map((move, i) => {

            const text = i ? `Вернуться к ходу №${i}` : 'Заново';

            return(
                <Step
                    step={i}
                    text={text}
                    key={i}
                    onClick = {(step) => this.jumpToHandler(step)}
                />
            )
        })
        return(
            <div className="game">
                <Board squares={squares}
                       xIsNext={this.state.stepNumber}
                       calculateWinner={this.calculateWinner}
                       onClickHandler={this.handleClick}
                />
                <ol>{move}</ol>
            </div>
        )
    }
}

export default Game;