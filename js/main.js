function main() {
    console.log('main');

    let sudokuUi = new SudokuUi();
    let sudokuBacktracer = null;
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

        }
        let isSolved = sudoku.isSolved();
        console.log({isSolved});
        sudokuUi.setSudoku(sudoku);
    };

    controls.onButtonLoadClear = event => sudokuUi.setGridValues(presets.Clear);
    controls.onButtonLoad = (presetKey, event) => sudokuUi.setGridValues(presets[presetKey]);
}