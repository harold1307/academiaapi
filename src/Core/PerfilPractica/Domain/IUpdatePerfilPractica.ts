import type { IPerfilPractica } from "./IPerfilPractica";

export type IUpdatePerfilPractica = Partial<
	Omit<IPerfilPractica, "id" | "enUso" | "createdAt" | "updatedAt">
>;
