let baseDatos = [];
const URL = "./db/data.json";

// REFERENCIAS DOM
const selectEspecialidad = document.getElementById("especialidad");
const selectMedico = document.getElementById("medico");
const selectFecha = document.getElementById("fecha");
const selectHorario = document.getElementById("horario");
const formTurno = document.getElementById("formTurno");

const inputDni = document.getElementById("dni");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputFechaNacimiento = document.getElementById("fechaNacimiento");
const inputEmail = document.getElementById("email");
const inputTelefono = document.getElementById("telefono");


// CONSTRUCTOR DE TURNOS
class Turno {

    constructor(nombre, apellido, dni, email, telefono, fechaNacimiento, especialidadId, especialidad, medicoId, medico, fecha, hora){
        this.id = Date.now();
        this.nombre = nombre.trim().toUpperCase();
        this.apellido = apellido.trim().toUpperCase();
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidadId = especialidadId;
        this.especialidad = especialidad;
        this.medicoId = medicoId
        this.medico = medico;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = "Pendiente";
    }
}

let turnosAgendados = JSON.parse(localStorage.getItem("turnos")) || [];

function limpiarTurnosViejos() {

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    turnosAgendados = turnosAgendados.filter(turno => {

        const [anio, mes, dia] = turno.fecha.split("-");
        const fechaTurno = new Date(anio, mes-1, dia);

        return fechaTurno >= hoy;
    });

    localStorage.setItem("turnos", JSON.stringify(turnosAgendados));
}
limpiarTurnosViejos();

function leerJson() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            baseDatos = data;
            renderizarEspecialidades(data)
            cargarMedicosEnFiltro();
            filtrarYMostrar();
            
        })
        .catch(err => console.log("Hubo un error", err))
        .finally(() => console.log("Finalizo la peticion"))
}
leerJson()


function renderizarEspecialidades(listaEspecialidades) {

    selectEspecialidad.innerHTML = `<option value="">Seleccione especialidad</option>`;

    listaEspecialidades.forEach(especialidad => {
        selectEspecialidad.innerHTML += `
            <option value="${especialidad.id}">
                ${especialidad.nombre}
            </option>`;
    });
}

selectEspecialidad.addEventListener("change", cargarMedicos);

function cargarMedicos() {

    selectFecha.innerHTML = '<option value="">Seleccione un día</option>';
    selectHorario.innerHTML = '<option value="">Seleccione un horario</option>';

    const idSeleccionado = parseInt(selectEspecialidad.value);

    const especialidadElegida = baseDatos.find(especialidad => especialidad.id === idSeleccionado);
    console.log(especialidadElegida)
    renderizarMedicos(especialidadElegida.medicos);
}

function renderizarMedicos(listaMedicos) {

    selectMedico.innerHTML = `<option value="">Seleccione médico</option>`;

    listaMedicos.forEach(medico => {
        selectMedico.innerHTML += `
            <option value="${medico.id}">
                ${medico.nombre}
            </option>
        `;
    });
}

selectMedico.addEventListener("change", CargaFechas);

function CargaFechas() {

        if (selectMedico.value === "") return;
    const idMedicoSeleccionado = parseInt(selectMedico.value);
    
    const idEspSeleccionada = parseInt(selectEspecialidad.value);
    const especialidadElegida = baseDatos.find(esp => esp.id === idEspSeleccionada);
    
    const medicoElegido = especialidadElegida.medicos.find(m => m.id === idMedicoSeleccionado);

    selectFecha.innerHTML = '<option value="">Seleccione un día</option>';
    selectHorario.innerHTML = '<option value="">Seleccione un horario</option>';

    let hoy = new Date();

for (let i = 0; i < 30; i++) {
let fecha = new Date(hoy);
fecha.setDate(fecha.getDate() + i);

    let diaSemana = fecha.getDay();

    for (let j = 0; j < medicoElegido.dias.length; j++) {

        if (medicoElegido.dias[j].dia == diaSemana) {

            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();

            let fechaTexto = dia + "/" + mes + "/" + anio;

let fechaISO = fecha.toISOString().split("T")[0];

selectFecha.innerHTML += `
    <option value="${fechaISO}">
        ${fechaTexto}
    </option>
`;
        }
    }
}

}

selectFecha.addEventListener("change", cargarHorarios);

function cargarHorarios() {

    const idEsp = parseInt(selectEspecialidad.value);
    const idMed = parseInt(selectMedico.value);

    const partes = selectFecha.value.split("-");
    const fechaSeleccionada = new Date(partes[0], partes[1]-1, partes[2]);

    const diaSemana = fechaSeleccionada.getDay();

    const especialidad = baseDatos.find(e => e.id === idEsp);
    const medico = especialidad.medicos.find(m => m.id === idMed);

    const diaAtencion = medico.dias.find(d => d.dia === diaSemana);

    if (!diaAtencion) return;

    generarHoras(diaAtencion);
}

function horaAMinutos(horaTexto){
    let partes = horaTexto.split(":");
    let horas = parseInt(partes[0]);
    let minutos = parseInt(partes[1]);

    return horas*60 + minutos;
}

function generarHoras(diaAtencion){
    const especialidadActual = selectEspecialidad.value
    const medicoActual = selectMedico.value;
    const fechaActual = selectFecha.value;

    selectHorario.innerHTML = '<option value="">Seleccione horario</option>';

    let desde = horaAMinutos(diaAtencion.desde);
    let hasta = horaAMinutos(diaAtencion.hasta);
    let intervalo = diaAtencion.intervalo;
    
    // fecha seleccionada convertida a Date
const partes = selectFecha.value.split("-");
const fechaSeleccionada = new Date(partes[0], partes[1]-1, partes[2]);

    const hoy = new Date();

    const esHoy =
        fechaSeleccionada.getDate() === hoy.getDate() &&
        fechaSeleccionada.getMonth() === hoy.getMonth() &&
        fechaSeleccionada.getFullYear() === hoy.getFullYear();

    const horaActual = hoy.getHours() * 60 + hoy.getMinutes();

    for(let minutos = desde; minutos < hasta; minutos += intervalo){

        let hora = Math.floor(minutos / 60);
        let min = minutos % 60;

        let horaTexto = String(hora).padStart(2,"0") + ":" + String(min).padStart(2,"0");

        const ocupado = turnosAgendados.some(turno =>
        turno.especialidadId == especialidadActual &&
        turno.medicoId == medicoActual &&
        turno.fecha == fechaActual &&
        turno.hora == horaTexto &&
        turno.estado !== "Cancelado"
);
if ( esHoy && !ocupado && minutos>horaActual){
    selectHorario.innerHTML += `
        <option value="${horaTexto}">
            ${horaTexto}
        </option>
    `;
} else if (!esHoy && !ocupado) {
    selectHorario.innerHTML += `
        <option value="${horaTexto}">
            ${horaTexto}
        </option>
    `;
}

    }
}

formTurno.addEventListener("submit", agendarTurno)

function agendarTurno(e) {

    e.preventDefault();

    // valores paciente
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const dni = inputDni.value;
    const email = inputEmail.value
    const telefono = inputTelefono.value
    const fechaNacimiento = inputFechaNacimiento.value

    // valores de los selects
    const especialidad = selectEspecialidad.options[selectEspecialidad.selectedIndex].text;
    const especialidadId = selectEspecialidad.value
    const medico = selectMedico.options[selectMedico.selectedIndex].text;
    const medicoId = selectMedico.value
    const fecha = selectFecha.value;
    const hora = selectHorario.value;

    const turnoRepetido = turnosAgendados.some(turno => 
    turno.especialidadId == especialidadId &&
    turno.medicoId == medicoId &&
    turno.fecha == fecha &&
    turno.hora == hora &&
    turno.estado !="Cancelado"
);

if (turnoRepetido) {
    Swal.fire({
        icon: "error",
        title: "Horario no disponible",
        text: "Ya existe un turno asignado en esa fecha y hora"
    });
    return;
}

Swal.fire({
  title: "¿Confirmar turno?",
  text: "Revisá que los datos sean correctos",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#0b9128",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, agendar",
  cancelButtonText: "Cancelar"
}).then((result) => {

  if (result.isConfirmed) {

           const turnoNuevo = new Turno(
                nombre,
                apellido,
                dni,
                email,
                telefono,
                fechaNacimiento,
                especialidadId,
                especialidad,
                medicoId,
                medico,
                fecha,
                hora
            );

            turnosAgendados.push(turnoNuevo);

            console.log(turnosAgendados)

            localStorage.setItem("turnos", JSON.stringify(turnosAgendados));

            formTurno.reset();

            renderizarTurnos(turnosAgendados);
            filtrarYMostrar();

            
    Swal.fire({
      title: "Turno Confirmado",
      text: "Tu turno fue agendado con éxito",
      icon: "success"
    } 
   
);
  }
});

}

