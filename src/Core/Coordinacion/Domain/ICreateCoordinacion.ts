import type { ICoordinacion } from "./ICoordinacion";

export type ICreateCoordinacion = Omit<
	ICoordinacion,
	"id" | "enUso" | "createdAt" | "updatedAt"
>;
