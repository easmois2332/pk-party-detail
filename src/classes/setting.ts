export default class Setting {

    settingColor: string = 'setting-color';
    color: string = 'blue';

    constructor() {
        this.getLocalStorage();
    }

    getColor() {
        return this.color;
    }

    setColor(value: string) {
        localStorage.setItem(this.settingColor, value);
        this.color = value;
    }

    getLocalStorage() {
        let value = localStorage.getItem(this.settingColor);
        if (value !== null) {
            this.color = value;
        }
    }
}