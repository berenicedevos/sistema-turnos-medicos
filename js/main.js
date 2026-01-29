// ARRAY DE ESPECIALIDADES
const especialidad = [
  { id: 1, nombre: "Cardiología" },
  { id: 2, nombre: "Neurología" },
  { id: 3, nombre: "Endocrinología" },
  { id: 4, nombre: "Traumatología" },
  { id: 5, nombre: "Reumatología" },
  { id: 6, nombre: "Dermatología" },
  { id: 7, nombre: "Rehabilitación" },
  { id: 8, nombre: "Obstetricia" },
  { id: 9, nombre: "Clínica" },
  { id: 10, nombre: "Fisiatría / Kinesio" },
  { id: 11, nombre: "Fonoaudiología" },
  { id: 12, nombre: "Psicología" }
];

// ARRAY DE HORARIOS
const horarios = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "15:00",
  "16:00",
  "17:00"
];

// ARRAY PARA GUARDAR TURNO AGENDADOS
const turnosAgendados = JSON.parse(localStorage.getItem("turnos")) || [];
document.addEventListener("DOMContentLoaded", mostrarTurnos);

//Borra turnos agendados
//const turnosAgendados = [];   
//localStorage.removeItem("turnos");
//turnosAgendados.length = 0;  
//listaTurnos.innerHTML = ""; 


// CONEXION CON DOM
const selectEspecialidad = document.getElementById("especialidad");
const selectHorario = document.getElementById("horario");
const formTurno = document.getElementById("formTurno");
const mensaje = document.getElementById("mensaje");
const listaTurnos = document.getElementById("listaTurnos");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");

// CARGA LOS VALORES DE LA LISTA DESPLEGABLE
especialidad.forEach(e => {
  const option = document.createElement("option");
  option.value = e.nombre;
  option.textContent = e.nombre;
  selectEspecialidad.appendChild(option);
});

horarios.forEach(h => {
  const option = document.createElement("option");
  option.value = h;
  option.textContent = h;
  selectHorario.appendChild(option);
});

//FORMULARIO TURNO (EVENTO SUBMIT)
formTurno.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const especialidadSeleccionada = selectEspecialidad.value;
  const horarioSeleccionado = selectHorario.value;
  const nombre = inputNombre.value.trim().toUpperCase();
  const apellido = inputApellido.value.trim().toUpperCase();
  const dni = parseInt(inputDni.value.trim());

  //Valido datos del paciente
  const esValido = validarDatosPacientes(nombre, apellido, dni)
  if (!esValido) return;

  //Verifico si el turno esta ocupado
  if (turnoOcupado(especialidadSeleccionada, horarioSeleccionado)) {
    mostrarError("El horario ya se encuentra ocupado para la especialidad seleccionada");
    return;
  }

  //Agendo el turno
  const turno = {
  especialidad: especialidadSeleccionada,
  horario: horarioSeleccionado,
  nombre: nombre,
  apellido: apellido,
  dni: dni
  };

  turnosAgendados.push(turno);
  localStorage.setItem("turnos", JSON.stringify(turnosAgendados));

  mostrarExito("El turno se ha agendado correctamente")
  formTurno.reset();

  //Actualizo la lista de turnos agendados
  mostrarTurnos();
});



//----------------------------------------FUNCIONES--------------------------------------------

// FUNCIÓN 1: Validar datos del paciente
function validarDatosPacientes(nombrePaciente, apellidoPaciente, dniPaciente){

    if (nombrePaciente === "" ||nombrePaciente === null || isNaN(nombrePaciente)===false){
       mostrarError("El nombre ingresado es inválido")
        return false
    }  

    if (apellidoPaciente === "" ||apellidoPaciente === null || !isNaN(apellidoPaciente)){
       mostrarError("El apellido ingresado es inválido")
      return false
    }

    if (dniPaciente === "" || dniPaciente===null || isNaN(dniPaciente)===true || dniPaciente<10000 || dniPaciente>1000000000){
      mostrarError("El DNI ingresado es inválido")
      return false
    } 
  return true
}

// FUNCIÓN 2: Verficar si el turno esta ocupado
function turnoOcupado(especialidad, horario) {
  return turnosAgendados.some(turno =>
    turno.especialidad === especialidad &&
    turno.horario === horario
  );
}

// FUNCIÓN 3: Mostrar mensaje de error al agendar turno
function mostrarError(texto) {
  mensaje.textContent = texto;
  mensaje.className = "alert alert-danger";
  mensaje.classList.remove("d-none");
}

// FUNCIÓN 4: Mostrar mensaje de exito al agendar turno
function mostrarExito(texto) {
  mensaje.textContent = texto;
  mensaje.className = "alert alert-success";
  mensaje.classList.remove("d-none");
}

// FUNCIÓN 5: Mostrar turnos
function mostrarTurnos() {
  listaTurnos.innerHTML = "";

  const turnosAgrupados = agruparTurnosPorEspecialidad(turnosAgendados);

  for (const especialidad in turnosAgrupados) {
    // Título de la especialidad
    const titulo = document.createElement("li");
    titulo.className = "list-group-item active";
    titulo.textContent = especialidad;
    listaTurnos.appendChild(titulo);

  turnosAgrupados[especialidad].sort((a, b) => a.horario.localeCompare(b.horario));

    // Turnos de esa especialidad
    turnosAgrupados[especialidad].forEach(turno => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent =
        `${turno.horario} - ${turno.apellido}, ${turno.nombre} (DNI ${turno.dni})`;
      listaTurnos.appendChild(li);
    });
  }
}


// FUNCIÓN 5: Agrupar turnos por especialidad
function agruparTurnosPorEspecialidad(turnos) {
  const grupos = {};

  turnos.forEach(turno => {
    if (!grupos[turno.especialidad]) {
      grupos[turno.especialidad] = [];
    }

    grupos[turno.especialidad].push(turno);
  });

  return grupos;
}


