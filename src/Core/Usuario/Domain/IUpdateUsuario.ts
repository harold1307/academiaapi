import type { IUsuario } from "./IUsuario";

export type IUpdateUsuario = Partial<
	Omit<
		IUsuario,
		| "administrativo"
		| "profesor"
		| "alumno"
		| "grupos"
		| "estado"
		| "id"
		| "createdAt"
		| "updatedAt"
		| "tipo"
	>
>;
