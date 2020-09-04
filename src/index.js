import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';
// require("./utility/util.js");

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    //create a copy of the squares array to modify
    const squares = current.squares.slice();
    //return early by ignoring a click if someone has won the game or if a Square is already filled
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2)===0
    });
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber]; // get the currently selected move
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      console.log("Setp: ", step, "Move: ", move);
      const desc = move? 'Go to move #'+move: 'Go to game start';
      return(
        // Add a key to track the changes in the component and its siblings
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if(winner)
      status = "Winner: " + winner;
    else
      status = "New Player: " + (this.state.xIsNext ? 'X': 'O');

    return(
      <div className="game">
        <div className="game-board">
          <h2 style={{margin: 0, textAlign: 'center', color: 'purple'}}>Tic-Tac-Toe</h2>
          <hr style={{marginBottom: 10}}/>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares){
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

  for(let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}

ReactDOM.render(
    <Game />,
  document.getElementById('root')
);
