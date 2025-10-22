/**
 * Calcula el área de un rectángulo.
 * @param {number} ancho - El ancho del rectángulo.
 * @param {number} alto - El alto del rectángulo.
 * @returns {number} El área calculada.
 * @throws {Error} Si alguno de los valores no es un número.
 */

function calcularArea(ancho, alto) {
    if (isNaN(ancho) || isNaN(alto)) {
        throw new Error('Los valores de ancho y alto deben ser números.');
    }
  return ancho * alto;
}

/**
 * Calcula el perímetro de un rectángulo.
 * @param {number} ancho - El ancho del rectángulo.
 * @param {number} alto - El alto del rectángulo.
 * @returns {number} El perímetro calculado.
 * @throws {Error} Si alguno de los valores no es un número.
 */

function calcularPerimetro(ancho, alto) {
    if (isNaN(ancho) || isNaN(alto)) {
        throw new Error('Los valores de ancho y alto deben ser números.');
    }
  return 2 * (ancho + alto);
}

module.exports = {
    calcularArea,
    calcularPerimetro
};