/**
 * Dinamikus navigációs menü generálása
 * Ez a megoldás biztosítja, hogy minden aloldalon egységes legyen a menüsor,
 * anélkül, hogy minden HTML fájlba külön bele kellene írni.
 */
document.addEventListener("DOMContentLoaded", function() {
    // 1. A navigációs konténer (nav) létrehozása és stílusosztályának beállítása
    const nav = document.createElement("nav");
    nav.className = "navbar"; // A suti.css-ben definiált formázást kapja meg
    // 2. A menüpontok (linkek) összeállítása a projekt struktúrája alapján
    // Minden link egy-egy külön technológiai megvalósítást képvisel (CRUD, SPA, API, OOJS)
    nav.innerHTML = `
        <a href="/index.html">Főoldal</a>
        <a href="/02_java_menu/javascript.html">Árlista - JS CRUD</a> 
        <a href="/03_react_menu/react.html">Nyilvántartás - React CRUD</a> 
        <a href="/react/menu/dist/index.html">SütiJáték - SPA</a> 
        <a href="/05_fetch/fetchapi.html">Adatbázis - Fetch API</a> 
        <a href="/06_axios/build/index.html">Adatbázis - Axios menü</a> 
        <a href="/oojs.html">OOJS menü</a>
    `;
    // 3. A létrehozott navigációs sáv beszúrása a dokumentum elejére
    // A DOM manipulációval a menü az oldal legtetejére kerül, közvetlenül a body elején belül.
    document.body.insertBefore(nav, document.body.firstChild);
});
