import type { IAsignaturaEnMalla } from "./IAsignaturaEnMalla";

export type ICreateAsignaturaEnMalla = Omit<
	IAsignaturaEnMalla,
	| "id"
	| "estado"
	| "createdAt"
	| "updatedAt"
	| "ejeFormativo"
	| "areaConocimiento"
	| "campoFormacion"
>;
