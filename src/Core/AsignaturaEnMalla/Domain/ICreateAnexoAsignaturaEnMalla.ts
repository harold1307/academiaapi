import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";

export type ICreateAnexoAsignaturaEnMalla = Omit<
	ICreateAsignaturaEnMalla,
	"esAnexo" | "ejeFormativoId" | "nivel"
> & {
	esAnexo: true;
	nivel: 0;
	ejeFormativoId: null;
};
