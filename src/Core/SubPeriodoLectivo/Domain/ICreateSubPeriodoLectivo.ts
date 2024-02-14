import type { ISubPeriodoLectivo } from "./ISubPeriodoLectivo";

export type ICreateSubPeriodoLectivo = Omit<
	ISubPeriodoLectivo,
	"id" | "createdAt" | "updatedAt"
>;
