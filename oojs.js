class Suti {
    constructor(nev, tipus) {
        this.nev = nev;
        this.tipus = tipus;
    }

    render() {
        const div = document.createElement("div");
        div.className = "suti-card";
        div.innerHTML = `<h3>${this.nev}</h3><p>Típus: ${this.tipus}</p>`;
        document.getElementById("suti-container").appendChild(div);
    }
}

// Örökölt osztály (extends + super)
class KiemeltSuti extends Suti {
    constructor(nev, tipus, dij) {
        super(nev, tipus); // meghívja az alap osztály konstruktorát
        this.dij = dij;
    }

    render() {
        const div = document.createElement("div");
        div.className = "suti-card dijazott";
        div.innerHTML = `<h3>${this.nev}</h3><p>Típus: ${this.tipus}</p><p>🏆 ${this.dij}</p>`;
        document.body.appendChild(div); // document.body.appendChild használata
    }
}

// Alkalmazás
const sutik = [
    new Suti("Csokis Fánk", "Édes"),
    new KiemeltSuti("Málnás Torta", "Torta", "Év Sütije")
];

sutik.forEach(s => s.render());