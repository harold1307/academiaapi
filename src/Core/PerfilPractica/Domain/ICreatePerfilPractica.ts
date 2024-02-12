import type { IPerfilPractica } from "./IPerfilPractica";

export type ICreatePerfilPractica = Omit<
	IPerfilPractica,
	"id" | "enUso" | "createdAt" | "updatedAt" | "programaId"
>;
