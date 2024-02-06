// Importaciones desde model.ts y motor.ts
import { Tablero } from './model';
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
} from './motor';

// Asumimos que estos elementos existen en tu HTML
const grid = document.getElementById('board') as HTMLElement;

// Esta función actualiza la UI del tablero basado en el estado actual del juego.
export const actualizarUI = (tablero: Tablero) => {
  grid.innerHTML = ''; // Limpia el tablero para empezar de nuevo
  tablero.cartas.forEach((carta, indice) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    if (carta.estaVuelta) {
      cardElement.classList.add('flipped');
    }
    if (carta.encontrada) {
      cardElement.classList.add('found');
    }
    cardElement.addEventListener('click', () =>
      manejarClickCarta(indice, tablero)
    );
    grid.appendChild(cardElement);
  });
};

// Maneja el clic en una carta específica.
const manejarClickCarta = (indice: number, tablero: Tablero) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    actualizarUI(tablero);
    console.log('test');
    // Lógica para manejar dos cartas volteadas y verificar si son pareja.
    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      setTimeout(() => {
        const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tablero;
        if (
          indiceCartaVolteadaA !== undefined &&
          indiceCartaVolteadaB !== undefined
        ) {
          if (sonPareja(indiceCartaVolteadaA, indiceCartaVolteadaB, tablero)) {
            parejaEncontrada(
              tablero,
              indiceCartaVolteadaA,
              indiceCartaVolteadaB
            );
          } else {
            parejaNoEncontrada(
              tablero,
              indiceCartaVolteadaA,
              indiceCartaVolteadaB
            );
          }
        }
        actualizarUI(tablero);
      }, 1000);
    }
  }
};

// No olvides exportar cualquier función que necesites utilizar en otros archivos, como `actualizarUI` si fuera necesario.
