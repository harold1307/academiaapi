import type { IAsignaturaEnNivelMalla } from "./IAsignaturaEnNivelMalla";

export type ICreateAsignaturaEnNivelMalla = Omit<
	IAsignaturaEnNivelMalla,
	"id" | "createdAt" | "updatedAt"
>;
