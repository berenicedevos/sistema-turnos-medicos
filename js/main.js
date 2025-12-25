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
const turnosAgendados = [];

MenuPrincipal = parseInt(prompt("Menú principal:\n\n" +
      "1. Agendar nuevo turno\n" +
      "2. Ver turnos agendados\n" +
      "3. Salir"))

while(MenuPrincipal !==3){
    switch(MenuPrincipal){
        case 1: 
        let especialidadElegida2= elegirEspecialidad()
        console.log(especialidadElegida2)
        
        horaElegida = elegirHorario()
        console.log(horaElegida)

        let {nombrePaciente, apellidoPaciente, dniPaciente,} = pedirDatosPacientes();

        console.log(nombrePaciente, apellidoPaciente, dniPaciente)

        confirmarTruno(especialidadElegida2, nombrePaciente, apellidoPaciente, dniPaciente, horaElegida)
        
        alert("Volviendo al menú principal...")
        break
            
        case 2: 
        mostrarTurnos()
        // let ListaDeTurnos = ""
        // for const turnito of turnosAgendados{
        //     ListaDeTurnos += turnito.especialidad
        // }
        // alert(ListaDeTurnos)
        break

        default:
            alert("Opcion incorrecta")
    }

MenuPrincipal = parseInt(prompt("Menú principal:\n\n" +
      "1. Agendar nuevo turno\n" +
      "2. Ver turnos agendados\n" +
      "3. Salir"))

}      
//----------------------------------------FUNCIONES--------------------------------------------
// FUNCIÓN 1: Elegir especialidad
function elegirEspecialidad() {
    let texto = ""

for (const e of especialidad) {
  texto += e.id + ". " + e.nombre + "\n"
}
  
  let opcion = parseInt(prompt("Elija una especialidad:\n" + texto))
  let flag = 0
  let especialidadElegida = ""

  while (flag === 0) {
    switch (opcion) {
      case 1:
        especialidadElegida = especialidad[0].nombre;
        flag = 1
        break

      case 2:
        especialidadElegida = especialidad[1].nombre;
        flag = 1
        break

      case 3:
        especialidadElegida = especialidad[2].nombre;
        flag = 1
        break
        
      case 4:
        especialidadElegida = especialidad[3].nombre;
        flag = 1
        break
        
      case 5:
        especialidadElegida = especialidad[4].nombre;
        flag = 1
        break
        
      case 6:
        especialidadElegida = especialidad[5].nombre;
        flag = 1
        break
        
      case 7:
        especialidadElegida = especialidad[6].nombre;
        flag = 1
        break
        
      case 8:
        especialidadElegida = especialidad[7].nombre;
        flag = 1
        break
        
      case 9:
        especialidadElegida = especialidad[8].nombre
        flag = 1
        break
        
      case 10:
        especialidadElegida = especialidad[9].nombre
        flag = 1
        break
        
      case 11:
        especialidadElegida = especialidad[10].nombre
        flag = 1
        break
        
      case 12:
        especialidadElegida = especialidad[11].nombre
        flag = 1;
        break;
        
      default:
        alert("La especialidad seleccionada no existe")
        opcion = parseInt(prompt("Elija una especialidad:\n" + texto))
        break
    }
  }

  return especialidadElegida;
}


function elegirHorario() {
  let texto = "Horarios disponibles:\n";

  for (let i = 0; i < horarios.length; i++) {
    texto += (i + 1) + ". " + horarios[i] + "\n"
  }

  let opcion = parseInt(prompt("Elija un horario:\n" + texto));
  let flag = 0;
  let horarioElegido = ""

  while (flag === 0) {
    switch (opcion) {
      case 1:
        horarioElegido = horarios[0];
        flag = 1
        break
      case 2:
        horarioElegido = horarios[1];
        flag = 1
        break
      case 3:
        horarioElegido = horarios[2];
        flag = 1
        break
      case 4:
        horarioElegido = horarios[3];
        flag = 1
        break
      case 5:
        horarioElegido = horarios[4];
        flag = 1
        break
      case 6:
        horarioElegido = horarios[5];
        flag = 1
        break
      case 7:
        horarioElegido = horarios[6];
        flag = 1
        break
      default:
        alert("Horario inválido");
        opcion = parseInt(prompt("Elija un horario:\n" + texto))
        break
    }
  }

  return horarioElegido;
}

// FUNCIÓN 3: Cargar datos del paciente
function pedirDatosPacientes(){
    let nombrePaciente = prompt("Ingrese nombre del paciente:") 
    while (nombrePaciente === "" ||nombrePaciente === null || isNaN(nombrePaciente)===false){
       nombrePaciente = prompt("Ingrese un nombre válido para el paciente:") 
    }
    nombrePaciente = nombrePaciente.toUpperCase()

    let apellidoPaciente = prompt("Ingrese apellido del paciente:")
    while (apellidoPaciente === "" ||apellidoPaciente === null || !isNaN(apellidoPaciente)){
       apellidoPaciente = prompt("Ingrese un apellido válido para el paciente:") 
    }
    apellidoPaciente = apellidoPaciente.toUpperCase()

    let dniPaciente = prompt("Ingrese DNI del paciente:")
    while (dniPaciente === "" || dniPaciente===null || isNaN(dniPaciente)===true || dniPaciente<10000 || dniPaciente>1000000000){
    dniPaciente = prompt("Ingrese un DNI válido para el paciente:") 
    }
    dniPaciente = parseInt(dniPaciente)


    return {nombrePaciente,apellidoPaciente,dniPaciente}
}

// FUNCIÓN 4: Confirmar turno
function confirmarTruno(espe, nompac,apepac,dnipac, hora){

    let confirmacion = confirm("Confirmación del turno: \n\n Especialidad: "+ espe+ "\n Paciente: " + apepac+", "+ nompac+" - DNI: "+ dnipac +"\n Horario: "+ hora+ "\n\n ¿Desea confirmar el turno?")

    if (confirmacion==true){
        alert("Turno confirmado. ¡Gracias!")
        console.log("Turno confirmado: \n"+ espe+"\n"+ apepac+", "+ nompac+" - DNI: "+ dnipac+"\n"+hora )

        turnosAgendados.push({
                    especialidad: espe,
                    nombre: nompac,
                    apellido: apepac,
                    dni: dnipac,
                    horario: hora
        })

    }
    else{
            alert("Turno cancelado")
    console.log("Turno cancelado")
    }

}

// FUNCIÓN 5: Mostrar turnos agendados
function mostrarTurnos() {
  if (turnosAgendados.length === 0) {
    alert("No hay turnos agendados")
    console.log("No hay turnos agendados")
  } else {
    let ListaTurnos = "Turnos agendados: \n\n"
    turnosAgendados.sort((a,b) => a.horario.localeCompare(b.horario))
    console.log("TURNOS AGENDADOS:")
    for (const turno of turnosAgendados) {
      console.log(
        turno.horario +" - " +
        turno.especialidad +" - " +
        turno.apellido +", " +
        turno.nombre +" (DNI " +turno.dni +")"
      )
      ListaTurnos += 
        turno.horario +" - " +
        turno.especialidad +" - " +
        turno.apellido +", " +
        turno.nombre +" (DNI " +turno.dni +") \n"
    }
    alert(ListaTurnos)
  }
}
