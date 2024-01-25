import './style.css';

type Especialidad = 'Medico de familia' | 'Pediatra' | 'Cardiólogo';

interface Pacientes {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  temperatura: number;
  frecuenciaCardiaca: number;
  especialidad: Especialidad;
  edad: number;
}

const pacientes: Pacientes[] = [
  {
    id: 1,
    nombre: 'John',
    apellidos: 'Doe',
    sexo: 'Male',
    temperatura: 36.8,
    frecuenciaCardiaca: 80,
    especialidad: 'Medico de familia',
    edad: 44,
  },
  {
    id: 2,
    nombre: 'Jane',
    apellidos: 'Doe',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 70,
    especialidad: 'Medico de familia',
    edad: 43,
  },
  {
    id: 3,
    nombre: 'Junior',
    apellidos: 'Doe',
    sexo: 'Male',
    temperatura: 36.8,
    frecuenciaCardiaca: 90,
    especialidad: 'Pediatra',
    edad: 8,
  },
  {
    id: 4,
    nombre: 'Mary',
    apellidos: 'Wien',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 120,
    especialidad: 'Medico de familia',
    edad: 20,
  },
  {
    id: 5,
    nombre: 'Scarlett',
    apellidos: 'Somez',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 110,
    especialidad: 'Cardiólogo',
    edad: 30,
  },
  {
    id: 6,
    nombre: 'Brian',
    apellidos: 'Kid',
    sexo: 'Male',
    temperatura: 39.8,
    frecuenciaCardiaca: 80,
    especialidad: 'Pediatra',
    edad: 11,
  },
];

// Apartado 1
// a) Queremos extraer la lista de paciente que están asignados a la especialidad de Pediatría

const obtenPacientesAsignadosAPediatria: Pacientes[] = pacientes.filter(
  (paciente: Pacientes) => paciente.especialidad === 'Pediatra'
);
console.log(obtenPacientesAsignadosAPediatria);

// b) Queremos extraer la lista de pacientes asignados a Pediatría y que tengan una edad menor de 10 años.
const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios: Pacientes[] =
  obtenPacientesAsignadosAPediatria.filter(
    (paciente: Pacientes) => paciente.edad < 10
  );
console.log(obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios);

// Apartado 2
// Queremos activar el protocolo de urgencia si cualquier de los pacientes tiene un ritmo cardíaco superior a 100 pulsaciones por minuto y una temperatura corporal superior a 39 grados.

const activarProtocoloUrgencia = pacientes.some(
  (paciente: Pacientes) =>
    paciente.temperatura > 39 && paciente.frecuenciaCardiaca > 100
);

activarProtocoloUrgencia
  ? console.log('Protocolo de urgencia activado')
  : console.log('Protocolo desactivado');

// Apartado 3
// El pediatra no puede atender hoy a los pacientes, queremos reasignar los pacientes asignados a la especialidad de pediatría a la de medico de familia.

// Para hacerlo de forma inmutable y crear un nuevo array, se podría hacer con un map

const reasignaPacientesAMedicoFamilia = (pacientes: Pacientes[]): void => {
  pacientes.forEach((paciente: Pacientes) => {
    if (paciente.especialidad === 'Pediatra') {
      paciente.especialidad = 'Medico de familia';
    }
  });
};

reasignaPacientesAMedicoFamilia(pacientes);
console.log(pacientes);

//Apartado 4
// Queremos saber si podemos mandar al Pediatra a casa (si no tiene pacientes asignados), comprobar si en la lista hay algún paciente asignado a pediatría

const hayPacientesDePediatria = (pacientes: Pacientes[]): boolean =>
  pacientes.some((paciente: Pacientes) => paciente.especialidad === 'Pediatra');

console.log(hayPacientesDePediatria(pacientes));

//Apartado 5
// Queremos calcular el número total de pacientes que están asignados a la especialidad de Medico de familia, y lo que están asignados a Pediatría y a cardiología

interface NumeroPacientesPorEspecialidad {
  medicoDeFamilia: number;
  pediatria: number;
  cardiologia: number;
}

const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  return pacientes.reduce<NumeroPacientesPorEspecialidad>(
    (contador, paciente) => {
      switch (paciente.especialidad) {
        case 'Medico de familia':
          contador.medicoDeFamilia++;
          break;
        case 'Pediatra':
          contador.pediatria++;
          break;
        case 'Cardiólogo':
          contador.cardiologia++;
          break;
      }
      return contador;
    },
    { medicoDeFamilia: 0, pediatria: 0, cardiologia: 0 }
  );
};

console.log(cuentaPacientesPorEspecialidad(pacientes));
