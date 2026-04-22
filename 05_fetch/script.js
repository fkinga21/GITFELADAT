const API_URL = 'api.php'; 

async function fetchTartalom() {
    const response = await fetch(API_URL);
    const adatok = await response.json();
    const list = document.getElementById('userList');
    list.innerHTML = '';
    
    adatok.forEach(item => {
        list.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.sutiid}</td>
                <td>${item.mentes}</td>
                <td>
                <button class="edit-btn">Szerkeszt</button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">Töröl</button>
                </td>
            </tr>`;

    });
}

async function addItem() {
    const id = document.getElementById('idInput').value;
    const sutiid = document.getElementById('sutiInput').value;
    const mentes = document.getElementById('mentesInput').value;
    
    const response = await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, sutiid, mentes })
    });

    // Ha a szerver hibaüzenetet küld (pl. 400), azt itt kezeljük
    if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Hiba történt!"); // Hibaüzenet megjelenítése
        return;
    }

    // MEZŐK ÜRÍTÉSE:
    document.getElementById('idInput').value = '';
    document.getElementById('sutiInput').value = '';
    document.getElementById('mentesInput').value = '';
    
    fetchTartalom();
}

async function deleteItem(id) {
    // Megjelenítjük a megerősítő ablakot
    const biztos = confirm("Biztosan törölni szeretnéd ezt az elemet?");
    
    // Ha a felhasználó a "Mégse"-re kattintott, akkor a függvény itt leáll (return)
    if (!biztos) {
        return;
    }

    // Ha az OK-ra kattintott, akkor folytatódik a kód és töröl:
    await fetch('api.php?id=' + id, {
        method: 'DELETE'
    });
    
    // Frissítjük a listát
    fetchTartalom();
}
document.addEventListener('DOMContentLoaded', fetchTartalom);