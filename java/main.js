let adatok = [];
let editIndex = -1;

// 1. ADATOK BETÖLTÉSE
async function betoltAdatok() {
    try {
        const response = await fetch('ar.txt');
        if (!response.ok) throw new Error("Nem találom az ar.txt-t!");
        const text = await response.text();
        
        // Sorokra bontás és tisztítás (forrásmegjelölések nélkül)
        const sorok = text.split('\n').filter(s => s.trim() !== "" && !s.includes("".toLowerCase().includes("id"))) ? 1 : 0;

        adatok = sorok.slice(startIndex).map(sor => {
            const oszlop = sor.trim().split(/\s+/);
            return {
                arid: oszlop[0] || "",
                id: oszlop[1] || "",
                ar: oszlop[2] || "",
                egyseg: oszlop.slice(3).join(" ") || ""
            };
        });

        renderTable();
    } catch (err) {
        console.error("Hiba történt:", err);
    }
}

// 2. TÁBLÁZAT KIRAJZOLÁSA
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
                <button type="button" onclick="onEdit(${index})">Módosítás</button>
                <button type="button" onclick="onDelete(${index})">Törlés</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row; // Fontos a += jel!
    });
}

// 3. HOZZÁADÁS / MENTÉS GOMB
function onFormSubmit() {
    const formData = {
        arid: document.getElementById("arid").value,
        id: document.getElementById("id").value,
        ar: document.getElementById("ar").value,
        egyseg: document.getElementById("egyseg").value
    };

    if (formData.arid === "") {
        alert("Sütike ÁrID megadása kötelező!");
        return;
    }

    if (editIndex === -1) {
        adatok.push(formData); // Új hozzáadása
    } else {
        adatok[editIndex] = formData; // Módosítás mentése
        editIndex = -1;
        document.querySelector(".form-action-buttons input").value = "Hozzáad";
    }

    renderTable();
    resetForm();
}

// 4. MÓDOSÍTÁS INDÍTÁSA
function onEdit(index) {
    editIndex = index;
    const kijelolt = adatok[index];
    document.getElementById("arid").value = kijelolt.arid;
    document.getElementById("id").value = kijelolt.id;
    document.getElementById("ar").value = kijelolt.ar;
    document.getElementById("egyseg").value = kijelolt.egyseg;

    document.querySelector(".form-action-buttons input").value = "Módosítás mentése";
}

// 5. TÖRLÉS ÉS RESET
function onDelete(index) {
    if (confirm("Biztosan törlöd?")) {
        adatok.splice(index, 1);
        renderTable();
    }
}

function resetForm() {
    document.getElementById("arid").value = "";
    document.getElementById("id").value = "";
    document.getElementById("ar").value = "";
    document.getElementById("egyseg").value = "";
}

// Indítás
betoltAdatok();