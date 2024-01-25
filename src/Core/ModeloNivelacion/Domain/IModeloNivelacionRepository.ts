import type { IModeloNivelacion } from "./IModeloNivelacion";
import type { ICreateModeloNivelacion } from "./ICreateModeloNivelacion";
import type { IUpdateModeloNivelacion } from "./IUpdateModeloNivelacion";

export type IUpdateModeloNivelacionParams = {
	id: string;
	data: IUpdateModeloNivelacion;
};

export type IModeloNivelacionRepository = {
	create(data: ICreateModeloNivelacion): Promise<IModeloNivelacion>;
	getAll(): Promise<IModeloNivelacion[]>;
	getById(id: string): Promise<IModeloNivelacion | null>;
	update(params: IUpdateModeloNivelacionParams): Promise<IModeloNivelacion>;
	deleteById(id: string): Promise<IModeloNivelacion>;
};
