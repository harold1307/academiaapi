import type { IAsignaturaModuloEnMalla } from "./IAsignaturaModuloEnMalla";

export type ICreateAsignaturaModuloEnMalla = Omit<
	IAsignaturaModuloEnMalla,
	"id" | "createdAt" | "updatedAt"
>;
