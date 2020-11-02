import { fstat } from "fs";

import fs from "fs";
import Adatok from "./Adatok";
export default class Megoldas {
    // Függvény mpbe(o, p, mp:egész szám):egész szám
    public mpbe(ora: number, perc: number, masodperc: number): number {
        return ora * 3600 + perc * 60 + masodperc;
    }

    private _l: Adatok[] = [];
    public get stat(): string[] {
        const stat = new Map();
        this._l.forEach(i => {
            if (stat.has(i.hivasKezdeteOra)) {
                stat.get(i.hivasKezdeteOra).val++;
            } else {
                stat.set(i.hivasKezdeteOra, { val: 1 });
            }
        });
        const t: string[] = [];
        for (const entry of stat.entries()) {
            t.push(entry[0] + " ora " + entry[1].val + " hivas");
        }
        return t;
    }
    public get max(): number[] {
        let maxHossz: number = 0;
        let maxIndex: number = 0;
        for (let index = 0; index < this._l.length; index++) {
            //console.log(this.mpbe(this._l[index].hivasKezdeteOra, this._l[index].hivasKezdetePerc, this._l[index].hivasKezdeteMasodperc));
            if (this.mpbe(this._l[index].hivasVegeOra, this._l[index].hivasVegePerc, this._l[index].hivasVegeMasodperc) - this.mpbe(this._l[index].hivasKezdeteOra, this._l[index].hivasKezdetePerc, this._l[index].hivasKezdeteMasodperc) >= maxHossz) {
                maxIndex = index;
                maxHossz = this.mpbe(this._l[index].hivasVegeOra, this._l[index].hivasVegePerc, this._l[index].hivasVegeMasodperc) - this.mpbe(this._l[index].hivasKezdeteOra, this._l[index].hivasKezdetePerc, this._l[index].hivasKezdeteMasodperc);
            }
        }
        return [maxHossz, maxIndex];
    }
    public bekert(idopont: string): any {
        const be: string[] = idopont.split(" ");
        const beDT: Date = new Date(1, 1, 1, parseInt(be[0]), parseInt(be[1]), parseInt(be[2]));
        let sorban: number = -1;
        let s: number = 0;
        this._l.forEach(i => {
            if (beDT >= i.kezd && beDT <= i.veg) {
                sorban++;
                if (s == 0) {
                    s = this._l.indexOf(i);
                }
            }
        });
        if (sorban == -1) {
            return "Nem volt beszélő";
        }
        return "A varakozok szama: " + sorban + " a beszelo a " + (s + 1) + ". hivo";
    }
    private _indexUtolso: number = 0;
    public get utolso(): any[] {
        for (let index = 0; index < this._l.length; index++) {
            if (this._l[index].hivasKezdeteOra == 11 && this._l[index + 1].veg <= this._l[index].veg) {
                this._indexUtolso = index;
            }
        }
        const utolso: Date = this._l[this._indexUtolso + 1].kezd;
        const utolsok: number[] = [];
        this._l.forEach(i => {
            if (utolso >= i.kezd && utolso <= i.veg) {
                utolsok.push(this._l.indexOf(i) + 1);
            }
        });
        let bg = new Date(1, 1, 1, 10, 10, 10);
        const s3: number = utolsok[0] + utolsok.length;
        for (let index = utolsok[0]; index < s3 - 1; index++) {
            if (this._l[index].veg > bg) {
                bg = this._l[index].veg;
            }
        }
        return [this._indexUtolso + 1, this.mpbe(bg.getHours(), bg.getMinutes(), bg.getSeconds()) - this.mpbe(this._l[this._indexUtolso].hivasKezdeteOra, this._l[this._indexUtolso].hivasKezdetePerc, this._l[this._indexUtolso].hivasKezdeteMasodperc)];
    }
    public get file(): string {
        const t2: string[] = [];
        let s4: Date = new Date(1, 1, 1, 0, 1, 1);
        let elso: boolean = true;
        let elozoDatum = new Date();
        this._l.forEach(i => {
            if (i.veg.getHours() >= 8 && i.veg <= this._l[this._indexUtolso].veg && i.veg > s4) {
                if (elso == true) {
                    s4 = i.veg;
                    t2.push(this._l.indexOf(i) + 1 + " " + 8 + " " + 0 + " " + 0 + " " + s4.getHours() + " " + s4.getMinutes() + " " + s4.getSeconds());
                    elozoDatum = new Date(1, 1, 1, s4.getHours(), s4.getMinutes(), s4.getSeconds());
                    elso = false;
                } else {
                    s4 = i.veg;
                    t2.push(this._l.indexOf(i) + 1 + " " + elozoDatum.getHours() + " " + elozoDatum.getMinutes() + " " + elozoDatum.getSeconds() + " " + s4.getHours() + " " + s4.getMinutes() + " " + s4.getSeconds());
                    elozoDatum = new Date(1, 1, 1, s4.getHours(), s4.getMinutes(), s4.getSeconds());
                }
            }
        });
        fs.writeFileSync("sikeres.txt", t2.join("\r\n"));
        return t2.join("\r\n");
    }
    constructor() {
        fs.readFileSync("hivas.txt")
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                if (aktSor != "") {
                    this._l.push(new Adatok(aktSor));
                }
            });
    }
}
