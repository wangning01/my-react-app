import React from 'react';
import Square from './Square'

class Board extends React.Component {

    renderSquare(i) {
      return  (
          <Square 
           key={i} value={ (this.props.squares[i]).value}
           isHilight={this.props.squares[i].isHilight} 
           onClick={() => {this.props.onClick(i); }} />
      );
    }
    
    render() {
        let boardSquares = [];
        for(let row = 0; row < 3; row++){
            let boardRow = [];
            for(let col = 0; col < 3; col++){
             boardRow.push(this.renderSquare((row * 3) + col));
            }
            boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
        }

        return (
        <div>
            {boardSquares}
        </div>
        );
      }
  
    // render() {
    //   return (
    //     <div>
    //       {/* <div className="status">{status}</div> */}
    //       <div className="board-row">
    //         {this.renderSquare(0)}
    //         {this.renderSquare(1)}
    //         {this.renderSquare(2)}
    //       </div>
    //       <div className="board-row">
    //         {this.renderSquare(3)}
    //         {this.renderSquare(4)}
    //         {this.renderSquare(5)}
    //       </div>
    //       <div className="board-row">
    //         {this.renderSquare(6)}
    //         {this.renderSquare(7)}
    //         {this.renderSquare(8)}
    //       </div>
    //     </div>
    //   );
    // }
  }
  
  export default Board;