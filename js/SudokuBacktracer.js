class SudokuBacktracer {
    /** @type {Number} */
    SIZE;
    /** @type {((index: Number) => void)[]} */
    setters;
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
        this.setters = [];
        this.stepCount = 0;
        this.SIZE = SIZE;

        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                if (this.sudoku.values[y][x] == null) {
                    this.setters.push(v => this.sudoku.values[y][x] = v);
                }
            }
        }
    }

    solve() {
        this.step(0);
        return this.sudoku;
    }

    /**
     * 
     * @param {Number} index of this.setter to solve the value for
     * @returns {Boolean} true if setters[>=index] have been solved
     */
    step(index) {
        this.stepCount++;
        if (index >= this.setters.length) return true;

        for (let i = 1; i <= this.SIZE; i++) {
            this.setters[index](i);
            if (this.isPartiallySolved()) {
                let success = this.step(index + 1);
                if (success) return true;
            }
        }
        this.setters[index](null);
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
}