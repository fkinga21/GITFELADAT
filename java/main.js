
let sutiAdatok = [
    { id: 1, sutiid: 32, ertek: 500, egyseg: "db" },
    { id: 2, sutiid: 76, ertek: 10900, egyseg: "16 szeletes" },
    { id: 3, sutiid: 106, ertek: 4300, egyseg: "8 szeletes" },
    { id: 4, sutiid: 88, ertek: 300, egyseg: "db" },
    { id: 5, sutiid: 116, ertek: 16200, egyseg: "24 szeletes" },
    { id: 6, sutiid: 135, ertek: 250, egyseg: "db" },
    { id: 7, sutiid: 127, ertek: 4400, egyseg: "kg" },
    { id: 8, sutiid: 50, ertek: 13400, egyseg: "24 szeletes" },
    { id: 9, sutiid: 70, ertek: 700, egyseg: "db" },
    { id: 10, sutiid: 31, ertek: 5200, egyseg: "kg" },
    { id: 172, sutiid: 43, ertek: 4200, egyseg: "kg" },
    { id: 208, sutiid: 53, ertek: 4200, egyseg: "kg" }
];

function megjelenit() {
    const tableBody = document.getElementById('adat-tablazat');
    tableBody.innerHTML = '';

    sutiAdatok.forEach(adat => {
        const row = `
            <tr>
                <td>${adat.id}</td>
                <td>${adat.sutiid}</td>
                <td style="font-weight: bold;">${adat.ertek} Ft</td>
                <td>${adat.egyseg}</td>
                <td>
                    <button class="btn-edit" onclick="szerkesztesBetolt(${adat.id})">Szerkeszt</button>
                    <button class="btn-delete" onclick="torles(${adat.id})">Töröl</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function mentes() {
    const editId = document.getElementById('edit-id').value;
    const sutiid = document.getElementById('sutiid').value;
    const ertek = document.getElementById('ertek').value;
    const egyseg = document.getElementById('egyseg').value;

    if (!sutiid || !ertek || !egyseg) return alert("Tölts ki minden mezőt!");

    if (editId) {
        // Módosítás
        const index = sutiAdatok.findIndex(a => a.id == editId);
        sutiAdatok[index] = { id: parseInt(editId), sutiid, ertek, egyseg };
    } else {
        // Új hozzáadása
        const ujId = sutiAdatok.length > 0 ? Math.max(...sutiAdatok.map(a => a.id)) + 1 : 1;
        sutiAdatok.push({ id: ujId, sutiid, ertek, egyseg });
    }

    urlapAlaphelyzet();
    megjelenit();
}

function torles(id) {
    if (confirm("Biztosan törlöd?")) {
        sutiAdatok = sutiAdatok.filter(adat => adat.id !== id);
        megjelenit();
    }
}

function szerkesztesBetolt(id) {
    const adat = sutiAdatok.find(a => a.id === id);
    document.getElementById('edit-id').value = adat.id;
    document.getElementById('sutiid').value = adat.sutiid;
    document.getElementById('ertek').value = adat.ertek;
    document.getElementById('egyseg').value = adat.egyseg;
    
    document.getElementById('main-button').innerText = "Módosítás mentése";
    document.getElementById('main-button').style.backgroundColor = "#9c27b0";
}

function urlapAlaphelyzet() {
    document.getElementById('edit-id').value = '';
    document.getElementById('sutiid').value = '';
    document.getElementById('ertek').value = '';
    document.getElementById('egyseg').value = '';
    document.getElementById('main-button').innerText = "Hozzáadás";
    document.getElementById('main-button').style.backgroundColor = "#e082e0";
}

window.onload = megjelenit;