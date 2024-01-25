import type { ICreateProyectoIntegrador } from "./ICreateProyectoIntegrador";
import type { IProyectoIntegrador } from "./IProyectoIntegrador";
import type { IUpdateProyectoIntegradorParams } from "./IProyectoIntegradorRepository";

export type IProyectoIntegradorService = {
	createProyectoIntegrador(
		data: ICreateProyectoIntegrador,
	): Promise<IProyectoIntegrador>;
	getAllProyectosIntegradores(): Promise<IProyectoIntegrador[]>;
	getProyectoIntegradorById(id: string): Promise<IProyectoIntegrador | null>;
	updateProyectoIntegradorById(
		params: IUpdateProyectoIntegradorParams,
	): Promise<IProyectoIntegrador>;
	deleteProyectoIntegradorById(id: string): Promise<IProyectoIntegrador>;
};
