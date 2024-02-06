import { barajarCartas, sePuedeVoltearLaCarta } from './motor';
import {
  Carta,
  infoCartas,
  crearColeccionDeCartasInicial,
  Tablero,
} from './model';

describe('barajarCartas', () => {
  it('debería barajar las cartas', () => {
    const cartasOriginales: Carta[] = crearColeccionDeCartasInicial(infoCartas);
    const cartasAntesDeBarajar: Carta[] = [...cartasOriginales];
    const cartasBarajadas: Carta[] = barajarCartas(cartasOriginales);

    // Verificamos que las cartas antes de barajar y después de barajar sean diferentes
    expect(cartasBarajadas).not.toEqual(cartasAntesDeBarajar);

    // Verificamos que el número de cartas sea el mismo
    expect(cartasBarajadas.length).toEqual(cartasOriginales.length);

    // Verificamos que todas las cartas originales estén presentes después de barajar
    expect(cartasBarajadas).toEqual(expect.arrayContaining(cartasOriginales));
  });
});
// Preparar un estado inicial del tablero para las pruebas
const crearEstadoInicialTablero = (): Tablero => ({
  cartas: Array.from({ length: 2 }, (_, i) => ({
    idFoto: i + 1,
    imagen: `https://ruta/a/imagen${i + 1}.jpg`,
    estaVuelta: false,
    encontrada: false,
  })),
  estadoPartida: 'CeroCartasLevantadas',
});

describe('sePuedeVoltearLaCarta', () => {
  it('permite voltear una carta cuando no ha sido encontrada y no hay cartas levantadas', () => {
    const tablero = crearEstadoInicialTablero();
    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(true);
  });

  it('permite voltear una carta cuando no ha sido encontrada y hay una carta levantada', () => {
    const tablero = crearEstadoInicialTablero();
    tablero.estadoPartida = 'UnaCartaLevantada';
    const resultado = sePuedeVoltearLaCarta(tablero, 1);
    expect(resultado).toBe(true);
  });

  it('no permite voltear una carta cuando ya ha sido encontrada', () => {
    const tablero = crearEstadoInicialTablero();
    tablero.cartas[0].encontrada = true;
    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false);
  });

  it('no permite voltear una carta cuando ya hay dos cartas levantadas', () => {
    const tablero = crearEstadoInicialTablero();
    tablero.estadoPartida = 'DosCartasLevantadas';
    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false);
  });
});
