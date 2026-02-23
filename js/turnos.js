const filtroFecha = document.getElementById("filtroFecha");
const filtroMedico = document.getElementById("filtroMedico");   
const buscarDni = document.getElementById("buscarDni")

cargarMedicosEnFiltro();
function cargarMedicosEnFiltro() {

    const filtroMedico = document.getElementById("filtroMedico");

    filtroMedico.innerHTML = '<option value="todos">Todos los médicos</option>';

    baseDatos.forEach(especialidad => {
        
        especialidad.medicos.forEach(medico => {
            
            filtroMedico.innerHTML += `
                <option value="${medico.id}">
                    ${medico.nombre} (${especialidad.nombre})
                </option>`;
        });
    });
}

const listaTurnos = document.getElementById("listaTurnos");

filtroMedico.addEventListener("change", filtrarYMostrar);
filtroFecha.addEventListener("change", filtrarYMostrar);
buscarDni.addEventListener("input", filtrarYMostrar);

function filtrarYMostrar() {

    let turnosFiltrados = [...turnosAgendados];

    const idMedicoSeleccionado = filtroMedico.value;
    const fechaElegida = filtroFecha.value;
    const dniSeleccionado = buscarDni.value.trim();

    if (idMedicoSeleccionado !== "todos") {
        turnosFiltrados = turnosFiltrados.filter(t => 
            t.medicoId == idMedicoSeleccionado
        );
    }

    if (fechaElegida !== "") {

        turnosFiltrados = turnosFiltrados.filter(t => 
            t.fecha === fechaElegida
        );
    }

if (dniSeleccionado !== "") {
    turnosFiltrados = turnosFiltrados.filter(t => 
        String(t.dni).includes(dniSeleccionado)
    );
}
turnosFiltrados.sort((a, b) => {

    const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
    const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);

    return fechaHoraA - fechaHoraB;
});
    renderizarTurnos(turnosFiltrados);
}

function renderizarTurnos(lista){

    listaTurnos.innerHTML = "";

    lista.forEach(turno => {

        let colorEstado = "secondary";

        if(turno.estado === "Atendido") {
            colorEstado = "success"
            listaTurnos.innerHTML += `
        <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <b>${turno.hora} | ${turno.fecha}</b><br>
                    ${turno.nombre} ${turno.apellido} | 
                    DNI: ${turno.dni} <br>
                    ${turno.especialidad} | ${turno.medico} <br>
                    <span class="badge bg-${colorEstado} ms-2">${turno.estado}</span>
                </div>
        `;
        }

           if(turno.estado === "Cancelado") {
            colorEstado = "danger"
            listaTurnos.innerHTML += `
        <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <b>${turno.hora} | ${turno.fecha}</b><br>
                    ${turno.nombre} ${turno.apellido} | 
                    DNI: ${turno.dni} <br>
                    ${turno.especialidad} | ${turno.medico} <br>
                    <span class="badge bg-${colorEstado} ms-2">${turno.estado}</span>
                </div>
        `;

           }
        if(turno.estado === "Pendiente") {
        listaTurnos.innerHTML += `
        <li class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                    <b>${turno.hora} | ${turno.fecha}</b><br>
                    ${turno.nombre} ${turno.apellido} | 
                    DNI: ${turno.dni} <br>
                    ${turno.especialidad} | ${turno.medico} <br>
                    <span class="badge bg-${colorEstado} ms-2">${turno.estado}</span>
                </div>

                <div class="d-flex flex-row flex-nowrap gap-1">
                    <button class="btn btn-success btn-sm me-2" onclick="atenderTurno(${turno.id})">
                        Atender
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="cancelarTurno(${turno.id})">
                        Cancelar
                    </button>
                </div>

            </div>
        </li>
        `;}
    });
}

renderizarTurnos(turnosAgendados);

function atenderTurno(id) {

Swal.fire({
  title: "¿Desea atender este turno?",
  text: "El turno cambiará de estado a Atendido",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#076439",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, atender",
  cancelButtonText: "Cancelar"
}).then((result) => {
  if (result.isConfirmed) {
turnosAgendados = turnosAgendados.map(t => {
        if (t.id === id) t.estado = "Atendido";
        return t;
    });
    localStorage.setItem("turnos", JSON.stringify(turnosAgendados));
    filtrarYMostrar();

    Swal.fire({
      title: "Turno actualizado",
      text: "El estado fue modificado correctamente",
      icon: "success"
    });
  }
});    
}

function cancelarTurno(id) {

Swal.fire({
  title: "¿Desea cancelar este turno?",
  text: "El turno cambiará de estado a Cancelado",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "rgb(51, 91, 221)",
  confirmButtonText: "Sí, cancelar",
  cancelButtonText: "Salir"
}).then((result) => {
  if (result.isConfirmed) {

    turnosAgendados = turnosAgendados.map(t => {
        if (t.id === id) t.estado = "Cancelado";
        return t;
    });
    localStorage.setItem("turnos", JSON.stringify(turnosAgendados));
    filtrarYMostrar();

    Swal.fire({
      title: "Turno actualizado",
      text: "El estado fue modificado correctamente",
      icon: "success"
    });
  }
});

}