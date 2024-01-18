import type { ICreateSesion } from "./ICreateSesion";
import type { ISesion } from "./ISesion";

export type ISesionRepository = {
	create(data: ICreateSesion): Promise<ISesion>;
	getAll(): Promise<ISesion[]>;
	getById(id: string): Promise<ISesion | null>;
	// update(params: IUpdateSesionParams): Promise<ISesion>;
	deleteById(id: string): Promise<ISesion>;
};
