import type { IRequisitoMatriculacion } from "./IRequisitoMatriculacion";

export type ICreateRequisitoMatriculacion = Omit<
	IRequisitoMatriculacion,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "sede"
	| "programa"
	| "modalidad"
	| "tipoDocumento"
>;
