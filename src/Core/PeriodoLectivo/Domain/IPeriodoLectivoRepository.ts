import type { ICronogramaMatriculacion } from "../../CronogramaMatriculacion/Domain/ICronogramaMatriculacion";
import type { ICreatePeriodoLectivo } from "./ICreatePeriodoLectivo";
import type { IPeriodoLectivo } from "./IPeriodoLectivo";
import type { IUpdatePeriodoLectivo } from "./IUpdatePeriodoLectivo";

export type UpdatePeriodoLectivoParams = {
	id: string;
	data: IUpdatePeriodoLectivo;
};

export type IPeriodoLectivoRepository = {
	create(data: ICreatePeriodoLectivo): Promise<IPeriodoLectivo>;
	getAll(): Promise<IPeriodoLectivo[]>;
	getById(id: string): Promise<IPeriodoLectivo | null>;
	update(params: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo>;
	deleteById(id: string): Promise<IPeriodoLectivo>;

	getByIdWithCronogramasMatriculacion(id: string): Promise<
		| (IPeriodoLectivo & {
				cronogramasMatriculacion: ICronogramaMatriculacion[];
		  })
		| null
	>;
};
