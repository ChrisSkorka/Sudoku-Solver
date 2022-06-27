class SudokuHybrid {
    /** @type {Number} */
    SIZE;
    /** @type {((index: Number) => void)[]} */
    emptyCoordinates;
    /** @type {Number} */
    index;
    /** @type {Sudoku} */
    sudoku;

    /** @type {SudokuOptimizedBacktracer} */
    sudokuOptimizedBacktracer;
    /** @type {SudokuReducer} */
    sudokuReducer;

    /**
     * @param {Sudoku} sudoku (has side effects)
     * @param {Number} SIZE 
     */
    constructor(sudoku, SIZE = 9) {
        this.sudoku = sudoku;
        this.SIZE = SIZE;
    }

    solve() {
        let sudokuReducer = new SudokuReducer(this.sudoku);
        this.sudoku = sudokuReducer.reduce();
        let sudokuOptimizedBacktracer = new SudokuOptimizedBacktracer(this.sudoku);
        this.sudoku = sudokuOptimizedBacktracer.solve();
        return this.sudoku;
    }

}