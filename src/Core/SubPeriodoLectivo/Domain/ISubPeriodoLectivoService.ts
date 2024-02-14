import type { ISubPeriodoLectivo } from "./ISubPeriodoLectivo";
import type { ICreateSubPeriodoLectivo } from "./ICreateSubPeriodoLectivo";
import type { UpdateSubPeriodoLectivoParams } from "./ISubPeriodoLectivoRepository";

export type ISubPeriodoLectivoService = {
	createSubPeriodoLectivo(
		data: ICreateSubPeriodoLectivo,
	): Promise<ISubPeriodoLectivo>;
	getAllSubPeriodoLectivos(): Promise<ISubPeriodoLectivo[]>;
	getSubPeriodoLectivoById(id: string): Promise<ISubPeriodoLectivo | null>;
	updateSubPeriodoLectivoById(
		params: UpdateSubPeriodoLectivoParams,
	): Promise<ISubPeriodoLectivo>;
	deleteSubPeriodoLectivoById(id: string): Promise<ISubPeriodoLectivo>;
};
