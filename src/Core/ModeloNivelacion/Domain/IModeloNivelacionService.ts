import type { ICreateModeloNivelacion } from "./ICreateModeloNivelacion";
import type { IModeloNivelacion } from "./IModeloNivelacion";
import type { IUpdateModeloNivelacionParams } from "./IModeloNivelacionRepository";

export type IModeloNivelacionService = {
	createModeloNivelacion(
		data: ICreateModeloNivelacion,
	): Promise<IModeloNivelacion>;
	getAllModelosNivelacion(): Promise<IModeloNivelacion[]>;
	getModeloNivelacionById(id: string): Promise<IModeloNivelacion | null>;
	updateModeloNivelacionById(
		params: IUpdateModeloNivelacionParams,
	): Promise<IModeloNivelacion>;
	deleteModeloNivelacionById(id: string): Promise<IModeloNivelacion>;
};
