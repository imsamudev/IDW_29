function obtenerMedicos() {
  return JSON.parse(localStorage.getItem("medicos")) || [];
}
function obtenerEspecialidades() {
  return JSON.parse(localStorage.getItem("especialidades")) || [];
}

function renderizarCatalogoMedicos() {
  const medicos = obtenerMedicos();
  const especialidades = obtenerEspecialidades();
  const catalogo = document.getElementById("catalogoMedicos");
  const vacioMsg = document.getElementById("catalogoVacioMsg");

  catalogo.innerHTML = "";

  if (!medicos.length) {
    vacioMsg.classList.remove("d-none");
    return;
  } else {
    vacioMsg.classList.add("d-none");
  }

  medicos.forEach((medico) => {
    const especialidad = especialidades.find(
      (e) => e.id === medico.especialidadId
    );
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2";
    card.innerHTML = `
  <div class="card h-100 shadow-sm">
    <div class="d-flex justify-content-center align-items-center" style="height:220px; overflow:hidden;">
      <img src="${medico.fotoBase64 || "assets/doctor-placeholder.png"}"
           class="card-img-top object-fit-cover w-100"
           style="max-width:180px; max-height:210px;"
           alt="Foto de ${medico.nombre} ${medico.apellido}">
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-1">${medico.apellido}, ${medico.nombre}</h5>
      <div class="card-subtitle mb-2 text-muted small">${
        especialidad ? especialidad.nombre : "Sin especialidad"
      }</div>
      <p class="card-text small mb-0">${medico.descripcion}</p>
    </div>
  </div>
`;
    catalogo.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogoMedicos();
});
