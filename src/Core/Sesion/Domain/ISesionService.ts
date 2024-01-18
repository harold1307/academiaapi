import type { ICreateSesion } from "./ICreateSesion";
import type { ISesion } from "./ISesion";

export type ISesionService = {
	createSesion(data: ICreateSesion): Promise<ISesion>;
	getAllSesiones(): Promise<ISesion[]>;
	getSesionById(id: string): Promise<ISesion | null>;
	// updateSesionById(params: IUpdateSesionParams): Promise<ISesion>;
	deleteSesionById(id: string): Promise<ISesion>;
};
