import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";

export type ICreateAnexoAsignaturaEnMalla = Omit<
	ICreateAsignaturaEnMalla,
	| "esAnexo"
	| "ejeFormativoId"
	| "nivel"
	| "createdAt"
	| "updatedAt"
	| "campoFormacionId"
> & {
	esAnexo: true;
	nivel: 0;
	ejeFormativoId: null;
	campoFormacionId: string;
};
