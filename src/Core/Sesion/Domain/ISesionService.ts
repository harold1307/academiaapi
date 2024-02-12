import type { ICreateSesion } from "./ICreateSesion";
import type { ISesion } from "./ISesion";
import type { UpdateSesionParams } from "./ISesionRepository";

export type ISesionService = {
	createSesion(data: ICreateSesion): Promise<ISesion>;
	getAllSesiones(filters?: Record<string, string>): Promise<ISesion[]>;
	getSesionById(id: string): Promise<ISesion | null>;
	updateSesionById(params: UpdateSesionParams): Promise<ISesion>;
	deleteSesionById(id: string): Promise<ISesion>;
};
