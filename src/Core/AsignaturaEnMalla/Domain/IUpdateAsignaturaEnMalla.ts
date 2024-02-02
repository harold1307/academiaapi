import type { ICreateAsignaturaEnMalla } from "./ICreateAsignaturaEnMalla";

export type IUpdateAsignaturaEnMalla = Partial<
	Omit<
		ICreateAsignaturaEnMalla,
		| "id"
		| "enUso"
		| "createdAt"
		| "updatedAt"
		| "esAnexo"
		| "ejeFormativo"
		| "areaConocimiento"
		| "campoFormacion"
		| "nivel"
		| "asignaturaId"
		| "mallaId"
	>
>;
