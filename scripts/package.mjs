// Validates every skill folder and (without --check) builds dist/<skill>.skill zip files.
//   node scripts/package.mjs          -> validate + build
//   node scripts/package.mjs --check  -> validate only
//   node scripts/package.mjs --sync   -> copy docs/shared-rules.md into every SKILL.md, then validate + build
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skillsDir = path.join(root, 'skills')
const dist = path.join(root, 'dist')
const checkOnly = process.argv.includes('--check')
const sync = process.argv.includes('--sync')

// Shared rules live in one file; each SKILL.md carries an identical copy between markers
// (a .skill file contains only its own folder, so skills cannot point at docs/).
const START = '<!-- shared-rules:start -->'
const END = '<!-- shared-rules:end -->'
const shared = readFileSync(path.join(root, 'docs', 'shared-rules.md'), 'utf8').replace(/\r\n/g, '\n').trim()
const sharedBlock = `${START}\n${shared}\n${END}`

const problems = []
const skills = readdirSync(skillsDir).filter((name) => statSync(path.join(skillsDir, name)).isDirectory())

for (const name of skills) {
  const file = path.join(skillsDir, name, 'SKILL.md')
  if (!existsSync(file)) {
    problems.push(`${name}: SKILL.md is missing`)
    continue
  }
  let text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n')
  const a = text.indexOf(START)
  const b = text.indexOf(END)
  if (sync) {
    if (a !== -1 && b > a) text = text.slice(0, a) + sharedBlock + text.slice(b + END.length)
    else {
      const at = text.indexOf('\n## Faster with')
      text = at === -1 ? text.trimEnd() + '\n\n' + sharedBlock + '\n' : text.slice(0, at + 1) + sharedBlock + '\n' + text.slice(at)
    }
    writeFileSync(file, text)
  } else if (a === -1 || b < a || text.slice(a, b + END.length) !== sharedBlock) {
    problems.push(`${name}: shared rules block is missing or differs from docs/shared-rules.md (run with --sync)`)
  }
  const match = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    problems.push(`${name}: frontmatter is missing`)
    continue
  }
  const front = Object.fromEntries(
    match[1].split('\n').map((line) => {
      const i = line.indexOf(':')
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    }),
  )
  if (front.name !== name) problems.push(`${name}: frontmatter name "${front.name}" must equal the folder name`)
  if (!front.description) problems.push(`${name}: description is missing`)
  else if (front.description.length > 1024) problems.push(`${name}: description is ${front.description.length} characters (max 1024)`)
  const lines = text.split('\n').length
  if (lines > 500) problems.push(`${name}: SKILL.md has ${lines} lines (aim for under 500; move detail to references/)`)
  for (const ref of text.matchAll(/`(references\/[^`]+)`/g)) {
    if (!existsSync(path.join(skillsDir, name, ref[1]))) problems.push(`${name}: referenced file ${ref[1]} does not exist`)
  }
}

if (problems.length) {
  console.error('Problems found:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log(`${skills.length} skills valid: ${skills.join(', ')}`)
if (checkOnly) process.exit(0)

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })
// Windows ships bsdtar, which writes zip archives; elsewhere use a tar with zip support.
const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot || 'C:/Windows', 'System32', 'tar.exe') : 'tar'
for (const name of skills) {
  const out = path.join(dist, `${name}.skill`)
  const result = spawnSync(tar, ['-a', '-c', '-f', out, '-C', skillsDir, name], { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`could not build ${name}.skill (needs tar with zip support, e.g. bsdtar)`)
    process.exit(1)
  }
  console.log('built', path.relative(root, out))
}
