export default class Adatok {
    private _hivasKezdeteOra: number;
    private _hivasKezdetePerc: number;
    private _hivasKezdeteMasodperc: number;
    private _hivasVegeOra: number;
    private _hivasVegePerc: number;
    private _hivasVegeMasodperc: number;
    private _kezd: Date;
    private _veg: Date;
    public get hivasKezdeteOra(): number {
        return this._hivasKezdeteOra;
    }
    public get hivasKezdetePerc(): number {
        return this._hivasKezdetePerc;
    }
    public get hivasKezdeteMasodperc(): number {
        return this._hivasKezdeteMasodperc;
    }
    public get hivasVegeOra(): number {
        return this._hivasVegeOra;
    }
    public get hivasVegePerc(): number {
        return this._hivasVegePerc;
    }
    public get hivasVegeMasodperc(): number {
        return this._hivasVegeMasodperc;
    }
    public get kezd(): Date {
        return this._kezd;
    }
    public get veg(): Date {
        return this._veg;
    }
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._hivasKezdeteOra = parseInt(m[0]);
        this._hivasKezdetePerc = parseInt(m[1]);
        this._hivasKezdeteMasodperc = parseInt(m[2]);
        this._hivasVegeOra = parseInt(m[3]);
        this._hivasVegePerc = parseInt(m[4]);
        this._hivasVegeMasodperc = parseInt(m[5]);
        this._kezd = new Date(1, 1, 1, this._hivasKezdeteOra, this._hivasKezdetePerc, this._hivasKezdeteMasodperc);
        this._veg = new Date(1, 1, 1, this._hivasVegeOra, this._hivasVegePerc, this._hivasVegeMasodperc);
    }
}
