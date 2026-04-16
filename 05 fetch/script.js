const apiUrl = 'api.php';


async function loadData() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    data.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.sutiid}</td>
                <td>${item.mentes}</td>
                <td><button onclick="deleteData(${item.id})">Törlés</button></td>
            </tr>`;
    });
}


async function addData() {
    const sutiid = document.getElementById('sutiid').value;
    const mentes = document.getElementById('mentes').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sutiid, mentes })
    });
    loadData();
}


async function deleteData(id) {
    await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
    loadData();
}

loadData();