import * as fs from 'fs'
import * as iconv from 'iconv-lite'
import * as path from 'path'

const inputDir = path.join(process.cwd(), 'original-src')
const outputDir = path.join(process.cwd(), '.tmp', 'src_utf8')

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true })
  console.log(`Wiped output directory: ${outputDir}`)
}

function ensureDirectoryExists(filePath: string): void {
  const dirName = path.dirname(filePath)
  if (fs.existsSync(dirName)) return
  ensureDirectoryExists(dirName)
  fs.mkdirSync(dirName)
}

function convertFile(filePath: string, relativePath: string): void {
  const outputFilePath = path.join(outputDir, relativePath)
  ensureDirectoryExists(outputFilePath)

  const buffer = fs.readFileSync(filePath)
  const decodedContent = iconv.decode(buffer, 'windows-1251')

  fs.writeFileSync(outputFilePath, decodedContent, 'utf8')
  console.log(`Converted: ${filePath} -> ${outputFilePath}`)
}

function copyFileUnchanged(filePath: string, relativePath: string): void {
  const outputFilePath = path.join(outputDir, relativePath)
  ensureDirectoryExists(outputFilePath)
  fs.copyFileSync(filePath, outputFilePath)
  console.log(`Copied: ${filePath} -> ${outputFilePath}`)
}

function processDirectory(currentDir: string, relativeDir = ''): void {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)
    const relPath = path.join(relativeDir, entry.name)
    if (entry.isDirectory()) {
      processDirectory(fullPath, relPath)
      continue
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith('.html') || entry.name.endsWith('.js'))
    ) {
      convertFile(fullPath, relPath)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.ini')) {
      continue
    }

    copyFileUnchanged(fullPath, relPath)
  }
}

processDirectory(inputDir)
