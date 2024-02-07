import { Carta, Tablero } from './model';

// Función para barajar las cartas en el tablero
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  // Usamos el algoritmo de Fisher-Yates para barajar las cartas
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

// Función para verificar si se puede voltear una carta en el tablero
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const carta = tablero.cartas[indice];
  return (
    !carta.estaVuelta &&
    !carta.encontrada &&
    (tablero.estadoPartida === 'CeroCartasLevantadas' ||
      tablero.estadoPartida === 'UnaCartaLevantada')
  );
};

// Función para voltear una carta en el tablero
export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    tablero.cartas[indice].estaVuelta = true;
    if (tablero.estadoPartida === 'CeroCartasLevantadas') {
      tablero.estadoPartida = 'UnaCartaLevantada';
      tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.estadoPartida === 'UnaCartaLevantada') {
      tablero.estadoPartida = 'DosCartasLevantadas';
      tablero.indiceCartaVolteadaB = indice;
      tablero.intentos++;
    }
  }
};

// Función para verificar si dos cartas forman una pareja
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  return cartaA.idFoto === cartaB.idFoto;
};

// Función para marcar una pareja de cartas como encontrada
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = 'CeroCartasLevantadas';
};

// Función para restaurar el estado de dos cartas si no forman pareja
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = 'CeroCartasLevantadas';
};

// Función para verificar si todas las parejas han sido encontradas
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

// Función para iniciar una nueva partida
export const iniciaPartida = (tablero: Tablero): void => {
  // Baraja las cartas
  tablero.cartas = barajarCartas(tablero.cartas);

  // Restablece el estado de cada carta
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });

  // Restablece el resto del estado del tablero
  tablero.estadoPartida = 'CeroCartasLevantadas';
  tablero.intentos = 0;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};
