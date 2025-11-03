import {
  inicializarMedicos,
  inicializarEspecialidades,
  inicializarObrasSociales,
  inicializarTurnos,
  inicializarReservas,
} from "./datos-iniciales.js";

inicializarMedicos();
inicializarEspecialidades();
inicializarObrasSociales();
inicializarTurnos();
inicializarReservas();

function obtenerMedicos() {
  return JSON.parse(localStorage.getItem("medicos")) || [];
}
function guardarMedicos(medicos) {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}
function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem("especialidades")) || [];
}
function guardarEspecialidades(especialidades) {
  localStorage.setItem("especialidades", JSON.stringify(especialidades));
}
function obtenerObrasSociales() {
  return JSON.parse(localStorage.getItem("obrasSociales")) || [];
}
function guardarObrasSociales(obrasSociales) {
  localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));
}
function obtenerTurnos() {
  return JSON.parse(localStorage.getItem("turnos")) || [];
}
function guardarTurnos(turnos) {
  localStorage.setItem("turnos", JSON.stringify(turnos));
}
function obtenerReservas() {
  return JSON.parse(localStorage.getItem("reservas")) || [];
}
function guardarReservas(reservas) {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// CRUD MÉDICOS

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
  const turnos = obtenerTurnos();
  if (turnos.some((t) => t.medicoId === id)) {
    mostrarMensajeMedico(
      "No se puede eliminar: hay turnos asignados a este médico.",
      "danger"
    );
    return;
  }
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

// CRUD ESPECIALIDADES

function renderizarTablaEspecialidades() {
  const tbody = document.querySelector("#tablaEspecialidades tbody");
  const tabla = document.getElementById("tablaEspecialidades");
  const especialidades = obtenerEspecialidades();

  const theme = document.documentElement.getAttribute("data-bs-theme");
  tabla.classList.remove("table-dark", "table-light");
  if (theme === "dark") {
    tabla.classList.add("table-dark");
  } else {
    tabla.classList.add("table-light");
  }

  tbody.innerHTML = "";

  especialidades.forEach((esp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${esp.nombre}</td>
      <td class="text-end">
        <div class="d-flex flex-row gap-1 justify-content-center">
          <button class="btn btn-sm btn-warning" onclick="editarEspecialidad(${esp.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarEspecialidad(${esp.id})">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function limpiarFormularioEspecialidad() {
  document.getElementById("especialidadId").value = "";
  document.getElementById("nombreEspecialidad").value = "";
  document.getElementById("guardarEspecialidadBtn").textContent =
    "Guardar Especialidad";
  document.getElementById("cancelarEdicionEspecialidadBtn").style.display =
    "none";
}

function aplicarTemaCardsEspecialidad() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  const cardForm = document.getElementById("cardFormEspecialidad");
  const cardTabla = document.getElementById("cardTablaEspecialidades");
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

document
  .getElementById("formEspecialidad")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("especialidadId").value;
    const nombre = document.getElementById("nombreEspecialidad").value.trim();

    if (!nombre) {
      mostrarMensajeEspecialidad("El nombre es obligatorio.", "danger");
      return;
    }

    let especialidades = obtenerEspecialidades();

    if (id) {
      const idx = especialidades.findIndex((e) => e.id == id);
      if (idx !== -1) {
        especialidades[idx].nombre = nombre;
        mostrarMensajeEspecialidad(
          "Especialidad actualizada correctamente.",
          "success"
        );
      }
    } else {
      const nuevoId = especialidades.length
        ? Math.max(...especialidades.map((e) => e.id)) + 1
        : 1;
      especialidades.push({ id: nuevoId, nombre });
      mostrarMensajeEspecialidad(
        "Especialidad agregada correctamente.",
        "success"
      );
    }

    guardarEspecialidades(especialidades);
    renderizarTablaEspecialidades();
    limpiarFormularioEspecialidad();
    renderizarOpcionesEspecialidad();
  });

window.editarEspecialidad = function (id) {
  const especialidades = obtenerEspecialidades();
  const esp = especialidades.find((e) => e.id === id);
  if (esp) {
    document.getElementById("especialidadId").value = esp.id;
    document.getElementById("nombreEspecialidad").value = esp.nombre;
    document.getElementById("guardarEspecialidadBtn").textContent =
      "Actualizar Especialidad";
    document.getElementById("cancelarEdicionEspecialidadBtn").style.display =
      "inline-block";
  }
};

document
  .getElementById("cancelarEdicionEspecialidadBtn")
  .addEventListener("click", function () {
    limpiarFormularioEspecialidad();
  });

window.eliminarEspecialidad = function (id) {
  const medicos = obtenerMedicos();
  if (medicos.some((m) => m.especialidadId === id)) {
    mostrarMensajeEspecialidad(
      "No se puede eliminar: hay médicos con esta especialidad.",
      "danger"
    );
    return;
  }
  if (confirm("¿Seguro que desea eliminar esta especialidad?")) {
    let especialidades = obtenerEspecialidades();
    especialidades = especialidades.filter((e) => e.id !== id);
    guardarEspecialidades(especialidades);
    renderizarTablaEspecialidades();
    limpiarFormularioEspecialidad();
    mostrarMensajeEspecialidad("Especialidad eliminada.", "success");
    renderizarOpcionesEspecialidad();
  }
};

function mostrarMensajeEspecialidad(mensaje, tipo = "info") {
  const div = document.getElementById("especialidadMensaje");
  div.textContent = mensaje;
  div.className = `alert alert-${tipo}`;
  div.classList.remove("d-none");
  setTimeout(() => div.classList.add("d-none"), 2000);
}

// CRUD OBRAS SOCIALES

function renderizarTablaObrasSociales() {
  const tbody = document.querySelector("#tablaObrasSociales tbody");
  const tabla = document.getElementById("tablaObrasSociales");
  const obrasSociales = obtenerObrasSociales();

  const theme = document.documentElement.getAttribute("data-bs-theme");
  tabla.classList.remove("table-dark", "table-light");
  if (theme === "dark") {
    tabla.classList.add("table-dark");
  } else {
    tabla.classList.add("table-light");
  }

  tbody.innerHTML = "";

  obrasSociales.forEach((os) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${os.nombre}</td>
      <td>${os.descripcion}</td>
      <td><span class="badge bg-success">${os.porcentaje}%</span></td>
      <td class="text-end">
        <div class="d-flex flex-row gap-1 justify-content-center">
          <button class="btn btn-sm btn-warning" onclick="editarObraSocial(${os.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarObraSocial(${os.id})">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function limpiarFormularioObraSocial() {
  document.getElementById("obraSocialId").value = "";
  document.getElementById("nombreObraSocial").value = "";
  document.getElementById("porcentajeObraSocial").value = "";
  document.getElementById("descripcionObraSocial").value = "";
  document.getElementById("guardarObraSocialBtn").textContent =
    "Guardar Obra Social";
  document.getElementById("cancelarEdicionObraSocialBtn").style.display =
    "none";
}

function aplicarTemaCardsObraSocial() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  const cardForm = document.getElementById("cardFormObraSocial");
  const cardTabla = document.getElementById("cardTablaObrasSociales");
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

document
  .getElementById("formObraSocial")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("obraSocialId").value;
    const nombre = document.getElementById("nombreObraSocial").value.trim();
    const porcentaje = parseFloat(
      document.getElementById("porcentajeObraSocial").value
    );
    const descripcion = document
      .getElementById("descripcionObraSocial")
      .value.trim();

    if (!nombre || !descripcion || isNaN(porcentaje)) {
      mostrarMensajeObraSocial("Todos los campos son obligatorios.", "danger");
      return;
    }

    if (porcentaje < 0 || porcentaje > 100) {
      mostrarMensajeObraSocial(
        "El porcentaje debe estar entre 0 y 100.",
        "danger"
      );
      return;
    }

    let obrasSociales = obtenerObrasSociales();

    if (id) {
      const idx = obrasSociales.findIndex((os) => os.id == id);
      if (idx !== -1) {
        obrasSociales[idx].nombre = nombre;
        obrasSociales[idx].porcentaje = porcentaje;
        obrasSociales[idx].descripcion = descripcion;
        mostrarMensajeObraSocial(
          "Obra social actualizada correctamente.",
          "success"
        );
      }
    } else {
      const nuevoId = obrasSociales.length
        ? Math.max(...obrasSociales.map((os) => os.id)) + 1
        : 1;
      obrasSociales.push({ id: nuevoId, nombre, porcentaje, descripcion });
      mostrarMensajeObraSocial(
        "Obra social agregada correctamente.",
        "success"
      );
    }

    guardarObrasSociales(obrasSociales);
    renderizarTablaObrasSociales();
    limpiarFormularioObraSocial();
    renderizarOpcionesObrasSociales();
  });

window.editarObraSocial = function (id) {
  const obrasSociales = obtenerObrasSociales();
  const os = obrasSociales.find((o) => o.id === id);
  if (os) {
    document.getElementById("obraSocialId").value = os.id;
    document.getElementById("nombreObraSocial").value = os.nombre;
    document.getElementById("porcentajeObraSocial").value = os.porcentaje;
    document.getElementById("descripcionObraSocial").value = os.descripcion;
    document.getElementById("guardarObraSocialBtn").textContent =
      "Actualizar Obra Social";
    document.getElementById("cancelarEdicionObraSocialBtn").style.display =
      "inline-block";
  }
};

document
  .getElementById("cancelarEdicionObraSocialBtn")
  .addEventListener("click", function () {
    limpiarFormularioObraSocial();
  });

window.eliminarObraSocial = function (id) {
  const medicos = obtenerMedicos();
  if (medicos.some((m) => m.obrasSociales.includes(id))) {
    mostrarMensajeObraSocial(
      "No se puede eliminar: hay médicos que aceptan esta obra social.",
      "danger"
    );
    return;
  }
  if (confirm("¿Seguro que desea eliminar esta obra social?")) {
    let obrasSociales = obtenerObrasSociales();
    obrasSociales = obrasSociales.filter((os) => os.id !== id);
    guardarObrasSociales(obrasSociales);
    renderizarTablaObrasSociales();
    limpiarFormularioObraSocial();
    mostrarMensajeObraSocial("Obra social eliminada.", "success");
    renderizarOpcionesObrasSociales();
  }
};

function mostrarMensajeObraSocial(mensaje, tipo = "info") {
  const div = document.getElementById("obraSocialMensaje");
  div.textContent = mensaje;
  div.className = `alert alert-${tipo}`;
  div.classList.remove("d-none");
  setTimeout(() => div.classList.add("d-none"), 2000);
}

// CRUD TURNOS

function renderizarTablaTurnos() {
  const tbody = document.querySelector("#tablaTurnos tbody");
  const tabla = document.getElementById("tablaTurnos");
  if (!tbody || !tabla) return;
  const turnos = obtenerTurnos();
  const medicos = obtenerMedicos();

  const theme = document.documentElement.getAttribute("data-bs-theme");
  tabla.classList.remove("table-dark", "table-light");
  if (theme === "dark") {
    tabla.classList.add("table-dark");
  } else {
    tabla.classList.add("table-light");
  }

  tbody.innerHTML = "";

  turnos.forEach((turno) => {
    const medico = medicos.find((m) => m.id === turno.medicoId);
    const fechaHora = new Date(turno.fechaHora);
    const fechaStr = fechaHora.toLocaleDateString();
    const horaStr = fechaHora.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const disponibleStr = turno.disponible ? "Sí" : "No";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${medico ? medico.apellido + ", " + medico.nombre : "-"}</td>
      <td>${fechaStr}</td>
      <td>${horaStr}</td>
      <td>${disponibleStr}</td>
      <td class="text-end">
        <div class="d-flex flex-row gap-1 justify-content-center">
          <button class="btn btn-sm btn-warning" onclick="editarTurno(${
            turno.id
          })">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarTurno(${
            turno.id
          })">Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function limpiarFormularioTurno() {
  const id = document.getElementById("turnoId");
  const medico = document.getElementById("medicoTurno");
  const fechaHora = document.getElementById("fechaHoraTurno");
  const disponible = document.getElementById("disponibleTurno");
  if (id) id.value = "";
  if (medico) medico.value = "";
  if (fechaHora) fechaHora.value = "";
  if (disponible) disponible.checked = true;
  const guardarBtn = document.getElementById("guardarTurnoBtn");
  const cancelarBtn = document.getElementById("cancelarEdicionTurnoBtn");
  if (guardarBtn) guardarBtn.textContent = "Guardar Turno";
  if (cancelarBtn) cancelarBtn.style.display = "none";
}

function renderizarOpcionesMedicoTurno() {
  const select = document.getElementById("medicoTurno");
  if (!select) return;
  const medicos = obtenerMedicos();
  select.innerHTML = medicos
    .map((m) => `<option value="${m.id}">${m.apellido}, ${m.nombre}</option>`)
    .join("");
}

const formTurno = document.getElementById("formTurno");
if (formTurno) {
  formTurno.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("turnoId").value;
    const medicoId = parseInt(document.getElementById("medicoTurno").value);
    const fechaHora = document.getElementById("fechaHoraTurno").value;
    const disponible = document.getElementById("disponibleTurno").checked;

    if (!medicoId || !fechaHora) {
      mostrarMensajeTurno("Todos los campos son obligatorios.", "danger");
      return;
    }

    let turnos = obtenerTurnos();

    if (id) {
      const idx = turnos.findIndex((t) => t.id == id);
      if (idx !== -1) {
        turnos[idx].medicoId = medicoId;
        turnos[idx].fechaHora = fechaHora;
        turnos[idx].disponible = disponible;
        mostrarMensajeTurno("Turno actualizado correctamente.", "success");
      }
    } else {
      const nuevoId = turnos.length
        ? Math.max(...turnos.map((t) => t.id)) + 1
        : 1;
      turnos.push({ id: nuevoId, medicoId, fechaHora, disponible });
      mostrarMensajeTurno("Turno agregado correctamente.", "success");
    }

    guardarTurnos(turnos);
    renderizarTablaTurnos();
    limpiarFormularioTurno();
  });
}

window.editarTurno = function (id) {
  const turnos = obtenerTurnos();
  const turno = turnos.find((t) => t.id === id);
  if (turno) {
    document.getElementById("turnoId").value = turno.id;
    document.getElementById("medicoTurno").value = turno.medicoId;
    document.getElementById("fechaHoraTurno").value = turno.fechaHora;
    document.getElementById("disponibleTurno").checked = turno.disponible;
    document.getElementById("guardarTurnoBtn").textContent = "Actualizar Turno";
    document.getElementById("cancelarEdicionTurnoBtn").style.display =
      "inline-block";
  }
};

const cancelarEdicionTurnoBtn = document.getElementById(
  "cancelarEdicionTurnoBtn"
);
if (cancelarEdicionTurnoBtn) {
  cancelarEdicionTurnoBtn.addEventListener("click", function () {
    limpiarFormularioTurno();
  });
}

window.eliminarTurno = function (id) {
  const reservas = obtenerReservas();
  if (reservas.some((r) => r.turnoId === id)) {
    mostrarMensajeTurno(
      "No se puede eliminar: hay reservas asociadas a este turno.",
      "danger"
    );
    return;
  }
  if (confirm("¿Seguro que desea eliminar este turno?")) {
    let turnos = obtenerTurnos();
    turnos = turnos.filter((t) => t.id !== id);
    guardarTurnos(turnos);
    renderizarTablaTurnos();
    limpiarFormularioTurno();
    mostrarMensajeTurno("Turno eliminado.", "success");
  }
};

function mostrarMensajeTurno(mensaje, tipo = "info") {
  const div = document.getElementById("turnoMensaje");
  if (!div) return;
  div.textContent = mensaje;
  div.className = `alert alert-${tipo}`;
  div.classList.remove("d-none");
  setTimeout(() => div.classList.add("d-none"), 2000);
}

function aplicarTemaCardsTurno() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  const cardForm = document.getElementById("cardFormTurno");
  const cardTabla = document.getElementById("cardTablaTurnos");
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

// CRUD RESERVAS

function renderizarTablaReservas() {
  const tbody = document.querySelector("#tablaReservas tbody");
  const tabla = document.getElementById("tablaReservas");
  if (!tbody || !tabla) return;
  const reservas = obtenerReservas();
  const turnos = obtenerTurnos();
  const medicos = obtenerMedicos();
  const especialidades = obtenerEspecialidades();
  const obrasSociales = obtenerObrasSociales();

  const theme = document.documentElement.getAttribute("data-bs-theme");
  tabla.classList.remove("table-dark", "table-light");
  if (theme === "dark") {
    tabla.classList.add("table-dark");
  } else {
    tabla.classList.add("table-light");
  }

  tbody.innerHTML = "";

  reservas.forEach((reserva) => {
    const turno = turnos.find((t) => t.id === reserva.turnoId);
    const medico = turno ? medicos.find((m) => m.id === turno.medicoId) : null;
    const especialidad = especialidades.find(
      (e) => e.id === reserva.especialidadId
    );
    const obraSocial = obrasSociales.find(
      (os) => os.id === reserva.obraSocialId
    );
    const fechaHora = turno ? new Date(turno.fechaHora) : null;
    const fechaStr = fechaHora ? fechaHora.toLocaleDateString() : "-";
    const horaStr = fechaHora
      ? fechaHora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "-";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${reserva.documento}</td>
      <td>${reserva.nombrePaciente}</td>
      <td>${medico ? medico.apellido + ", " + medico.nombre : "-"}</td>
      <td>${especialidad ? especialidad.nombre : "-"}</td>
      <td>${obraSocial ? obraSocial.nombre : "-"}</td>
      <td>${fechaStr}</td>
      <td>${horaStr}</td>
      <td>${reserva.valorTotal.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })}</td>
    `;
    tbody.appendChild(row);
  });
}

function aplicarTemaCardsReservas() {
  const theme = document.documentElement.getAttribute("data-bs-theme");
  const cardTabla = document.getElementById("cardTablaReservas");
  if (!cardTabla) return;
  cardTabla.classList.remove(
    "bg-light",
    "bg-dark",
    "text-light",
    "text-dark",
    "border-light",
    "border-dark"
  );
  if (theme === "dark") {
    cardTabla.classList.add("bg-dark", "text-light", "border-light");
  } else {
    cardTabla.classList.add("bg-light", "text-dark", "border-dark");
  }
}

const observer = new MutationObserver(() => {
  aplicarTemaCards();
  aplicarTemaCardsEspecialidad();
  aplicarTemaCardsObraSocial();
  aplicarTemaCardsTurno();
  aplicarTemaCardsReservas();
  renderizarTablaMedicos();
  renderizarTablaEspecialidades();
  renderizarTablaObrasSociales();
  renderizarTablaTurnos();
  renderizarTablaReservas();

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

document.addEventListener("DOMContentLoaded", () => {
  renderizarOpcionesEspecialidad();
  renderizarOpcionesObrasSociales();
  renderizarOpcionesMedicoTurno();
  renderizarTablaMedicos();
  limpiarFormularioMedico();
  aplicarTemaCards();

  renderizarTablaEspecialidades();
  limpiarFormularioEspecialidad();
  aplicarTemaCardsEspecialidad();

  renderizarTablaObrasSociales();
  limpiarFormularioObraSocial();
  aplicarTemaCardsObraSocial();

  renderizarTablaTurnos();
  limpiarFormularioTurno();
  aplicarTemaCardsTurno();

  renderizarTablaReservas();
  aplicarTemaCardsReservas();
});
