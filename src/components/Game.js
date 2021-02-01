import Board from './Board';
import React from 'react';

class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill({value:null, isHilight:false}),
          squareIndex: null
        }],
        xIsNext: true,
        stepNumber: 0,
        isMoveInAscOrder: true
      }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
    
        const moves = history.map((step, move) => {
          let isSelected = this.state.stepNumber === move ? true : false;
          const squareIndex = step.squareIndex;
          const row = Math.floor(squareIndex/3) + 1;
          const col = squareIndex%3 + 1;
          const desc = move ? 'Go to move #' + move + '(row:'+row + ',col:' + col + ')': 'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => {this.jumpTo(move)} }>
                 {isSelected ?  (<b> {desc} </b>) : desc }
              </button>
            </li>
          );
        });

        let toggledMoves;
        if(this.state.isMoveInAscOrder){
            toggledMoves = moves;
        }else{
            toggledMoves = moves.slice().reverse();
        }
    
        let status;
        if(winner){
          status = 'Winner ' + winner;
        }else{
          status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
          <div className="game">
            <div className="game-board">
              <Board squares={current.squares} onClick={ (i) => {this.handleClick(i)}} />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <div><button onClick={() => {this.reverseMoves()}}>Reverse order</button></div>
              <ol>{toggledMoves}</ol>
            </div>
          </div>
        );
    }

    reverseMoves(){
        this.setState({
            isMoveInAscOrder: !this.state.isMoveInAscOrder
        });
    }
  
    handleClick(i){
        const history = this.cloneArray(this.state.history.slice(0, this.state.stepNumber+1));
        const current = history[history.length-1];
        const squares = this.cloneArray(current.squares.slice());
        if(this.calculateWinner(squares) || squares[i].value)
            return;
      
        squares[i].value =  this.state.xIsNext ? 'X' : 'O';
        let winnerLine = this.calculateWinner(squares);
        if(winnerLine)
            this.highlightWinnerLine(squares, winnerLine);
        this.setState({
            history: history.concat([{squares: squares, squareIndex: i}]), 
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }
  
    calculateWinner(squares){
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
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
        //   return squares[a];
            return [a, b, c]
        }
      }
      return null;
    }

    cloneArray(array){
        return array.map(a => Object.assign({}, a));
    }

    highlightWinnerLine(squares,winnerLine){
        winnerLine.forEach(i => {squares[i].isHilight=true;});
    }
  
    jumpTo(move){
      this.setState({
        stepNumber: move,
        xIsNext: (move%2) === 0
        }
      );
    }
}

  export default Game;