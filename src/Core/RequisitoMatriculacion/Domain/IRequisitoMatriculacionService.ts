import type { IRequisitoMatriculacion } from "./IRequisitoMatriculacion";
import type { ICreateRequisitoMatriculacion } from "./ICreateRequisitoMatriculacion";
import type { UpdateRequisitoMatriculacionParams } from "./IRequisitoMatriculacionRepository";

export type IRequisitoMatriculacionService = {
	createRequisitoMatriculacion(
		data: ICreateRequisitoMatriculacion,
	): Promise<IRequisitoMatriculacion>;
	getAllRequisitoMatriculacions(): Promise<IRequisitoMatriculacion[]>;
	getRequisitoMatriculacionById(
		id: string,
	): Promise<IRequisitoMatriculacion | null>;
	updateRequisitoMatriculacionById(
		params: UpdateRequisitoMatriculacionParams,
	): Promise<IRequisitoMatriculacion>;
	deleteRequisitoMatriculacionById(
		id: string,
	): Promise<IRequisitoMatriculacion>;
};
