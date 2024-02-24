import type { IGrupo } from "./IGrupo";

export type ICreateGrupo = Omit<
	IGrupo,
	| "id"
	| "createdAt"
	| "updatedAt"
	| "usuarios"
	| "activos"
	| "inactivos"
	| "enUso"
>;
