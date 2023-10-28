import pokedexFixture from '../../__tests__/pokedex.fixture.js';
import mostrarPokemon from '../pokemon.js';
import bulbasaur from '../../../cypress/fixtures/bulbasaur.json';
import { mapearPokemon } from '../../mapeadores/pokemon.js';

const pokemonMappeado = mapearPokemon(bulbasaur);
document.body.innerHTML = pokedexFixture;
mostrarPokemon(pokemonMappeado);

it('Deberia de mostrar el ID y nombre del pokemon correctamente', () => {
  const $nombrePokemon = document.querySelector('#pokemon-nombre').textContent;
  const $idPokemon = document.querySelector('#pokemon-id').textContent;

  expect($nombrePokemon).toBe('bulbasaur');
  expect($idPokemon).toBe('1');
});

it('Deberia de cargar la imagen correctamente', () => {
  const imagenBulbasaur = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
  const $imagenPokemon = document.querySelector('#pokemon-imagen').src;

  expect($imagenPokemon).toBe(imagenBulbasaur);
});

it('Deberia de cargar los tipos y clases correctamente', () => {
  const $tipoPrincipal = document.querySelectorAll('#tipos span')[0];
  const $tipoSecundario = document.querySelectorAll('#tipos span')[1];

  expect($tipoPrincipal.textContent).toBe('poison');
  expect($tipoSecundario.textContent).toBe('grass');
  expect($tipoPrincipal.className).toBe('badge poison type');
  expect($tipoSecundario.className).toBe('badge grass type');
});

it('Deberia de cargar las habilidades del pokemon correctamente', () => {
  const $habilidadPrincipal = document.querySelectorAll('#habilidades span')[0];
  const $habilidadSecundaria = document.querySelectorAll('#habilidades span')[1];

  expect($habilidadPrincipal.textContent).toBe('chlorophyll');
  expect($habilidadSecundaria.textContent).toBe('overgrow');
});
