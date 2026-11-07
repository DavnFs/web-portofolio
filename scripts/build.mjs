import { spawnSync } from "node:child_process";

const args = process.argv.slice(2).filter((arg) => arg !== "--if-present");

const proc = spawnSync("next", ["build", ...args], {
  stdio: "inherit",
  shell: true,
});

process.exit(proc.status ?? 0);
