function main() {
    console.log('main');

    let sudokuUi = new SudokuUi();
    let sudokuBacktracer = null;
    let sudokuOptimizedBacktracer = null;
    let sudokuReducer = null;
    let controls = new Controls();

    window.sudokuUi = sudokuUi;
    window.controls = controls;

    controls.onButtonSolve = (algorithm, event) => {
        let sudoku = sudokuUi.getSudoku();
        switch (algorithm) {
            case 'SudokuBacktracer':
                sudokuBacktracer = new SudokuBacktracer(sudoku);
                window.sudokuBacktracer = sudokuBacktracer;
                sudoku = sudokuBacktracer.solve();
                break;
            case 'SudokuOptimizedBacktracer':
                sudokuOptimizedBacktracer = new SudokuOptimizedBacktracer(sudoku);
                window.sudokuOptimizedBacktracer = sudokuOptimizedBacktracer;
                sudoku = sudokuOptimizedBacktracer.solve();
                break;
            case 'SudokuReducer':
                sudokuReducer = new SudokuReducer(sudoku);
                window.sudokuReducer = sudokuReducer;
                sudoku = sudokuReducer.reduce();
                break;

        }
        let isSolved = sudoku.isSolved();
        console.log({isSolved});
        sudokuUi.setSudoku(sudoku);
    };

    controls.onButtonLoadClear = event => sudokuUi.setGridValues(presets.Clear);
    controls.onButtonLoad = (presetKey, event) => sudokuUi.setGridValues(presets[presetKey]);
}