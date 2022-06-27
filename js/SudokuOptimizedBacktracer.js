class SudokuOptimizedBacktracer {
    /** @type {Number} */
    SIZE;
    /** @type {((index: Number) => void)[]} */
    emptyCoordinates;
    /** @type {Number} */
    stepCount;
    /** @type {Sudoku} */
    sudoku;

    /**
     * @param {Sudoku} sudoku (has side effects)
     * @param {Number} SIZE 
     */
    constructor(sudoku, SIZE = 9) {
        this.sudoku = sudoku;
        this.emptyCoordinates = [];
        this.stepCount = 0;
        this.SIZE = SIZE;

        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                if (this.sudoku.values[y][x] == null) {
                    this.emptyCoordinates.push({ x, y });
                }
            }
        }
    }

    solve() {
        this.step(this.emptyCoordinates);
        return this.sudoku;
    }

    /**
     * 
     * @param {{x: Number, y: Number}[]} emptyCoordinates of this.setter to solve the value for
     * @returns {Boolean} true if all of emptyCoordinates have been solved
     */
    step(emptyCoordinates) {
        this.stepCount++;
        if (emptyCoordinates.length == 0) return true;

        let minIndex = 0;
        let minOptions = null;
        for (let index = 0; index < emptyCoordinates.length; index++) {
            let coordinates = emptyCoordinates[index];
            let options = this.getOptions(coordinates.x, coordinates.y);
            if (minOptions == null || options.length < minOptions.length) {
                minIndex = index;
                minOptions = options;
            }
        }
        emptyCoordinates = [...emptyCoordinates];
        let [{ x, y }] = emptyCoordinates.splice(minIndex, 1);

        for (let value of minOptions) {
            this.sudoku.values[y][x] = value;
            let success = this.step(emptyCoordinates);
            if (success) return true;
        }

        this.sudoku.values[y][x] = null;
        return false;
    }

    /**
     * @returns {Boolean} true if there are no duplicates in any row, column, and group
     */
    isPartiallySolved() {
        let rows = [[], [], [], [], [], [], [], [], []];
        let cols = [[], [], [], [], [], [], [], [], []];
        let groups = [[[], [], []], [[], [], []], [[], [], []]];

        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                let value = this.sudoku.values[y][x];
                if (value != null) {
                    rows[y].push(value);
                    cols[x].push(value);
                    groups[Math.floor(y / 3)][Math.floor(x / 3)].push(value);
                }
            }
        }

        let sets = [...rows, ...cols, ...groups[0], ...groups[1], ...groups[2]];
        return sets.every(s => s.sort().every((v, i) => v > (s[i - 1] || 0)));
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Number[]}
     */
    getRelevantValues(x, y) {
        let row = this.sudoku.values[y];
        let col = this.sudoku.values.map(r => r[x]);
        let gx = Math.floor(x / 3);
        let gy = Math.floor(y / 3);
        let group = this.sudoku.values.slice(gy * 3, gy * 3 + 3).map(r => r.slice(gx * 3, gx * 3 + 3));
        let values = [row, col, group].flat(2);
        return values;
    }

    getOptions(x, y) {
        let values = this.getRelevantValues(x, y);
        let isValueIncluded = [];
        let options = [];
        for (let i = 0; i < this.SIZE; i++) isValueIncluded[i] = true;
        for (let value of values) isValueIncluded[value - 1] = false;
        for (let i = 0; i < this.SIZE; i++) if (isValueIncluded[i]) options.push(i + 1);
        return options;
    }
}