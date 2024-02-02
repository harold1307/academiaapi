import type { INivelMalla } from "./INivelMalla";

export type IUpdateNivelMalla = Omit<
	INivelMalla,
	"id" | "nivel" | "mallaId" | "createdAt" | "updatedAt"
>;
