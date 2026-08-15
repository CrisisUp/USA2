import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

const HTML_ENTITIES = { '&': '&', '<': '<', '>': '>', '"': '"', "'": "'" };
function escapeHTML(str) { return String(str).replace(/[&<>"']/g, char => HTML_ENTITIES[char]); }

const title = '<script>alert(1)</script>';
const escaped = escapeHTML(title);
console.log('escaped title:', escaped);
console.log('includes <script>:', escaped.includes('<script>'));
console.log('includes <script>:', escaped.includes('<script>'));