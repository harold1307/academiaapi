import type { IAsesorCrm } from "./IAsesorCrm";

export type ICreateAsesorCrm = Omit<
	IAsesorCrm,
	"id" | "createdAt" | "updatedAt" | "administrativo" | "centrosInformacion"
>;
