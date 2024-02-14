import type { ICronogramaMatriculacion } from "./ICronogramaMatriculacion"
import type { ICreateCronogramaMatriculacion } from "./ICreateCronogramaMatriculacion"
import type { UpdateCronogramaMatriculacionParams } from "./ICronogramaMatriculacionRepository";

export type ICronogramaMatriculacionService = {
  createCronogramaMatriculacion(data: ICreateCronogramaMatriculacion): Promise<ICronogramaMatriculacion>;
	getAllCronogramaMatriculacions(): Promise<ICronogramaMatriculacion[]>;
	getCronogramaMatriculacionById(id: string): Promise<ICronogramaMatriculacion | null>;
	updateCronogramaMatriculacionById(params: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion>;
	deleteCronogramaMatriculacionById(id: string): Promise<ICronogramaMatriculacion>;
}