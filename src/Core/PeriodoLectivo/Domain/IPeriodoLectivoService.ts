import type { ICronogramaMatriculacion } from "../../CronogramaMatriculacion/Domain/ICronogramaMatriculacion";
import type { ICreatePeriodoLectivo } from "./ICreatePeriodoLectivo";
import type { IPeriodoLectivo } from "./IPeriodoLectivo";
import type { UpdatePeriodoLectivoParams } from "./IPeriodoLectivoRepository";

export type IPeriodoLectivoService = {
	createPeriodoLectivo(data: ICreatePeriodoLectivo): Promise<IPeriodoLectivo>;
	getAllPeriodoLectivos(): Promise<IPeriodoLectivo[]>;
	getPeriodoLectivoById(id: string): Promise<IPeriodoLectivo | null>;
	updatePeriodoLectivoById(
		params: UpdatePeriodoLectivoParams,
	): Promise<IPeriodoLectivo>;
	deletePeriodoLectivoById(id: string): Promise<IPeriodoLectivo>;

	getPeriodoLectivoByIdWithCronogramasMatriculacion(id: string): Promise<
		| (IPeriodoLectivo & {
				cronogramasMatriculacion: Omit<
					ICronogramaMatriculacion,
					"sede" | "programa" | "modalidad" | "nivel"
				>[];
		  })
		| null
	>;
};
