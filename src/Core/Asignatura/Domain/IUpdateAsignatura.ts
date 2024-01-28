import type { IAsignatura } from "./IAsignatura";

export type IUpdateAsignatura = Partial<
	Omit<IAsignatura, "id" | "nombre" | "enUso" | "createdAt" | "updatedAt">
>;
