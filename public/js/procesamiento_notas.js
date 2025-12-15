const notas = [8, 4, 10, 6, 3, 9, 5, 7, 2];
var notasClasificacion = []; 
var cont_aprob = 0, cont_supl = 0, cont_rep = 0; //contadores aprobado, supletorio y reprobado
var promedio_general;
var estado_curso;

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


// console.log(notas);
// console.log(notasClasificacion);
// console.log(cont_aprob)
// console.log(cont_supl)
// console.log(cont_rep)
// console.log(promedio_general);
// console.log(estado_curso)