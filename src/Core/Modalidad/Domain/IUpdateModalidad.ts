import type { IModalidad } from "./IModalidad";

export type IUpdateModalidad = Omit<
	IModalidad,
	"nombre" | "enUso" | "createdAt" | "updatedAt"
>;
