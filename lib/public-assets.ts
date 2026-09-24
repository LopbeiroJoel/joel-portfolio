import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
// Vérifié au rendu serveur ; reconstruire après ajout en production.
export function hasPublicAsset(assetPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", assetPath));
}
