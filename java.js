function mostrarTexto() {
    document.getElementById("mensaje").style.display = "block";
}

 function cambiarColor() {

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}
async function agregarComentario() {
    let texto = document.getElementById("comentario").value;

    await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto })
    });

    cargarComentarios();
}

async function cargarComentarios() {
    let res = await fetch("http://localhost:3000/comentarios");
    let data = await res.json();

    let lista = document.getElementById("listaComentarios");
    lista.innerHTML = "";

    data.forEach((c, index) => {
        lista.innerHTML += `
                 <li>
                   ${c}
                    <button onclick="editarComentario(${index}, '${c}')">Editar</button>
                    <button onclick="eliminarComentario(${index})">X</button>
            </li>
        `;
    });
}

async function eliminarComentario(id) {
    await fetch(`http://localhost:3000/comentarios/${id}`, {
        method: "DELETE"
    });

    cargarComentarios();
}

// Cargar al iniciar
cargarComentarios();
async function editarComentario(id, textoActual) {
    let nuevoTexto = prompt("Editar comentario:", textoActual);

    if (nuevoTexto !== null) {
        await fetch(`http://localhost:3000/comentarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ texto: nuevoTexto })
        });

        cargarComentarios();
    }
}
