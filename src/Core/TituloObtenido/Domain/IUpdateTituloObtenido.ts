import type { ICreateTituloObtenido } from "./ICreateTituloObtenido";

export type IUpdateTituloObtenido = Partial<
	Omit<ICreateTituloObtenido, "programaId">
>;
