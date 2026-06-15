import { chmod, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const paths = [
  join(
    process.cwd(),
    "node_modules",
    "@esbuild",
    "linux-x64",
    "bin",
    "esbuild",
  ),
  join(
    process.cwd(),
    "node_modules",
    "@esbuild",
    "linux-arm64",
    "bin",
    "esbuild",
  ),
];

const fixPermissions = async () => {
  for (const filePath of paths) {
    try {
      await access(filePath, constants.F_OK);
      await chmod(filePath, 0o755);
      console.log(`Fixed permissions for ${filePath}`);
    } catch {
      // ignore if the file doesn't exist or can't be modified
    }
  }
};

fixPermissions().catch(() => {
  // silent fail to avoid breaking installs on unsupported platforms
});
