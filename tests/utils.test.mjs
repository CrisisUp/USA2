import { describe, it, expect } from 'vitest';
import { escapeHTML } from '../usa/js/utils.js';

describe('utils', () => {
  describe('escapeHTML', () => {
    it('escapes angle brackets', () => {
      expect(escapeHTML('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    });

    it('escapes double quotes', () => {
      expect(escapeHTML('"double quotes"')).toBe('&quot;double quotes&quot;');
    });

    it('escapes single quotes', () => {
      expect(escapeHTML("'single quotes'")).toBe('&#39;single quotes&#39;');
    });

    it('escapes ampersand', () => {
      expect(escapeHTML('A & B')).toBe('A &amp; B');
    });

    it('returns empty string unchanged', () => {
      expect(escapeHTML('')).toBe('');
    });

    it('returns plain string unchanged', () => {
      expect(escapeHTML('Hello World')).toBe('Hello World');
    });

    it('preserves unicode', () => {
      expect(escapeHTML('São Paulo')).toBe('São Paulo');
    });

    it('prevents XSS in attribute context — aspas escapadas quebram o atributo', () => {
      const malicious = '" onmouseover="alert(1)"';
      const escaped = escapeHTML(malicious);
      expect(escaped).toBe('&quot; onmouseover=&quot;alert(1)&quot;');
      // Não há aspas literais do tipo travamento de atributo
      expect(escaped).not.toContain('" onmouseover=');
      expect(escaped).not.toContain('"alert(1)"');
    });

    it('escapes nested tags', () => {
      expect(escapeHTML('<div><span>test</span></div>')).toBe(
        '&lt;div&gt;&lt;span&gt;test&lt;/span&gt;&lt;/div&gt;'
      );
    });

    it('escapes malicious script payload', () => {
      const payload = `<img src=x onerror="alert('XSS')">`;
      expect(escapeHTML(payload)).toBe(
        '&lt;img src=x onerror=&quot;alert(&#39;XSS&#39;)&quot;&gt;'
      );
    });
  });
});
