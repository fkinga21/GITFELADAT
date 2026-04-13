// 1. Adatok betöltése a tömbbe (Az ar.txt forrásai alapján)
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

// 2. READ: Táblázat kirajzolása
function renderTable() {
    tableBody.innerHTML = '';
    priceData.forEach(item => {
        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.sutiid}</td>
                <td>${item.ertek} Ft</td>
                <td>${item.egyseg}</td>
                <td>
                    <button class="btn-edit" onclick="editItem(${item.id})">Szerkeszt</button>
                    <button class="btn-delete" onclick="deleteItem(${item.id})">Töröl</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 3. CREATE & UPDATE: Mentés gépelés után
saveBtn.addEventListener('click', () => {
    const sutiid = parseInt(document.getElementById('sutiid').value);
    const ertek = parseInt(document.getElementById('ertek').value);
    const egyseg = document.getElementById('egyseg').value;
    const editId = editIdInput.value;

    if (!sutiid || !ertek || !egyseg) {
        alert("Kérlek tölts ki minden mezőt!");
        return;
    }

    if (editId) {
        // UPDATE (Szerkesztés)
        const index = priceData.findIndex(p => p.id == editId);
        priceData[index] = { id: parseInt(editId), sutiid, ertek, egyseg };
        resetForm();
    } else {
        // CREATE (Új felvétel)
        const newId = priceData.length > 0 ? Math.max(...priceData.map(p => p.id)) + 1 : 1;
        priceData.push({ id: newId, sutiid, ertek, egyseg });
    }

    renderTable();
    clearInputs();
});

// 4. DELETE: Törlés a tömbből
function deleteItem(id) {
    if (confirm("Biztosan törölni szeretnéd?")) {
        priceData = priceData.filter(item => item.id !== id);
        renderTable();
    }
}

// 5. EDIT: Adatok betöltése az űrlapba
function editItem(id) {
    const item = priceData.find(p => p.id === id);
    document.getElementById('sutiid').value = item.sutiid;
    document.getElementById('ertek').value = item.ertek;
    document.getElementById('egyseg').value = item.egyseg;
    editIdInput.value = item.id;
    
    saveBtn.innerText = "Módosítás mentése";
    saveBtn.style.backgroundColor = "#ffc107";
    cancelBtn.style.display = "inline";
}

// Segédfüggvények
function clearInputs() {
    document.getElementById('sutiid').value = '';
    document.getElementById('ertek').value = '';
    document.getElementById('egyseg').value = '';
}

function resetForm() {
    editIdInput.value = '';
    saveBtn.innerText = "Hozzáadás";
    saveBtn.style.backgroundColor = "#28a745";
    cancelBtn.style.display = "none";
    clearInputs();
}

cancelBtn.addEventListener('click', resetForm);

// Első betöltés
renderTable();
<button onclick="location.href='index.html'" class="btn-back">Vissza a főoldalra</button>