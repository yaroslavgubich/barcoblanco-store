// addRelativePathComments.ts
import fs from "fs";
import path from "path";

const rootDir = process.cwd(); // Use current working directory

function processFiles(dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      if (filePath.includes("node_modules") || filePath.includes(".next"))
        return;
      processFiles(filePath);
    } else if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
      const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
      let content = fs.readFileSync(filePath, "utf8");

      // Avoid adding duplicate comments
      if (!content.startsWith(`// ${relativePath}`)) {
        content = `// ${relativePath}\n${content}`;
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Updated: ${relativePath}`);
      }
    }
  });
}

processFiles(rootDir);
