import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";

export type ICreateAnexoAsignaturaEnMalla = Omit<
	ICreateAsignaturaEnMalla,
	"esAnexo" | "ejeFormativoId" | "nivel" | "createdAt" | "updatedAt"
> & {
	esAnexo: true;
	nivel: 0;
	ejeFormativoId: null;
};
