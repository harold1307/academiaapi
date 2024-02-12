import type { ISesion } from "./ISesion";

export type ICreateSesion = Omit<
	ISesion,
	"id" | "estado" | "enUso" | "createdAt" | "updatedAt" | "turnos" | "sede"
>;
