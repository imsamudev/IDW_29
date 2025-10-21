import {
  inicializarMedicos,
  inicializarEspecialidades,
  inicializarObrasSociales,
} from "./datos-iniciales.js";

inicializarMedicos();
inicializarEspecialidades();
inicializarObrasSociales();

function obtenerMedicos() {
  return JSON.parse(localStorage.getItem("medicos")) || [];
}

function guardarMedicos(medicos) {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}

function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem("especialidades")) || [];
}

function obtenerObrasSociales() {
  return JSON.parse(localStorage.getItem("obrasSociales")) || [];
}

function renderizarTablaMedicos() {
  const tbody = document.querySelector("#tablaMedicos tbody");
  const tabla = document.getElementById("tablaMedicos");
  const medicos = obtenerMedicos();
  const especialidades = obtenerEspecialidades();

  const theme = document.documentElement.getAttribute("data-bs-theme");
  tabla.classList.remove("table-dark", "table-light");
  if (theme === "dark") {
    tabla.classList.add("table-dark");
  } else {
    tabla.classList.add("table-light");
  }

  tbody.innerHTML = "";

  medicos.forEach((medico) => {
    const especialidad = especialidades.find(
      (e) => e.id === medico.especialidadId
    );

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <img src="${medico.fotoBase64}" alt="${medico.nombre} ${
      medico.apellido
    }" class="img-fluid rounded-circle" style="width:48px; height:48px; object-fit:cover;">
      </td>
      <td>${medico.apellido}, ${medico.nombre}</td>
      <td>${especialidad ? especialidad.nombre : ""}</td>
      <td class="d-none d-md-table-cell text-end">
        <div class="d-flex flex-row gap-1 justify-content-center">
          <button class="btn btn-sm btn-info" onclick="verMedico(${
            medico.id
          })">Ver</button>
          <button class="btn btn-sm btn-warning" onclick="editarMedico(${
            medico.id
          })">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarMedico(${
            medico.id
          })">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    const trMobile = document.createElement("tr");
    trMobile.className = "d-table-row d-md-none";
    trMobile.innerHTML = `
      <td colspan="4" class="text-center">
        <div class="d-flex flex-column gap-2">
          <button class="btn btn-sm btn-info py-2" onclick="verMedico(${medico.id})">Ver</button>
          <button class="btn btn-sm btn-warning py-2" onclick="editarMedico(${medico.id})">Editar</button>
          <button class="btn btn-sm btn-danger py-2" onclick="eliminarMedico(${medico.id})">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(trMobile);
  });
}

function aplicarTemaCards() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  const cardForm = document.getElementById("cardFormMedico");
  const cardTabla = document.getElementById("cardTablaMedicos");

  [cardForm, cardTabla].forEach((card) => {
    if (!card) return;
    card.classList.remove(
      "bg-light",
      "bg-dark",
      "text-light",
      "text-dark",
      "border-light",
      "border-dark"
    );
    if (theme === "dark") {
      card.classList.add("bg-dark", "text-light", "border-light");
    } else {
      card.classList.add("bg-light", "text-dark", "border-dark");
    }
  });
}

const observer = new MutationObserver(() => {
  aplicarTemaCards();
  renderizarTablaMedicos();

  const modalContent = document.getElementById("verMedicoModalContent");
  if (modalContent) {
    const theme = document.documentElement.getAttribute("data-bs-theme");
    modalContent.classList.remove(
      "bg-light",
      "bg-dark",
      "text-light",
      "text-dark"
    );
    if (theme === "dark") {
      modalContent.classList.add("bg-dark", "text-light");
    } else {
      modalContent.classList.add("bg-light", "text-dark");
    }
  }
});
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-bs-theme"],
});

function renderizarOpcionesEspecialidad() {
  const select = document.getElementById("especialidadMedico");
  const especialidades = obtenerEspecialidades();
  select.innerHTML = especialidades
    .map((e) => `<option value="${e.id}">${e.nombre}</option>`)
    .join("");
}

function renderizarOpcionesObrasSociales() {
  const obrasSociales = obtenerObrasSociales();
  const container = document.getElementById("obrasSocialesMedico");
  container.innerHTML = obrasSociales
    .map(
      (os) =>
        `<div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="os${os.id}" value="${os.id}">
          <label class="form-check-label" for="os${os.id}">${os.nombre}</label>
        </div>`
    )
    .join("");
}

function limpiarFormularioMedico() {
  document.getElementById("medicoId").value = "";
  document.getElementById("nombreMedico").value = "";
  document.getElementById("apellidoMedico").value = "";
  document.getElementById("especialidadMedico").value = "";
  document.getElementById("matriculaMedico").value = "";
  document.getElementById("descripcionMedico").value = "";
  document.getElementById("valorConsultaMedico").value = "";
  document.getElementById("fotoMedico").value = "";
  document
    .querySelectorAll("#obrasSocialesMedico input[type=checkbox]")
    .forEach((cb) => (cb.checked = false));
  document.getElementById("guardarMedicoBtn").textContent = "Guardar Médico";
  document.getElementById("cancelarEdicionBtn").style.display = "none";
}

document
  .getElementById("fotoMedicoArchivo")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) {
      document.getElementById("fotoMedico").value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function (evt) {
      document.getElementById("fotoMedico").value = evt.target.result;
    };
    reader.readAsDataURL(file);
  });

document.getElementById("formMedico").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("medicoId").value;
  const nombre = document.getElementById("nombreMedico").value.trim();
  const apellido = document.getElementById("apellidoMedico").value.trim();
  const especialidadId = parseInt(
    document.getElementById("especialidadMedico").value
  );
  const matricula = parseInt(document.getElementById("matriculaMedico").value);
  const descripcion = document.getElementById("descripcionMedico").value.trim();
  const valorConsulta = parseFloat(
    document.getElementById("valorConsultaMedico").value
  );
  const fotoBase64 = document.getElementById("fotoMedico").value.trim();
  const obrasSociales = Array.from(
    document.querySelectorAll(
      "#obrasSocialesMedico input[type=checkbox]:checked"
    )
  ).map((cb) => parseInt(cb.value));

  if (
    !nombre ||
    !apellido ||
    !especialidadId ||
    !matricula ||
    !descripcion ||
    !valorConsulta ||
    obrasSociales.length === 0 ||
    !fotoBase64
  ) {
    mostrarMensajeMedico("Todos los campos son obligatorios.", "danger");
    return;
  }

  let medicos = obtenerMedicos();

  if (id) {
    const idx = medicos.findIndex((m) => m.id == id);
    if (idx !== -1) {
      medicos[idx] = {
        id: parseInt(id),
        nombre,
        apellido,
        especialidadId,
        matricula,
        descripcion,
        valorConsulta,
        fotoBase64,
        obrasSociales,
      };
      mostrarMensajeMedico("Médico actualizado correctamente.", "success");
    }
  } else {
    const nuevoId = medicos.length
      ? Math.max(...medicos.map((m) => m.id)) + 1
      : 1;
    medicos.push({
      id: nuevoId,
      nombre,
      apellido,
      especialidadId,
      matricula,
      descripcion,
      valorConsulta,
      fotoBase64,
      obrasSociales,
    });
    mostrarMensajeMedico("Médico agregado correctamente.", "success");
  }

  guardarMedicos(medicos);
  renderizarTablaMedicos();
  limpiarFormularioMedico();
});

window.editarMedico = function (id) {
  const medicos = obtenerMedicos();
  const medico = medicos.find((m) => m.id === id);
  if (medico) {
    document.getElementById("medicoId").value = medico.id;
    document.getElementById("nombreMedico").value = medico.nombre;
    document.getElementById("apellidoMedico").value = medico.apellido;
    document.getElementById("especialidadMedico").value = medico.especialidadId;
    document.getElementById("matriculaMedico").value = medico.matricula;
    document.getElementById("descripcionMedico").value = medico.descripcion;
    document.getElementById("valorConsultaMedico").value = medico.valorConsulta;
    document.getElementById("fotoMedico").value = medico.fotoBase64;
    document
      .querySelectorAll("#obrasSocialesMedico input[type=checkbox]")
      .forEach((cb) => {
        cb.checked = medico.obrasSociales.includes(parseInt(cb.value));
      });
    document.getElementById("guardarMedicoBtn").textContent =
      "Actualizar Médico";
    document.getElementById("cancelarEdicionBtn").style.display =
      "inline-block";
  }
};

document
  .getElementById("cancelarEdicionBtn")
  .addEventListener("click", function () {
    limpiarFormularioMedico();
  });

window.eliminarMedico = function (id) {
  if (confirm("¿Seguro que desea eliminar este médico?")) {
    let medicos = obtenerMedicos();
    medicos = medicos.filter((m) => m.id !== id);
    guardarMedicos(medicos);
    renderizarTablaMedicos();
    limpiarFormularioMedico();
    mostrarMensajeMedico("Médico eliminado.", "success");
  }
};

window.verMedico = function (id) {
  const medicos = obtenerMedicos();
  const especialidades = obtenerEspecialidades();
  const obrasSociales = obtenerObrasSociales();
  const medico = medicos.find((m) => m.id === id);
  if (medico) {
    const especialidad = especialidades.find(
      (e) => e.id === medico.especialidadId
    );
    const obrasSocialesStr = obrasSociales
      .filter((os) => medico.obrasSociales.includes(os.id))
      .map((os) => os.nombre)
      .join(", ");
    document.getElementById("verMedicoFoto").src = medico.fotoBase64 || "";
    document.getElementById(
      "verMedicoFoto"
    ).alt = `${medico.nombre} ${medico.apellido}`;
    document.getElementById(
      "verMedicoNombre"
    ).textContent = `${medico.apellido}, ${medico.nombre}`;
    document.getElementById("verMedicoEspecialidad").textContent = especialidad
      ? especialidad.nombre
      : "";
    document.getElementById("verMedicoMatricula").textContent =
      medico.matricula;
    document.getElementById("verMedicoDescripcion").textContent =
      medico.descripcion;
    document.getElementById("verMedicoValorConsulta").textContent =
      medico.valorConsulta.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
    document.getElementById("verMedicoObrasSociales").textContent =
      obrasSocialesStr;

    const theme = document.documentElement.getAttribute("data-bs-theme");
    const modalContent = document.getElementById("verMedicoModalContent");
    modalContent.classList.remove(
      "bg-light",
      "bg-dark",
      "text-light",
      "text-dark"
    );
    if (theme === "dark") {
      modalContent.classList.add("bg-dark", "text-light");
    } else {
      modalContent.classList.add("bg-light", "text-dark");
    }

    const modal = new bootstrap.Modal(
      document.getElementById("verMedicoModal")
    );
    modal.show();
  }
};

function mostrarMensajeMedico(mensaje, tipo = "info") {
  const div = document.getElementById("medicoMensaje");
  div.textContent = mensaje;
  div.className = `alert alert-${tipo}`;
  div.classList.remove("d-none");
  setTimeout(() => div.classList.add("d-none"), 2500);
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarOpcionesEspecialidad();
  renderizarOpcionesObrasSociales();
  renderizarTablaMedicos();
  limpiarFormularioMedico();
  aplicarTemaCards();
});
