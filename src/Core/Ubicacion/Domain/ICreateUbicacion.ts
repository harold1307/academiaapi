import type { IUbicacion } from "./IUbicacion";

export type ICreateUbicacion = Omit<
	IUbicacion,
	"id" | "createdAt" | "updatedAt" | "estado" | "enUso"
>;
