function obtenerMedicos() {
  return JSON.parse(localStorage.getItem("medicos")) || [];
}
function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem("especialidades")) || [];
}
function obtenerObrasSociales() {
  return JSON.parse(localStorage.getItem("obrasSociales")) || [];
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

const especialidadSelect = document.getElementById("especialidadReserva");
const medicoSelect = document.getElementById("medicoReserva");
const obraSocialSelect = document.getElementById("obraSocialReserva");
const turnoSelect = document.getElementById("turnoReserva");
const valorReservaInput = document.getElementById("valorReserva");
const formReserva = document.getElementById("formReserva");
const documentoPacienteInput = document.getElementById("documentoPaciente");
const nombrePacienteInput = document.getElementById("nombrePaciente");
const mensajeDiv = document.getElementById("reservaMensaje");
const resumenDiv = document.getElementById("reservaResumen");

function cargarEspecialidades() {
  const especialidades = obtenerEspecialidades();
  const medicos = obtenerMedicos();
  especialidadSelect.innerHTML =
    `<option value="">Seleccionar...</option>` +
    especialidades
      .map((e) => {
        const tieneMedicos = medicos.some((m) => m.especialidadId == e.id);
        return `<option value="${e.id}"${
          tieneMedicos
            ? ' class="fw-semibold text-success"'
            : ' class="text-muted"'
        }>${e.nombre}</option>`;
      })
      .join("");
}

function cargarMedicos(especialidadId = "") {
  const medicos = obtenerMedicos();
  let filtrados = medicos;
  if (especialidadId) {
    filtrados = medicos.filter((m) => m.especialidadId == especialidadId);
  }
  medicoSelect.innerHTML =
    `<option value="">Seleccionar...</option>` +
    filtrados
      .map((m) => `<option value="${m.id}">${m.apellido}, ${m.nombre}</option>`)
      .join("");

  const msg = document.getElementById("medicoNoDisponibleMsg");
  if (msg) {
    if (filtrados.length === 0 && especialidadId) {
      msg.classList.remove("d-none");

      obraSocialSelect.disabled = true;
      turnoSelect.disabled = true;
      valorReservaInput.disabled = true;
      formReserva.querySelector('button[type="submit"]').disabled = true;
    } else {
      msg.classList.add("d-none");
      obraSocialSelect.disabled = false;
      turnoSelect.disabled = false;
      valorReservaInput.disabled = false;
      formReserva.querySelector('button[type="submit"]').disabled = false;
    }
  }
}

function cargarObrasSociales(medicoId = "") {
  const obrasSociales = obtenerObrasSociales();
  let opciones = obrasSociales;
  if (medicoId) {
    const medico = obtenerMedicos().find((m) => m.id == medicoId);
    if (medico) {
      opciones = obrasSociales.filter((os) =>
        medico.obrasSociales.includes(os.id)
      );
    }
  }
  obraSocialSelect.innerHTML =
    `<option value="">Seleccionar...</option>` +
    opciones
      .map((os) => `<option value="${os.id}">${os.nombre}</option>`)
      .join("");
}

function cargarTurnos(medicoId = "") {
  const turnos = obtenerTurnos();
  let disponibles = turnos.filter((t) => t.disponible);
  if (medicoId) {
    disponibles = disponibles.filter((t) => t.medicoId == medicoId);
  }
  turnoSelect.innerHTML =
    `<option value="">Seleccionar...</option>` +
    disponibles
      .map((t) => {
        const fechaHora = new Date(t.fechaHora);
        const fechaStr = fechaHora.toLocaleDateString();
        const horaStr = fechaHora.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `<option value="${t.id}">${fechaStr} - ${horaStr}</option>`;
      })
      .join("");

  const msg = document.getElementById("turnoNoDisponibleMsg");
  if (msg) {
    if (disponibles.length === 0 && medicoId) {
      msg.classList.remove("d-none");
    } else {
      msg.classList.add("d-none");
    }
  }
}

especialidadSelect.addEventListener("change", () => {
  cargarMedicos(especialidadSelect.value);
  medicoSelect.value = "";
  cargarObrasSociales("");
  obraSocialSelect.value = "";
  cargarTurnos("");
  turnoSelect.value = "";
  valorReservaInput.value = "";
});

medicoSelect.addEventListener("change", () => {
  cargarObrasSociales(medicoSelect.value);
  obraSocialSelect.value = "";
  cargarTurnos(medicoSelect.value);
  turnoSelect.value = "";
  actualizarValorConsulta();
});

obraSocialSelect.addEventListener("change", () => {
  actualizarValorConsulta();
});

turnoSelect.addEventListener("change", () => {
  actualizarValorConsulta();
});

function actualizarValorConsulta() {
  const medicoId = medicoSelect.value;
  if (!medicoId) {
    valorReservaInput.value = "";
    return;
  }
  const medico = obtenerMedicos().find((m) => m.id == medicoId);
  if (!medico) {
    valorReservaInput.value = "";
    return;
  }
  valorReservaInput.value = medico.valorConsulta.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

formReserva.addEventListener("submit", function (e) {
  e.preventDefault();
  const especialidadId = parseInt(especialidadSelect.value);
  const medicoId = parseInt(medicoSelect.value);
  const obraSocialId = parseInt(obraSocialSelect.value);
  const turnoId = parseInt(turnoSelect.value);
  const documento = documentoPacienteInput.value.trim();
  const nombrePaciente = nombrePacienteInput.value.trim();

  if (
    !especialidadId ||
    !medicoId ||
    !obraSocialId ||
    !turnoId ||
    !documento ||
    !nombrePaciente
  ) {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }

  const medico = obtenerMedicos().find((m) => m.id === medicoId);
  if (!medico) {
    mostrarMensaje("Médico no encontrado.", "danger");
    return;
  }
  const valorTotal = medico.valorConsulta;

  let reservas = obtenerReservas();
  const nuevoId = reservas.length
    ? Math.max(...reservas.map((r) => r.id)) + 1
    : 1;
  reservas.push({
    id: nuevoId,
    documento,
    nombrePaciente,
    turnoId,
    especialidadId,
    obraSocialId,
    valorTotal,
  });
  guardarReservas(reservas);

  let turnos = obtenerTurnos();
  const idxTurno = turnos.findIndex((t) => t.id === turnoId);
  if (idxTurno !== -1) {
    turnos[idxTurno].disponible = false;
    guardarTurnos(turnos);
  }

  mostrarResumenReserva({
    documento,
    nombrePaciente,
    medico,
    especialidad: obtenerEspecialidades().find((e) => e.id === especialidadId),
    obraSocial: obtenerObrasSociales().find((os) => os.id === obraSocialId),
    turno: turnos[idxTurno],
    valorTotal,
  });

  formReserva.reset();
  cargarMedicos("");
  cargarObrasSociales("");
  cargarTurnos("");
  valorReservaInput.value = "";
});

function mostrarMensaje(msg, tipo = "info") {
  mensajeDiv.textContent = msg;
  mensajeDiv.className = `alert alert-${tipo}`;
  mensajeDiv.classList.remove("d-none");
  setTimeout(() => mensajeDiv.classList.add("d-none"), 2500);
}

function mostrarResumenReserva({
  documento,
  nombrePaciente,
  medico,
  especialidad,
  obraSocial,
  turno,
  valorTotal,
}) {
  const fechaHora = turno ? new Date(turno.fechaHora) : null;
  const fechaStr = fechaHora ? fechaHora.toLocaleDateString() : "-";
  const horaStr = fechaHora
    ? fechaHora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "-";
  resumenDiv.innerHTML = `
    <h5>¡Reserva confirmada!</h5>
    <ul class="mb-0">
      <li><strong>Paciente:</strong> ${nombrePaciente} (${documento})</li>
      <li><strong>Médico:</strong> ${
        medico ? medico.apellido + ", " + medico.nombre : "-"
      }</li>
      <li><strong>Especialidad:</strong> ${
        especialidad ? especialidad.nombre : "-"
      }</li>
      <li><strong>Obra Social:</strong> ${
        obraSocial ? obraSocial.nombre : "-"
      }</li>
      <li><strong>Fecha:</strong> ${fechaStr}</li>
      <li><strong>Hora:</strong> ${horaStr}</li>
      <li><strong>Valor Total:</strong> ${valorTotal.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })}</li>
    </ul>
  `;
  resumenDiv.classList.remove("d-none");
  setTimeout(() => resumenDiv.classList.add("d-none"), 15000);
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEspecialidades();
  cargarMedicos();
  cargarObrasSociales();
  cargarTurnos();
  valorReservaInput.value = "";
  resumenDiv.classList.add("d-none");
});
