import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

const HTML_ENTITIES = { '&': '&', '<': '<', '>': '>', '"': '"', "'": "'" };
function escapeHTML(str) { return String(str).replace(/[&<>"']/g, char => HTML_ENTITIES[char]); }

const desc = '"onmouseover="xss';
const escaped = escapeHTML(desc);
console.log('escaped desc:', escaped);
console.log('includes onmouseover=":', escaped.includes('onmouseover="'));
console.log('includes onmouseover=:', escaped.includes('onmouseover='));
console.log('includes ":', escaped.includes('"'));