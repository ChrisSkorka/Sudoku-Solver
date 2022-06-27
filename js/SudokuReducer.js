class SudokuReducer {
    /** @type {Number} */
    SIZE;
    /** @type {Sudoku} */
    sudoku;
    /** @type {Sudoku[]} */
    stepCount;
    /** @type {{possibilities: Number, x: Number, y: Number}[]} */
    bitEncodedOptions;
    /** @type {Number[][]} */
    bitEncodedValues;


    /**
     * @param {Sudoku} sudoku 
     * @param {Number} SIZE 
     */
    constructor(sudoku, SIZE = 9) {
        this.sudoku = sudoku.copy();
        this.sudokus = [];
        this.SIZE = SIZE;
        this.stepCount = 0;

        const NO_OPTIONS = 0;
        let ALL_OPTIONS = 0;
        for (let i = 0; i < this.SIZE; i++) {
            ALL_OPTIONS |= 1 << i;
        }

        this.bitEncodedValues = [];
        this.bitEncodedOptions = [];
        for (let y = 0; y < this.SIZE; y++) {
            this.bitEncodedValues[y] = [];
            for (let x = 0; x < this.SIZE; x++) {
                let value = this.sudoku.values[y][x];
                if (value == null) {
                    this.bitEncodedValues[y][x] = NO_OPTIONS;
                    this.bitEncodedOptions.push({
                        possibilities: ALL_OPTIONS,
                        x,
                        y,
                    });
                } else {
                    this.bitEncodedValues[y][x] = 1 << (value - 1);
                }
            }
        }
    }

    reduce() {
        let progressed = true;
        while (progressed) {
            progressed = this.step();
        }
        let sudoku = this.getSudokuFromBitEncodedValues();
        return sudoku;
    }

    step() {
        this.stepCount++;
        let progressed = false;
        let newOptions = [];
        for (let { possibilities, x, y } of this.bitEncodedOptions) {
            let forbidden = this.getForbiddenOptionsForCell(x, y);
            let newPossibilities = possibilities & (~forbidden);
            if (newPossibilities != possibilities) {
                progressed = true;
                if (this.isBitEncodedOptionSingular(newPossibilities)) {
                    this.bitEncodedValues[y][x] = newPossibilities;
                    continue;
                }
            }
            newOptions.push({
                possibilities: newPossibilities,
                x,
                y,
            });
        }
        this.bitEncodedOptions = newOptions;
        return progressed;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @return {Number} options already used in the relevant row, column, and groups
     */
    getForbiddenOptionsForCell(x, y) {
        let row = this.bitEncodedValues[y];
        let col = this.bitEncodedValues.map(r => r[x]);
        let gx = Math.floor(x / 3);
        let gy = Math.floor(y / 3);
        let group = this.bitEncodedValues.slice(gy * 3, gy * 3 + 3).map(r => r.slice(gx * 3, gx * 3 + 3));
        let options = [row, col, group].flat(2);
        let forbiddenOptions = options.reduce((a, b) => a | b);
        return forbiddenOptions;
    }

    /**
     * @param {Number} options
     * @return {Boolean}
     */
    isBitEncodedOptionSingular(options) {
        return options && !(options & (options - 1));
    }

    /**
     * @param {Number} bitEncodedValues 
     * @return {Number|null}
     */
    getValueFromBitEncodedValues(bitEncodedValues) {
        for (let i = 1; i <= this.SIZE; i++) {
            if (bitEncodedValues & 1) {
                return i;
            }
            bitEncodedValues >>= 1;
        }
        return null;
    }

    /**
     * @param {Number[][]} values 
     * @returns {Sudoku}
     */
    getSudokuFromBitEncodedValues() {
        let sudoku = new Sudoku(this.SIZE);
        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                sudoku.values[y][x] = this.getValueFromBitEncodedValues(this.bitEncodedValues[y][x]);
            }
        }
        return sudoku;
    }
}