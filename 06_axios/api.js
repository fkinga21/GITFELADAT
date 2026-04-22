import axios from 'axios';
const API_URL = 'http://cukiweb1.nhely.hu/06_axios/api';

export const getAr = () => axios.get(`${API_URL}/get_ar.php`);
export const addAr = (data) => axios.post(`${API_URL}/add_ar.php`, data);

import axios from 'axios';

// Adatok lekérése
const fetchAr = async () => {
    const res = await axios.get('http://cukiweb1.nhely.hu/06_axios/get_ar.php');
    console.log(res.data);
};

// Adat hozzáadása
const addSuti = async (ujSuti) => {
    await axios.post('http://cukiweb1.nhely.hu/06_axios/add_ar.php', ujSuti);
    fetchAr(); // Frissítés
};

// Törlés
const deleteSuti = async (id) => {
    await axios.post('http://cukiweb1.nhely.hu/06_axios/delete_ar.php', { id: id });
    fetchAr(); // Frissítés
};

const updateSuti = async (id, frissitettAdat) => {
    try {
        await axios.post('http://cukiweb1.nhely.hu/06_axios/update_ar.php', {
            id: id,
            sutid: frissitettAdat.sutid,
            ertek: frissitettAdat.ertek,
            egyseg: frissitettAdat.egyseg
        });
        alert("Sikeres frissítés!");
        fetchAr(); 
    } catch (error) {
        console.error("Hiba történt:", error);
    }
};
