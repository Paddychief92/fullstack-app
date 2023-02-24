function WelcomePage(props) {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState(getFirstPlayerTurn());
  const [win, setWin] = useState(null);
  const [flashTimer, setFlashTimer] = useState(null);
  const [dropping, setDropping] = useState(false);
  const domBoard = useRef(null);

  /**
   * Helper function to get the index in the board using row and column.
   * @param {number} row - row in board
   * @param {number} column - column in board
   */
  function getIndex(row, column) {
    const index = row * boardSettings.columns + column;
    if (index >= boardSettings.rows * boardSettings.columns) return null;
    return index;
  }

  function getRowAndColumn(index) {
    if (index >= boardSettings.rows * boardSettings.columns) return null;
    const row = Math.floor(index / boardSettings.columns);
    const column = Math.floor(index % boardSettings.columns);
    return {
      row,
      column
    };
  }

  function createBoard() {
    return new Array(boardSettings.rows * boardSettings.columns).fill(
      boardSettings.colors.empty
    );
  }

  function getFirstPlayerTurn() {
    return boardSettings.colors.p1;
  }

  function restartGame() {
    setCurrentPlayer(getFirstPlayerTurn());
    setWin(null);
    setBoard(createBoard());
  }

  function getDomBoardCell(index) {
    if (!domBoard.current) return null;
    const board = domBoard.current;
    const blocks = board.querySelectorAll(".board-block");
    return blocks[index];
  }

  function findFirstEmptyRow(column) {
    let { empty } = boardSettings.colors;
    let { rows } = boardSettings;
    for (let i = 0; i < rows; i++) {
      if (board[getIndex(i, column)] !== empty) {
        return i - 1;
      }
    }
    return rows - 1;
  }

  async function handleDrop(column) {
    if (dropping || win) return;
    const row = findFirstEmptyRow(column);
    if (row < 0) return;
    setDropping(true);
    await animateDrop(row, column, currentPlayer);
    setDropping(false);
    const newBoard = board.slice();
    newBoard[getIndex(row, column)] = currentPlayer;
    setBoard(newBoard);
    // Check for win
    const nextPlayer = currentPlayer === boardSettings.colors.p1 ? boardSettings.colors.p2 : boardSettings.colors.p1;
    setCurrentPlayer(nextPlayer);
  }

  async function animateDrop(row, column, color, currentRow) {
    if (currentRow === undefined) {
      currentRow = 0;
    }
    return new Promise(resolve => {
      if (currentRow > row) {
        return resolve();
      }
      if (currentRow > 0) {
        let c = getDomBoardCell(getIndex(currentRow - 1, column));
        c.style.backgroundColor = boardSettings.colors.empty;
      }
      let cell = getDomBoardCell(getIndex(currentRow, column));
      cell.style.backgroundColor = color;
      setTimeout(() => {
        setFlashTimer(currentTime => !currentTime);
        resolve(animateDrop(row, column, color, currentRow + 1));
      }, boardSettings.dropAnimationRate);
    });
  }

  function checkForWin() {
    let { rows, columns } = boardSettings;
    let { p1, p2 } = boardSettings.colors;
  };
