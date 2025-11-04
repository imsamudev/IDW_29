export const ADMIN_USER = {
  username: "admin",
  password: "admin123",
};

// ACLARACIÓN, las fotos de los médicos están representadas como urls de imágenes SOLO EN CASO DE inicialización, en admin.js está para base64 como se solicitó.
export const MEDICOS_INICIALES = [
  {
    id: 1,
    matricula: 10001,
    apellido: "House",
    nombre: "Gregory",
    especialidadId: 1,
    descripcion:
      "Especialista en diagnóstico clínico, famoso por su ingenio y métodos poco convencionales.",
    obrasSociales: [1, 2],
    fotoBase64:
      "https://i.pinimg.com/736x/af/ee/bb/afeebbb0a5a139b1e5b83a4ba7feed60.jpg",
    valorConsulta: 3500.0,
  },
  {
    id: 2,
    matricula: 10002,
    apellido: "Lee",
    nombre: "Sandra",
    especialidadId: 4,
    descripcion:
      "Dermatóloga reconocida internacionalmente, experta en cirugía estética.",
    obrasSociales: [2, 3],
    fotoBase64:
      "https://forefrontdermatology.com/wp-content/uploads/2021/12/Sandra-Lee-800x800-WEB-350x350.jpg",
    valorConsulta: 2800.0,
  },
  {
    id: 3,
    matricula: 10003,
    apellido: "Brown",
    nombre: "Emmet",
    especialidadId: 3,
    descripcion: "Cardiólogo y pionero en psiquiatría del viaje en el tiempo.",
    obrasSociales: [1, 3],
    fotoBase64:
      "https://i.pinimg.com/1200x/eb/57/c9/eb57c9edf2fe61dc2a02c621a2ca443a.jpg",
    valorConsulta: 4000.0,
  },
  {
    id: 4,
    matricula: 10004,
    apellido: "Faure",
    nombre: "Emma",
    especialidadId: 2,
    descripcion:
      "Pediatra con más de 15 años de experiencia en atención infantil y adolescente.",
    obrasSociales: [1, 2, 3, 4],
    fotoBase64:
      "https://tse3.mm.bing.net/th/id/OIP.q4VFkm8mD0H1BPQHk-Gs0AHaHf?rs=1&pid=ImgDetMain&o=7&rm=3",
    valorConsulta: 3200.0,
  },
  {
    id: 5,
    matricula: 10005,
    apellido: "Ramírez",
    nombre: "Carlos",
    especialidadId: 5,
    descripcion:
      "Neurólogo especializado en trastornos del sueño y enfermedades neurodegenerativas.",
    obrasSociales: [2, 3, 4],
    fotoBase64:
      "https://thumbs.dreamstime.com/b/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man-stethoscope-specialist-his-269615308.jpg",
    valorConsulta: 4500.0,
  },
  {
    id: 6,
    matricula: 10006,
    apellido: "González",
    nombre: "María Laura",
    especialidadId: 6,
    descripcion:
      "Ginecóloga obstetra con amplia experiencia en embarazos de alto riesgo.",
    obrasSociales: [1, 3, 5],
    fotoBase64:
      "https://tse3.mm.bing.net/th/id/OIP.jwKQa8dgSJAYhFiK_2TtmQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    valorConsulta: 3800.0,
  },
  {
    id: 7,
    matricula: 10007,
    apellido: "Fernández",
    nombre: "Roberto",
    especialidadId: 7,
    descripcion:
      "Traumatólogo especializado en cirugía de rodilla y lesiones deportivas.",
    obrasSociales: [1, 2, 4],
    fotoBase64:
      "https://ptvla.org/wp-content/uploads/2017/12/Dr-Quiroga-headshot-e1532730088506.jpg",
    valorConsulta: 4200.0,
  },
  {
    id: 8,
    matricula: 10008,
    apellido: "Martínez",
    nombre: "Ana",
    especialidadId: 8,
    descripcion:
      "Oftalmóloga experta en cirugía refractiva y tratamiento de cataratas.",
    obrasSociales: [2, 3, 5],
    fotoBase64:
      "https://tse3.mm.bing.net/th/id/OIP.N_eSzzTh7_WWxJUTlHVTYQHaEh?rs=1&pid=ImgDetMain&o=7&rm=3",
    valorConsulta: 3600.0,
  },
];

export const ESPECIALIDADES_INICIALES = [
  { id: 1, nombre: "Clínica Médica" },
  { id: 2, nombre: "Pediatría" },
  { id: 3, nombre: "Cardiología" },
  { id: 4, nombre: "Dermatología" },
  { id: 5, nombre: "Neurología" },
  { id: 6, nombre: "Ginecología" },
  { id: 7, nombre: "Traumatología" },
  { id: 8, nombre: "Oftalmología" },
  { id: 9, nombre: "Otorrinolaringología" },
  { id: 10, nombre: "Endocrinología" },
  { id: 11, nombre: "Urología" },
  { id: 12, nombre: "Oncología" },
  { id: 13, nombre: "Reumatología" },
  { id: 14, nombre: "Gastroenterología" },
  { id: 15, nombre: "Nefrología" },
  { id: 16, nombre: "Psiquiatría" },
  { id: 17, nombre: "Neumonología" },
  { id: 18, nombre: "Cirugía General" },
  { id: 19, nombre: "Alergología" },
  { id: 20, nombre: "Infectología" },
];

export const OBRAS_SOCIALES_INICIALES = [
  {
    id: 1,
    nombre: "OSDE",
    descripcion: "Obra social de ejecutivos.",
    porcentaje: 50,
  },
  {
    id: 2,
    nombre: "Swiss Medical",
    descripcion: "Cobertura médica integral.",
    porcentaje: 25,
  },
  {
    id: 3,
    nombre: "Galeno",
    descripcion: "Obra social para familias.",
    porcentaje: 20,
  },
  {
    id: 4,
    nombre: "OSECAC",
    descripcion: "Obra Social de Empleados de Comercio.",
    porcentaje: 15,
  },
  {
    id: 5,
    nombre: "IOMA",
    descripcion: "Instituto de Obra Médico Asistencial.",
    porcentaje: 30,
  },
];

function generarTurnosDinamicos() {
  const turnos = [];
  let turnoId = 1;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const horasPosibles = [8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21];

  MEDICOS_INICIALES.forEach((medico) => {
    for (let i = 0; i < 5; i++) {
      const diasAdelante = Math.floor(Math.random() * 30) + 1;
      const fechaTurno = new Date(hoy);
      fechaTurno.setDate(fechaTurno.getDate() + diasAdelante);

      const hora =
        horasPosibles[Math.floor(Math.random() * horasPosibles.length)];
      fechaTurno.setHours(hora, 0, 0, 0);

      const disponible = Math.random() > 0.15;

      turnos.push({
        id: turnoId++,
        medicoId: medico.id,
        fechaHora: fechaTurno.toISOString().slice(0, 16),
        disponible: disponible,
      });
    }
  });

  return turnos.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
}

export const TURNOS_INICIALES = generarTurnosDinamicos();

export const RESERVAS_INICIALES = [
  {
    id: 1,
    documento: "30123456",
    nombrePaciente: "Juan Fuckencio",
    turnoId: 5,
    especialidadId: 1,
    obraSocialId: 1,
    valorTotal: 2100.0,
  },
  {
    id: 2,
    documento: "28987654",
    nombrePaciente: "María Flatulencia",
    turnoId: 8,
    especialidadId: 4,
    obraSocialId: 2,
    valorTotal: 2100.0,
  },
  {
    id: 3,
    documento: "35456789",
    nombrePaciente: "Carlos Novello",
    turnoId: 11,
    especialidadId: 3,
    obraSocialId: 3,
    valorTotal: 3200.0,
  },
];

export function inicializarAdmin() {
  if (!localStorage.getItem("adminUser")) {
    localStorage.setItem("adminUser", JSON.stringify(ADMIN_USER));
  }
}

export function inicializarEspecialidades() {
  if (!localStorage.getItem("especialidades")) {
    localStorage.setItem(
      "especialidades",
      JSON.stringify(ESPECIALIDADES_INICIALES)
    );
  }
}

export function inicializarMedicos() {
  const medicos = JSON.parse(localStorage.getItem("medicos"));
  if (!medicos || medicos.length === 0) {
    localStorage.setItem("medicos", JSON.stringify(MEDICOS_INICIALES));
  }
}
export function inicializarObrasSociales() {
  if (!localStorage.getItem("obrasSociales")) {
    localStorage.setItem(
      "obrasSociales",
      JSON.stringify(OBRAS_SOCIALES_INICIALES)
    );
  }
}
export function inicializarTurnos() {
  const turnosGuardados = localStorage.getItem("turnos");

  if (!turnosGuardados) {
    localStorage.setItem("turnos", JSON.stringify(generarTurnosDinamicos()));
    console.log(
      "Turnos iniciales generados, para agregar uno nuevo inicia sesión como admin!"
    );
    return;
  }

  const turnos = JSON.parse(turnosGuardados);
  const ahora = new Date();

  const turnosValidos = turnos.filter((t) => new Date(t.fechaHora) > ahora);

  if (turnosValidos.length < 15) {
    console.log(
      "Regenerando turnos (posiblemente pocos turnos disponibles)..."
    );
    localStorage.setItem("turnos", JSON.stringify(generarTurnosDinamicos()));
  } else if (turnosValidos.length < turnos.length) {
    console.log(
      `${turnos.length - turnosValidos.length} turnos obsoletos eliminados`
    );
    localStorage.setItem("turnos", JSON.stringify(turnosValidos));
  }
}

export function inicializarReservas() {
  if (!localStorage.getItem("reservas")) {
    localStorage.setItem("reservas", JSON.stringify(RESERVAS_INICIALES));
  }
}
