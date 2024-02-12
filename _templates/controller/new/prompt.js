/**
 * @typedef  {Object} Prompt
 * @property {string} type - The type of prompt.
 * @property {string} name - The name of the prompt.
 * @property {string} message - The message to display.
 */

/** 
 * @type {Prompt[]}
 */
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "Nombre del modulo (ex. NuevoModulo)"
  },
  {
    type: 'input',
    name: 'pluralName',
    message: "Nombre del modulo en plural (ex. NuevosModulos)"
  },
  {
    type: 'input',
    name: 'path',
    message: "Nombre de la ruta (ex. nuevos-modulos)"
  }
]