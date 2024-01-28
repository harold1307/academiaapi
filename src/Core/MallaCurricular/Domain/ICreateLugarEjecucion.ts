import type { ILugarEjecucion } from "./ILugarEjecucion";

export type ICreateLugarEjecucion = Omit<
	ILugarEjecucion,
	"id" | "institucion" | "createdAt" | "updatedAt"
>;
