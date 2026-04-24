// 1. Alap osztály (Class, Constructor, Metódusok)
class Suti {
    constructor(id,nev, tipus, dijazott) {
        this.id = id;
        this.nev = nev;
        this.tipus = tipus;
        this.dijazott = dijazott; // A -1 vagy 0 értéket is tároljuk
    }

    // Metódus az alap kártya létrehozására
    createCardElement() {
        const div = document.createElement("div");
        div.className = "suti-card";
        return div;
    }

    render() {
        const div = this.createCardElement();
        div.innerHTML = `<small>ID: ${this.id}</small><h3>${this.nev}</h3><p>Típus: ${this.tipus}</p>`;
        document.getElementById("suti-container").appendChild(div);
    }
}

// 2. Örökölt osztály (Extends, Super)
class KiemeltSuti extends Suti {
    constructor(id, nev, tipus, dijazott, dijMegnevezes) {
        super(id,nev, tipus, dijazott); // Super használata az alap osztályhoz
        this.dijMegnevezes = dijMegnevezes;
    }

    // Metódus felülírása (Polimorfizmus)
    render(container) {
        const div = this.createCardElement();
        div.classList.add("dijazott");
        div.innerHTML = `<small>ID: ${this.id}</small><h3>${this.nev}</h3><p>Típus: ${this.tipus}</p><p>🏆 ${this.dijMegnevezes}</p>`;       
        document.getElementById("suti-container").appendChild(div);
    }
}
// document.body.appendChild használata 
const container = document.createElement("div");
container.id = "suti-container";
document.body.appendChild(container);

// 3. Adatok (Az adatbázis táblázatából)
const sutiAdatok = [
    { id: 1,nev: "Süni", tipus: "vegyes", dijazott: 0 },
    { id: 3,nev: "Sajtos pogácsa", tipus: "sós teasütemény", dijazott: 0 },
    { id: 4,nev: "Diós-mákos", tipus: "bejgli", dijazott: 0 },
    { id: 5,nev: "Sajttorta (málnás)", tipus: "torta", dijazott: 0 },
    { id: 7,nev: "Eszterházy", tipus: "tortaszelet", dijazott: 0 },
    { id: 8,nev: "Rákóczi-túrós", tipus: "pite", dijazott: 0 },
    { id: 9,nev: "Meggyes kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 66,nev: "Franciakrémes", tipus: "krémes", dijazott: 0 },
    { id: 12,nev: "Kókuszcsók", tipus: "édes teasütemény", dijazott: 0 },
    { id: 20,nev: "Ribizlihabos-almás réteges", tipus: "különleges torta", dijazott: -1 },
    { id: 128,nev: "Ropi", tipus: "sós teasütemény", dijazott: 0 },
    { id: 109,nev: "Gesztenye szív", tipus: "vegyes", dijazott: 0 },
    { id: 119,nev: "Feketeerdő torta", tipus: "torta", dijazott: 0 },
    { id: 77,nev: "Oroszkrém szelet", tipus: "tortaszelet", dijazott: 0 },
    { id: 14,nev: "Szilvás pite", tipus: "pite", dijazott: 0 },
    { id: 85,nev: "Képviselőfánk", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 135,nev: "Krémes (hagyományos)", tipus: "krémes", dijazott: 0 },
    { id: 102,nev: "Mézeskrémes", tipus: "pite", dijazott: 0 },    
    { id: 72,nev: "Csokis kaland", tipus: "különleges torta", dijazott: -1 }
];

// 4. Logika (Metódusok alkalmazása)
sutiAdatok.forEach(adat => {
    if (adat.dijazott === -1) {
        // KiemeltSuti példányosítása
        const suti = new KiemeltSuti(adat.id, adat.nev, adat.tipus, adat.dijazott, "Díjazott");
        suti.render(container);
    } else {
        // Suti példányosítása
        const suti = new Suti(adat.id, adat.nev, adat.tipus, adat.dijazott);
        suti.render(container);
    }
});
