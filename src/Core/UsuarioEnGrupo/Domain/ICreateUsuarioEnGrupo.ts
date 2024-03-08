import type { IUsuarioEnGrupo } from "./IUsuarioEnGrupo";

export type ICreateUsuarioEnGrupo = Omit<
	IUsuarioEnGrupo,
	"id" | "createdAt" | "updatedAt"
>;
