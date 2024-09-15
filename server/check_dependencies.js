import fs from "fs/promises";
import path from "path";

async function checkDependencies() {
  const packageJson = JSON.parse(await fs.readFile("package.json", "utf8"));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  for (const [dep, version] of Object.entries(dependencies)) {
    const depPath = path.join("node_modules", dep, "package.json");
    try {
      const depPackageJson = JSON.parse(await fs.readFile(depPath, "utf8"));
      const moduleType = depPackageJson.type === "module" ? "ES Module" : "CommonJS";
      console.log(`${dep}: ${moduleType}`);
    } catch (error) {
      console.log(`${dep}: Unable to determine (${error.message})`);
    }
  }
}

checkDependencies();
