import type { ISubPeriodoLectivo } from "./ISubPeriodoLectivo";
import type { ICreateSubPeriodoLectivo } from "./ICreateSubPeriodoLectivo";
import type { IUpdateSubPeriodoLectivo } from "./IUpdateSubPeriodoLectivo";

export type UpdateSubPeriodoLectivoParams = {
	id: string;
	data: IUpdateSubPeriodoLectivo;
};

export type ISubPeriodoLectivoRepository = {
	create(data: ICreateSubPeriodoLectivo): Promise<ISubPeriodoLectivo>;
	getAll(): Promise<ISubPeriodoLectivo[]>;
	getById(id: string): Promise<ISubPeriodoLectivo | null>;
	update(params: UpdateSubPeriodoLectivoParams): Promise<ISubPeriodoLectivo>;
	deleteById(id: string): Promise<ISubPeriodoLectivo>;
};
