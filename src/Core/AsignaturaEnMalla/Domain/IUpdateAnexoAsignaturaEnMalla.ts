import type { ICreateAnexoAsignaturaEnMalla } from "./ICreateAnexoAsignaturaEnMalla";

export type IUpdateAnexoAsignaturaEnMalla = Partial<
	Omit<
		ICreateAnexoAsignaturaEnMalla,
		"asignaturaId" | "ejeFormativoId" | "nivel" | "esAnexo" | "mallaId"
	>
>;
