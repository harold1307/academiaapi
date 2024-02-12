import type { ILugarEjecucion } from "./ILugarEjecucion";

export type ICreateLugarEjecucion = Omit<
	ILugarEjecucion,
	"id" | "createdAt" | "updatedAt" | "sede"
>;
