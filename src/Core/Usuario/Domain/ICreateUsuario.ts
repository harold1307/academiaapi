import type { IUsuario } from "./IUsuario";

export type ICreateUsuario = Omit<
	IUsuario,
	| "administrativo"
	| "profesor"
	| "alumno"
	| "grupos"
	| "estado"
	| "id"
	| "createdAt"
	| "updatedAt"
>;
