// Interfaz que representa una carta del juego
export interface Carta {
  idFoto: number; // ID para identificar el tipo de carta
  imagen: string; // URL de la imagen asociada a la carta
  estaVuelta: boolean; // Indica si la carta está volteada o no
  encontrada: boolean; // Indica si la carta ha sido encontrada
}

// Interfaz que representa la información de una carta antes de ser creada
export interface InfoCarta {
  idFoto: number; // ID de la carta
  imagen: string; // URL de la imagen de la carta
}

// Información de las cartas disponibles en el juego
export const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png',
  },
  {
    idFoto: 2,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png',
  },
  {
    idFoto: 3,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png',
  },
  {
    idFoto: 4,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png',
  },
  {
    idFoto: 5,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png',
  },
  {
    idFoto: 6,
    imagen:
      'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png',
  },
];

// Función para crear una nueva carta inicializada con valores predeterminados
export const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

// Función para crear la colección inicial de cartas a partir de la información de las cartas
export const crearColeccionDeCartasInicial = (
  infoCartas: InfoCarta[]
): Carta[] => {
  // Se duplican las cartas para crear pares de cartas
  const cartasDuplicadas: InfoCarta[] = [...infoCartas, ...infoCartas];

  // Se crea un array de Cartas a partir de las InfoCartas
  const coleccionDeCartas: Carta[] = cartasDuplicadas.map((infoCarta) => {
    return crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
  });

  return coleccionDeCartas;
};

// Colección de cartas inicializada con la información de las cartas
export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
  Definición del tipo de estado de la partida.
  Cuando se inicia la partida, todas las cartas están boca abajo y no volteadas.
  El estado de la partida cambia durante el juego según las acciones del usuario.
*/
export type EstadoPartida =
  | 'PartidaNoIniciada'
  | 'CeroCartasLevantadas'
  | 'UnaCartaLevantada'
  | 'DosCartasLevantadas'
  | 'PartidaCompleta';

// Interfaz que representa el estado del tablero de juego
export interface Tablero {
  cartas: Carta[]; // Array de cartas en el tablero
  estadoPartida: EstadoPartida; // Estado actual de la partida
  indiceCartaVolteadaA?: number; // Índice de la primera carta levantada
  indiceCartaVolteadaB?: number; // Índice de la segunda carta levantada
  intentos: number; // Número de intentos realizados en la partida
}

// Función para crear el tablero inicial del juego
export const crearTableroInicial = (): Tablero => ({
  cartas: cartas, // Se asigna la colección de cartas al tablero
  estadoPartida: 'PartidaNoIniciada', // El estado de la partida inicia como "PartidaNoIniciada"
  intentos: 0, // Se inicializa el contador de intentos a 0
});

// Se inicializa el tablero del juego
export let tablero: Tablero = crearTableroInicial();
