import type { ICentroInformacion } from "./ICentroInformacion";

export type ICreateCentroInformacion = Omit<
	ICentroInformacion,
	"id" | "createdAt" | "updatedAt" | "estado" | "enUso"
>;
