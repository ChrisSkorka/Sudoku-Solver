class Sudoku {
    SIZE;
    values;

    constructor(SIZE = 9) {
        this.SIZE = SIZE;

        this.values = [];
        for (let y = 0; y < this.SIZE; y++) {
            this.values[y] = [];
            for (let x = 0; x < this.SIZE; x++) {
                this.values[y][x] = null;
            }
        }
    }

    isSolved() {
        if (this.values.flat().some(v => v == null)) return false;
        let rows = [[], [], [], [], [], [], [], [], []];
        let cols = [[], [], [], [], [], [], [], [], []];
        let groups = [[[], [], []], [[], [], []], [[], [], []]];

        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                let value = this.values[y][x];
                rows[y].push(value);
                cols[x].push(value);
                groups[Math.floor(y / 3)][Math.floor(x / 3)].push(value);
            }
        }

        let sets = [...rows, ...cols, ...groups[0], ...groups[1], ...groups[2]];
        return sets.every(s => s.sort().every((v, i) => v == i + 1));
    }

    copy() {
        let copy = new Sudoku(this.SIZE);
        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                copy.values[y][x] = this.values[y][x];
            }
        }
        return copy;
    }
}