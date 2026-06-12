import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "src", "data", "coupleData.ts");
const source = fs.readFileSync(dataPath, "utf8");
const assetPaths = [...source.matchAll(/"\/(images|videos|audio)\/[^"]+"/g)]
  .map((match) => match[0].slice(2, -1));

const missing = [...new Set(assetPaths)].filter((assetPath) => {
  return !fs.existsSync(path.join(root, "public", assetPath));
});

if (missing.length) {
  console.error("Assets faltando em public:");
  for (const asset of missing) {
    console.error(`- public/${asset}`);
  }
  process.exit(1);
}

console.log("Todos os assets configurados existem em public.");
