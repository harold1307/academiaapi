import type { ICreateSubPeriodoLectivo } from "./ICreateSubPeriodoLectivo";

export type IUpdateSubPeriodoLectivo = Partial<
	Omit<ICreateSubPeriodoLectivo, "periodoId">
>;
