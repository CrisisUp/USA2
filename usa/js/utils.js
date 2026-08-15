// utils.js - Funções utilitárias

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa caracteres HTML para segurança (previne XSS básico).
 * Escapa &, <, >, " e ' — incluindo aspas, para uso seguro em atributos.
 * @param {string} str - A string a ser escapada.
 * @returns {string} A string com caracteres HTML escapados.
 */
export function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, char => HTML_ENTITIES[char]);
}