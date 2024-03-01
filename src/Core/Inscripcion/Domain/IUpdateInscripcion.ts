import type { IInscripcion } from "./IInscripcion";

export type IUpdateInscripcion = Partial<
	Omit<
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
		| "alumnoId"
	>
>;
