import type { ICronogramaMatriculacion } from "./ICronogramaMatriculacion"
import type { ICreateCronogramaMatriculacion } from "./ICreateCronogramaMatriculacion"
import type { IUpdateCronogramaMatriculacion } from "./IUpdateCronogramaMatriculacion";

export type UpdateCronogramaMatriculacionParams = {
	id: string;
	data: IUpdateCronogramaMatriculacion;
}

export type ICronogramaMatriculacionRepository = {
  create(data: ICreateCronogramaMatriculacion): Promise<ICronogramaMatriculacion>;
	getAll(): Promise<ICronogramaMatriculacion[]>;
	getById(id: string): Promise<ICronogramaMatriculacion | null>;
	update(params: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion>;
	deleteById(id: string): Promise<ICronogramaMatriculacion>;
}