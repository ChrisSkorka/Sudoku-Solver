class Controls {
    /** @type {HTMLButtonElement} */
    buttonLoadClear;
    /** @type {HTMLSelectElement} */
    selectPresets;
    /** @type {HTMLButtonElement} */
    buttonLoad;
    /** @type {HTMLSelectElement} */
    selectAlgorithm;
    /** @type {HTMLButtonElement} */
    buttonSolve;

    /** @type {(e: Event) => void|null|any} */
    onButtonLoadClear;
    /** @type {(value: string, e: Event) => void|null|any} */
    onButtonLoad;
    /** @type {(value: string, e: Event) => void|null|any} */
    onButtonSolve;

    constructor() {
        this.buttonLoadClear = document.getElementById('button-load-clear');
        this.selectPresets = document.getElementById('select-resets');
        this.buttonLoad = document.getElementById('button-load');
        this.selectAlgorithm = document.getElementById('select-algorithm');
        this.buttonSolve = document.getElementById('button-solve');

        for(let key in presets){
            let option = document.createElement('option');
            option.value = key;
            option.innerText = key;
            this.selectPresets.options.add(option);
        }

        this.buttonLoadClear.onclick = e => this.onButtonLoadClear == null ? null : this.onButtonLoadClear(e);
        this.buttonLoad.onclick = e => this.onButtonLoad == null ? null : this.onButtonLoad(this.selectPresets.value, e);
        this.buttonSolve.onclick = e => this.onButtonSolve == null ? null : this.onButtonSolve(this.selectAlgorithm.value, e);
    }
}