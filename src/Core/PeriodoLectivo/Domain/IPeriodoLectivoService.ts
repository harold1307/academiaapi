import type { IPeriodoLectivo } from "./IPeriodoLectivo"
import type { ICreatePeriodoLectivo } from "./ICreatePeriodoLectivo"
import type { UpdatePeriodoLectivoParams } from "./IPeriodoLectivoRepository";

export type IPeriodoLectivoService = {
  createPeriodoLectivo(data: ICreatePeriodoLectivo): Promise<IPeriodoLectivo>;
	getAllPeriodoLectivos(): Promise<IPeriodoLectivo[]>;
	getPeriodoLectivoById(id: string): Promise<IPeriodoLectivo | null>;
	updatePeriodoLectivoById(params: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo>;
	deletePeriodoLectivoById(id: string): Promise<IPeriodoLectivo>;
}