// scripts/apply-years.js — Aplica anos ao data.js
// Uso: node scripts/apply-years.js

import fs from 'node:fs';
import path from 'node:path';
import { YEAR_MAP } from './add-years.js';

const DATA_PATH = path.resolve('usa/js/data.js');

function main() {
  const content = fs.readFileSync(DATA_PATH, 'utf8');

  // Regex para encontrar cada item de mídia e adicionar year se não tiver
  let updatedContent = content;
  let added = 0;
  let skipped = 0;

  for (const [title, year] of Object.entries(YEAR_MAP)) {
    // Busca o item pelo título e verifica se já tem year
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(\\{[^}]*title:\\s*['\"]${escapedTitle}['\"][^}]*)(\\}|,\\s*imdbLink)`
    );

    const match = updatedContent.match(regex);
    if (match) {
      const beforeBrace = match[1];
      // Verifica se já tem year
      if (!beforeBrace.includes('year:')) {
        // Adiciona year antes do fechamento ou antes de imdbLink
        const insertion = `year: ${year}, `;
        updatedContent = updatedContent.replace(
          match[0],
          match[0].replace(match[2], insertion + match[2])
        );
        added++;
        console.log(`✓ ${title} -> ${year}`);
      } else {
        skipped++;
        console.log(`- ${title} (já tem year)`);
      }
    } else {
      console.log(`✗ ${title} NÃO ENCONTRADO`);
    }
  }

  fs.writeFileSync(DATA_PATH, updatedContent);
  console.log(`\nAdicionados: ${added}, Pulados: ${skipped}`);
}

main();