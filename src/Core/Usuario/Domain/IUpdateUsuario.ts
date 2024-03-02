import type { IUsuario } from "./IUsuario";

export type IUpdateUsuario = Partial<
	Omit<
		IUsuario,
		| "administrativo"
		| "profesor"
		| "alumno"
		| "grupos"
		| "id"
		| "createdAt"
		| "updatedAt"
		| "tipo"
	>
>;
