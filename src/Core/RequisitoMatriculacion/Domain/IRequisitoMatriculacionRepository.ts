import type { IRequisitoMatriculacion } from "./IRequisitoMatriculacion";
import type { ICreateRequisitoMatriculacion } from "./ICreateRequisitoMatriculacion";
import type { IUpdateRequisitoMatriculacion } from "./IUpdateRequisitoMatriculacion";

export type UpdateRequisitoMatriculacionParams = {
	id: string;
	data: IUpdateRequisitoMatriculacion;
};

export type IRequisitoMatriculacionRepository = {
	create(data: ICreateRequisitoMatriculacion): Promise<IRequisitoMatriculacion>;
	getAll(): Promise<IRequisitoMatriculacion[]>;
	getById(id: string): Promise<IRequisitoMatriculacion | null>;
	update(
		params: UpdateRequisitoMatriculacionParams,
	): Promise<IRequisitoMatriculacion>;
	deleteById(id: string): Promise<IRequisitoMatriculacion>;
};
