import * as fs from 'fs'
import * as path from 'path'

const baseInputDir = path.join(process.cwd(), '.tmp', 'src_utf8')
const headerTemplatePath = path.join(process.cwd(), 'templates', 'top.html')
const footerTemplatePath = path.join(process.cwd(), 'templates', 'bottom.html')

const topTemplate = fs.readFileSync(headerTemplatePath, 'utf8')
const bottomTemplate = fs.readFileSync(footerTemplatePath, 'utf8')

function processHtmlFile(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf8')

  // Regex to match the top script tag with the function call top('filename');
  // This regex assumes the tag is on its own lines (or with whitespace) and uses case-insensitive matching.
  const topRegex =
    /<script\s+language=["']javascript["']>\s*top\('([^']+)'\);\s*<\/script>/i

  const topMatch = content.match(topRegex)
  if (topMatch) {
    const fileName = topMatch[1] // Extracted filename, e.g., "photos.gif"
    const replacedTop = topTemplate.replace(/{TITLE}/g, fileName)
    content = content.replace(topRegex, replacedTop)
    console.log(
      `Processed top tag in ${filePath}: replaced with file name "${fileName}"`,
    )
  }

  // Regex to match the bottom script tag that calls bottom();
  const bottomRegex =
    /<script\s+language=["']javascript["']>\s*bottom\(\);\s*<\/script>/i

  if (bottomRegex.test(content)) {
    content = content.replace(bottomRegex, bottomTemplate)
    console.log(`Processed bottom tag in ${filePath}`)
  }

  fs.writeFileSync(filePath, content, 'utf8')
}

function processDirectory(currentDir: string): void {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)
    if (entry.isDirectory()) {
      processDirectory(fullPath)
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      processHtmlFile(fullPath)
    }
  }
}

processDirectory(baseInputDir)
