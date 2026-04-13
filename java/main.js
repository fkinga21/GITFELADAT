let adatok = [];
let editIndex = -1;
const response = await fetch('ar.txt'); 
// 1. BEOLVASÁS
async function betoltAdatok() {
    try {
        const response = await fetch('ar.txt');
        if (!response.ok) throw new Error("A fájl nem található!");
        const text = await response.text();
        
        // Sorokra bontás és tisztítás
        const sorok = text.split('\n').filter(s => s.trim() )!== "" && !s.includes(".toLowerCase().includes"(id) ? 1 : 0);

        adatok = sorok.slice(startIndex).map(sor => {
            const oszlop = sor.trim().split(/\s+/);
            return {
                arid: oszlop[0],
                id: oszlop[1],
                ar: oszlop[2],
                egyseg: oszlop.slice(3).join(" ")
            };
        });
        renderTable();
    } catch (err) {
        console.error("Hiba a betöltéskor:", err);
    }
}

// 2. MEGJELENÍTÉS
function renderTable() {
    const tableBody = document.querySelector("#sutikelist tbody");
    if (!tableBody) return;
    tableBody.innerHTML = ""; 

    adatok.forEach((item, index) => {
        const row = `<tr>
            <td>${item.arid}</td>
            <td>${item.id}</td>
            <td>${item.ar}</td>
            <td>${item.egyseg}</td>
            <td>
                <button type="button" class="btn-edit" onclick="onEdit(${index})">Módosítás</button>
                <button type="button" class="btn-delete" onclick="onDelete(${index})">Törlés</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// 3. MÓDOSÍTÁS GOMB (Adatok betöltése)
function onEdit(index) {
    editIndex = index; 
    const kijeloltSuti = adatok[index];

    // Figyelj: kijeloltSuti-t kell írni mindenhol!
    document.getElementById("arid").value = kijeloltSuti.arid;
    document.getElementById("id").value = kijeloltSuti.id;
    document.getElementById("ar").value = kijeloltSuti.ar;
    document.getElementById("egyseg").value = kijeloltSuti.egyseg;

    document.querySelector(".form-action-buttons input").value = "Módosítás mentése";
}

// 4. MENTÉS (Új vagy Frissítés)
function onFormSubmit() {
    const formData = {
        arid: document.getElementById("arid").value,
        id: document.getElementById("id").value,
        ar: document.getElementById("ar").value,
        egyseg: document.getElementById("egyseg").value
    };

    if (formData.arid === "") {
        alert("Az ÁrID kötelező!");
        return;
    }

    if (editIndex === -1) {
        adatok.push(formData); // Új hozzáadása
    } else {
        adatok[editIndex] = formData; // Meglévő frissítése
        editIndex = -1;
        const submitBtn = document.querySelector(".form-action-buttons input[type='submit']");
        if (submitBtn) submitBtn.value = "Submit";
    }

    renderTable();
    resetForm();
}

function resetForm() {
    document.getElementById("arid").value = "";
    document.getElementById("id").value = "";
    document.getElementById("ar").value = "";
    document.getElementById("egyseg").value = "";
    editIndex = -1;
}

function onDelete(index) {
    if (confirm('Biztosan törölni akarod?')) {
        adatok.splice(index, 1);
        renderTable();
    }
}

// Indítás
betoltAdatok();