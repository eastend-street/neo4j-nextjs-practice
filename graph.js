// Dependencies: ts-morph, neo4j-driver

import { Project } from "ts-morph";
import neo4j from "neo4j-driver";
import path from "path";
import fs from "fs";
// === CONFIG ===
const tsConfigFilePath = "./tsconfig.json";
const sourceGlob = "app/**/*.{ts,tsx,js,jsx}";
const neo4jUri = "bolt://localhost:7687";
const neo4jUser = "neo4j";
const neo4jPassword = "YOUR_PASSWORD_GOES_HERE";

(async () => {
  const project = new Project({
    tsConfigFilePath,
  });

  const sourceFiles = project.getSourceFiles(sourceGlob);
  const edges = [];

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    const imports = sourceFile.getImportDeclarations();

    for (const imp of imports) {
      const specifier = imp.getModuleSpecifierValue();

      // Only include local relative imports
      if (specifier.startsWith(".") || specifier.startsWith("/")) {
        const resolved = imp.getModuleSpecifierSourceFile();
        if (resolved) {
          const from = path.relative(".", filePath);
          const to = path.relative(".", resolved.getFilePath());
          edges.push({ from, to });
        }
      }
    }
  }

  const driver = neo4j.driver(
    neo4jUri,
    neo4j.auth.basic(neo4jUser, neo4jPassword)
  );
  const session = driver.session();

  console.log(`Found ${edges.length} edges. Inserting into Neo4j...`);

  for (const { from, to } of edges) {
    await session.run(
      `
      MERGE (a:Component {name: $from})
      MERGE (b:Component {name: $to})
      MERGE (a)-[:IMPORTS]->(b)
      `,
      { from, to }
    );
  }

  const result = await session.run(`
    MATCH (a:Component)-[:IMPORTS]->(b:Component)
    RETURN a.name AS from, b.name AS to
  `);

  const data = result.records.map((record) => ({
    from: record.get("from"),
    to: record.get("to"),
  }));

  fs.writeFileSync("code-graph.json", JSON.stringify(data, null, 2));
  console.log("Graph exported to code-graph.json");

  console.log("Done.");
  await session.close();
  await driver.close();
})();
