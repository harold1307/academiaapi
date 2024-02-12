import type { ICreateNivelTitulacion } from "./ICreateNivelTitulacion";
import type { INivelTitulacion } from "./INivelTitulacion";
import type { IUpdateNivelTitulacion } from "./IUpdateNivelTitulacion";

export type UpdateNivelTitulacionParams = {
	id: string;
	data: IUpdateNivelTitulacion;
};

export type INivelTitulacionRepository = {
	create(data: ICreateNivelTitulacion): Promise<INivelTitulacion>;
	getAll(): Promise<INivelTitulacion[]>;
	getById(id: string): Promise<INivelTitulacion | null>;
	update(params: UpdateNivelTitulacionParams): Promise<INivelTitulacion>;
	deleteById(id: string): Promise<INivelTitulacion>;
};
