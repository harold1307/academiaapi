import type { IMallaCurricular } from "./IMallaCurricular";

export type ICreateMallaCurricular = Omit<
	IMallaCurricular,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "enUso"
	| "estado"
	| "practicaPreProfesional"
	| "practicaComunitaria"
	| "tituloObtenido"
	| "niveles"
	| "modulos"
> & {
	niveles: number;
};
