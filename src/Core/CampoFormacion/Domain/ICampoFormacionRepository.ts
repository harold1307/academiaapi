import type { ICampoFormacion } from "./ICampoFormacion";
import type { ICreateCampoFormacion } from "./ICreateCampoFormacion";
import type { IUpdateCampoFormacion } from "./IUpdateCampoFormacion";

export type UpdateCampoFormacionParams = {
	id: string;
	data: IUpdateCampoFormacion;
};

export interface ICampoFormacionRepository {
	create(data: ICreateCampoFormacion): Promise<ICampoFormacion>;
	getAll(): Promise<ICampoFormacion[]>;
	getById(id: string): Promise<ICampoFormacion | null>;
	update(params: UpdateCampoFormacionParams): Promise<ICampoFormacion>;
	deleteById(id: string): Promise<ICampoFormacion>;
}
