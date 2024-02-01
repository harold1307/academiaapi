import type { ICreateSesion } from "./ICreateSesion";
import type { ISesion } from "./ISesion";
import type { IUpdateSesion } from "./IUpdateSesion";

export type UpdateSesionParams = {
	id: string;
	data: IUpdateSesion;
};

export type ISesionRepository = {
	create(data: ICreateSesion): Promise<ISesion>;
	getAll(): Promise<ISesion[]>;
	getById(id: string): Promise<ISesion | null>;
	update(params: UpdateSesionParams): Promise<ISesion>;
	deleteById(id: string): Promise<ISesion>;
};
