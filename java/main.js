let priceData = [
    { id: 1, sutiid: 32, ertek: 500, egyseg: "db" },
    { id: 2, sutiid: 76, ertek: 10900, egyseg: "16 szeletes" },
    { id: 3, sutiid: 106, ertek: 4300, egyseg: "8 szeletes" },
    { id: 4, sutiid: 88, ertek: 300, egyseg: "db" },
    { id: 5, sutiid: 116, ertek: 16200, egyseg: "24 szeletes" },
    // ... ide jöhet a többi adat is az ar.txt-ből
    { id: 208, sutiid: 89, ertek: 4700, egyseg: "8 szeletes" }
];

const tableBody = document.getElementById('table-body');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const editIdInput = document.getElementById('edit-id');

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

return (
    <div>
        {/* Vissza gomb az oldal tetejére */}
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <a href="../index.html" className="btn-back">
                ← Vissza a főoldalra
            </a>
        </div>

        <h1>Új Süti CRUD</h1>
        
        {/* ... (az űrlap és a táblázat többi része változatlan) */}
    </div>
);