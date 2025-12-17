const notas = [8, 4, 10, 6, 3, 9, 5, 7, 2];
const estudiantes = [
  "Juan Carlos Perez Mendez",
  "Maria Fernanda Lopez Andrade",
  "Luis Alberto Garcia Paredes",
  "Ana Valeria Torres Cardenas",
  "Jose Miguel Ramirez Herrera",
  "Diana Carolina Vega Sanchez",
  "Pedro Andres Castillo Romero",
  "Sofia Gabriela Morales Cruz",
  "Gabriel Anthony Molina Gallegos"
];
var notasClasificacion = []; 
var cont_aprob = 0, cont_supl = 0, cont_rep = 0; //contadores aprobado, supletorio y reprobado
var promedio_general = 0;
var estado_curso = "";

cargarTablaPrincipal();

function clasificarNota(nota){
    if(nota >= 7){
        cont_aprob++;
        return 'Aprobado';
    }else if(nota <= 4){
        cont_rep++;
        return 'Reprobado'
    }else{
        cont_supl++;
        return 'Supletorio'
    }
}

function determinarEstadoCurso(promedio){
    if(promedio >= 7){
        return 'Aprobado';
    }else{
        return 'En Riesgo';
    }
}

function procesarNotas(notas){
    let suma_notas = 0;
    notas.forEach(nota => {
        suma_notas += nota;
        notasClasificacion.push(clasificarNota(nota));
    });

    promedio_general = suma_notas / notas.length;

    estado_curso = determinarEstadoCurso(promedio_general);
    
}

function limpiarTbody(tbodyId){
    let tbody = document.getElementById(tbodyId);
    tbody.innerHTML = "";
}

function agregarFilaTabla(tbodyId, alumno, nota){
    var tbody = document.getElementById(tbodyId);
    var fila = document.createElement('tr');
    var colAlumno = document.createElement('td');
    var colNota = document.createElement('td');

    colAlumno.textContent = alumno;
    colNota.textContent = nota;

    fila.appendChild(colAlumno);
    fila.appendChild(colNota);
    tbody.appendChild(fila);

}

function cargarTablaPrincipal() {
    limpiarTbody("tbody_principal");

    let cantidad = estudiantes.length;

    for (let i = 0; i < cantidad; i++) {
        agregarFilaTabla("tbody_principal", estudiantes[i], notas[i]);
    }
}

function cargarTablas(){
    limpiarTbody("tbody_aprobados");
    limpiarTbody("tbody_supletorio");
    limpiarTbody("tbody_reprobados");

    let cantidadEstudiantes = estudiantes.length;

    for (let i = 0; i < cantidadEstudiantes; i++){
        if(notasClasificacion[i] === "Aprobado"){
            agregarFilaTabla("tbody_aprobados", estudiantes[i], notas[i]);
        }else if(notasClasificacion[i] === "Supletorio") {
            agregarFilaTabla("tbody_supletorio", estudiantes[i], notas[i]);
        }else{
            agregarFilaTabla("tbody_reprobados", estudiantes[i], notas[i]);
        }
    }    
}

function resultadosCurso(){
    var alumnos_aprobados = document.getElementById('alumnos_aprobados');
    var alumnos_supletorio = document.getElementById('alumnos_supletorio');
    var alumnos_reprobados = document.getElementById('alumnos_reprobados');
    var p_resultados = document.getElementById('p_resultados');
    
    
    var p_promedio_general = "Promedio general: " + promedio_general.toFixed(2);
    var p_estado_curso = "Estado del curso: " + estado_curso;
    
    p_resultados.innerHTML = `${p_promedio_general} <br> ${p_estado_curso}`;
    alumnos_aprobados.innerHTML = `Alumnos Aprobados (7~10): ${cont_aprob}`;
    alumnos_supletorio.innerHTML = `Alumnos en Supletorio (5~6): ${cont_supl}`;
    alumnos_reprobados.innerHTML = `Alumnos Reprobados (0~4): ${cont_rep}`;
}

var btn_procesar = document.getElementById('btn_procesar');

btn_procesar.addEventListener('click', function(event){
    notasClasificacion = [];
    cont_aprob = 0;
    cont_supl = 0;
    cont_rep = 0;
    promedio_general = 0;
    estado_curso = "";

    procesarNotas(notas);
    cargarTablas();
    resultadosCurso();
});