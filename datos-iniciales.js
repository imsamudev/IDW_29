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
  { id: 1, nombre: "OSDE", descripcion: "Obra social de ejecutivos." },
  { id: 2, nombre: "Swiss Medical", descripcion: "Cobertura médica integral." },
  { id: 3, nombre: "Galeno", descripcion: "Obra social para familias." },
];

export const TURNOS_INICIALES = [
  {
    id: 1,
    medicoId: 1,
    fechaHora: "2025-10-25T09:00",
    disponible: true,
  },
  {
    id: 2,
    medicoId: 1,
    fechaHora: "2025-10-25T10:00",
    disponible: true,
  },
  {
    id: 3,
    medicoId: 2,
    fechaHora: "2025-10-26T11:00",
    disponible: false,
  },
];

export const RESERVAS_INICIALES = [
  {
    id: 1,
    documento: "60134813",
    nombrePaciente: "Juan Fuckencio",
    turnoId: 1,
    especialidadId: 1,
    obraSocialId: 1,
    valorTotal: 3500.0,
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
  if (!localStorage.getItem("turnos")) {
    localStorage.setItem("turnos", JSON.stringify(TURNOS_INICIALES));
  }
}
export function inicializarReservas() {
  if (!localStorage.getItem("reservas")) {
    localStorage.setItem("reservas", JSON.stringify(RESERVAS_INICIALES));
  }
}
