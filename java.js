function mostrarTexto() {
    document.getElementById("mensaje").style.display = "block";
}

function cambiarColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
}

const API = "http://192.168.1.13:3000/comentarios";

// AGREGAR
async function agregarComentario() {
    let input = document.getElementById("comentario");
    let texto = input.value;

    if (!texto) {
        alert("Escribí algo primero");
        return;
    }

    try {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ texto })
        });

        input.value = "";
        cargarComentarios();

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar al servidor");
    }
}

// MOSTRAR
async function cargarComentarios() {
    try {
        let res = await fetch(API);
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

    } catch (error) {
        console.error("Error cargando comentarios:", error);
    }
}

// ELIMINAR
async function eliminarComentario(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarComentarios();
}

// EDITAR
async function editarComentario(id, textoActual) {
    let nuevoTexto = prompt("Editar comentario:", textoActual);

    if (nuevoTexto !== null) {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ texto: nuevoTexto })
        });

        cargarComentarios();
    }
}

// INICIAR
cargarComentarios();
