import type { IInscripcion } from "./IInscripcion";

export type ICreateInscripcion = Omit<
	IInscripcion,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "sede"
	| "modalidad"
	| "programa"
	| "coordinacion"
	| "malla"
	| "sesion"
	| "matricula"
	| "matricularseConLimite"
>;
