import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Telefonos ügyfélszolgálat</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;
        // Kezd a kódolást innen -->
        const megold = new Megoldas();
        res.write("<h1>Telefonos ügyfélszolgálat</h1>");
        res.write("<h2>Készítette: Kardos Raul</h2>");
        res.write("3. feladat:\n");
        megold.stat.forEach(i => {
            res.write(`${i}\n`);
        });
        res.write("\n4. feladat:");
        res.write(`\nA leghosszabb ideig vonalban levo hivo ${megold.max[1]}. sorban szerepel, a hivas hossza: ${megold.max[0]} masodperc.`);
        const idopont: string = params.idopont as string;
        res.write("\n\n5. feladat:");
        res.write(`\nAdjon meg egy idopontot! (ora perc masodperc) <input type='text' value='' name='idopont' value=${idopont} style='max-width:100px;' onChange='this.form.submit();'>`);
        if (idopont != null) {
            res.write(`\n${megold.bekert(idopont)}`);
        }
        res.write("\n\n6.feladat:");
        res.write(`\nAz utolso telefonalo adatai a(z) ${megold.utolso[0]}. sorban vannak, ${megold.utolso[1]} masodpercig vart.`);
        megold.file();
        res.write("<a href='https://github.com/krdsrl/KR13ATelefonosUgyfelszolgalat'>GIT</a>");
        res.write("<a href='https://kr13atelefonosugyfelszolgalat.herokuapp.com'>Heroku</a>");
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
