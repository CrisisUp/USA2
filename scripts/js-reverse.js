#!/usr/bin/env node
/**
 * js-reverse.js - CLI wrapper para tarefas comuns de JS reverse
 * Uso: node scripts/js-reverse.js <comando> [opções]
 */

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '..');
const REVERSE_SKILL_ROOT = resolve(PROJECT_ROOT, '..', 'reverse-skill');

const program = new Command();

program
  .name('js-reverse')
  .description('JS Reverse Engineering CLI - wrapper para reverse-skill js-reverse')
  .version('1.0.0');

program
  .command('route <hint>')
  .description('Roteia uma tarefa para a skill PRIMARY via master-route.ps1')
  .option('-c, --case-name <name>', 'Nome do caso para case-init')
  .option('-a, --auth', 'Marcar como autorizado (para ACT)', false)
  .option('-t, --target <url>', 'URL alvo')
  .action(async (hint, options) => {
    const args = [
      '-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/master-route.ps1'),
      '-Hint', hint
    ];
    if (options.caseName) {
      args.push('-CaseName', options.caseName);
    }
    if (options.auth) {
      args.push('-AuthGranted');
    }
    if (options.target) {
      args.push('-TargetUrl', options.target);
    }
    await runPowerShell(args);
  });

program
  .command('init <hint>')
  .description('Inicializa um novo caso com case-init.ps1')
  .requiredOption('-n, --case-name <name>', 'Nome do caso')
  .option('-a, --auth', 'Autorização concedida', false)
  .option('-t, --target <url>', 'URL alvo')
  .option('-p, --profile <profile>', 'Perfil de rede', 'authorized_target_only')
  .action(async (hint, options) => {
    const args = [
      '-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/case-init.ps1'),
      '-Hint', hint,
      '-CaseName', options.caseName
    ];
    if (options.auth) args.push('-AuthGranted');
    if (options.target) args.push('-TargetUrl', options.target);
    if (options.profile) args.push('-NetworkProfile', options.profile);
    await runPowerShell(args);
  });

program
  .command('bootstrap <capabilities...>')
  .description('Bootstrap de capacidades MCP (jshookmcp, anything-analyzer)')
  .option('-s, --start', 'Iniciar serviços (anything-analyzer)', false)
  .action(async (capabilities, options) => {
    const args = [
      '-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/bootstrap-reverse.ps1'),
      '-Capability', capabilities.join(',')
    ];
    if (options.start) args.push('-StartServices');
    await runPowerShell(args);
  });

program
  .command('guard <case-root>')
  .description('Verifica se caso está pronto para ACT (case-guard.ps1)')
  .action(async (caseRoot) => {
    const args = [
      '-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/case-guard.ps1'),
      '-CaseRoot', caseRoot
    ];
    await runPowerShell(args);
  });

program
  .command('evidence <case-root> <id> <title> <repro>')
  .description('Adiciona evidência ao caso')
  .action(async (caseRoot, id, title, repro) => {
    const args = [
      '-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/append-evidence.ps1'),
      '-CaseRoot', caseRoot,
      '-Id', id,
      '-Title', title,
      '-ReproCommand', repro
    ];
    await runPowerShell(args);
  });

program
  .command('review <case-root>')
  .description('Review do caso com case-review script')
  .option('--verify-hashes', 'Verificar hashes', false)
  .option('--strict', 'Modo estrito', false)
  .action(async (caseRoot, options) => {
    const args = ['skills/case-review/scripts/review_case.py', caseRoot];
    if (options.verifyHashes) args.push('--verify-hashes');
    if (options.strict) args.push('--strict');
    await runPython(args);
  });

program
  .command('smoke')
  .description('Teste de fumaça completo (verify + parse + routing matrix)')
  .action(async () => {
    const args = ['-File', resolve(REVERSE_SKILL_ROOT, 'skills/scripts/smoke.ps1')];
    await runPowerShell(args);
  });

function runPowerShell(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', ...args], {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      shell: true
    });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`Exit code ${code}`)));
    proc.on('error', reject);
  });
}

function runPython(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('python3', args, {
      cwd: REVERSE_SKILL_ROOT,
      stdio: 'inherit',
      shell: true
    });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`Exit code ${code}`)));
    proc.on('error', reject);
  });
}

program.parseAsync(process.argv).catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});