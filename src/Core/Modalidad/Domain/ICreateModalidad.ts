import type { IModalidad } from "./IModalidad";

export type ICreateModalidad = Omit<
	IModalidad,
	"enUso" | "createdAt" | "updatedAt"
>;
