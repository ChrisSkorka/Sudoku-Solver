class SudokuUi {
    SIZE = null;
    /** @type {HTMLTextAreaElement[][]} */
    inputs = null;

    constructor(SIZE = 9) {
        this.SIZE = SIZE;
        this.inputs = [];
        for (let y = 0; y < this.SIZE; y++) {
            this.inputs[y] = [];
            for (let x = 0; x < this.SIZE; x++) {
                let id = `input-${y}-${x}`;
                this.inputs[y][x] = document.getElementById(id);
            }
        }
    }

    getGridValues() {
        let values = [];
        for (let y = 0; y < 9; y++) {
            values[y] = [];
            for (let x = 0; x < this.SIZE; x++) {
                let text = this.inputs[y][x].value;
                let value = text === '' ? null : Number(text);
                let isValid = value === null || value > 0 && value <= this.SIZE;
                if (!isValid) throw new Error(`Invalid value '${text}' for cell ${x + 1}x${y + 1}`);
                values[y][x] = value;
            }
        }
        return values;
    }

    /**
     * 
     * @param {Number[][]|Number[][][]} values 
     */
    setGridValues(values) {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                let value = values[y][x];
                let isOptions = value instanceof Array;
                if (isOptions) value = value.join(' ');
                this.inputs[y][x].classList.toggle('options', isOptions);
                this.inputs[y][x].value = value;
            }
        }
    }

    getSudoku() {
        let sudoku = new Sudoku(this.SIZE);
        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                let text = this.inputs[y][x].value;
                let value = text === '' ? null : Number(text);
                let isValid = value === null || value > 0 && value <= this.SIZE;
                if (!isValid) throw new Error(`Invalid value '${text}' for cell ${x + 1}x${y + 1}`);
                sudoku.values[y][x] = value;
            }
        }
        return sudoku;
    }

    /**
     * @param {Sudoku} sudoku 
     */
    setSudoku(sudoku) {
        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                let value = sudoku.values[y][x];
                this.inputs[y][x].value = value;
            }
        }
    }
}