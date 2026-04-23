document.addEventListener("DOMContentLoaded", function() {
    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.innerHTML = `
        <a href="/index.html">Főoldal</a>
        <a href="/02_java_menu/javascript.html">Árlista - JS CRUD</a> 
        <a href="/03_react_menu/react.html">Nyilvántartás - React CRUD</a> 
        <a href="/react/menu/dist/index.html">SütiJáték - SPA</a> 
        <a href="/05_fetch/fetchapi.html">Adatbázis - Fetch API</a> 
        <a href="/06_axios/build/index.html">Adatbázis - Axios menü</a> 
        <a href="/oojs.html">OOJS menü</a>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
});