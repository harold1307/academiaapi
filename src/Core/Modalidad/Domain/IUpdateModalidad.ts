import type { IModalidad } from "./IModalidad";

export type IUpdateModalidad = Partial<
	Omit<IModalidad, "enUso" | "createdAt" | "updatedAt" | "id">
>;
