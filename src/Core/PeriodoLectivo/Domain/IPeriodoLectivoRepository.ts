import type { IPeriodoLectivo } from "./IPeriodoLectivo"
import type { ICreatePeriodoLectivo } from "./ICreatePeriodoLectivo"
import type { IUpdatePeriodoLectivo } from "./IUpdatePeriodoLectivo";

export type UpdatePeriodoLectivoParams = {
	id: string;
	data: IUpdatePeriodoLectivo;
}

export type IPeriodoLectivoRepository = {
  create(data: ICreatePeriodoLectivo): Promise<IPeriodoLectivo>;
	getAll(): Promise<IPeriodoLectivo[]>;
	getById(id: string): Promise<IPeriodoLectivo | null>;
	update(params: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo>;
	deleteById(id: string): Promise<IPeriodoLectivo>;
}