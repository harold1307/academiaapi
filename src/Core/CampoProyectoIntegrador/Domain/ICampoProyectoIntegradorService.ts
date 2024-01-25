import type { ICampoProyectoIntegrador } from "./ICampoProyectoIntegrador";
import type { IUpdateCampoProyectoIntegradorParams } from "./ICampoProyectoIntegradorRepository";
import type { ICreateCampoProyectoIntegrador } from "./ICreateCampoProyectoIntegrador";

export type ICampoProyectoIntegradorService = {
	createCampoProyectoIntegrador(
		data: ICreateCampoProyectoIntegrador,
	): Promise<ICampoProyectoIntegrador>;
	getAllCampoProyectosIntegradores(): Promise<ICampoProyectoIntegrador[]>;
	getCampoProyectoIntegradorById(
		id: string,
	): Promise<ICampoProyectoIntegrador | null>;
	updateCampoProyectoIntegradorById(
		params: IUpdateCampoProyectoIntegradorParams,
	): Promise<ICampoProyectoIntegrador>;
	deleteCampoProyectoIntegradorById(
		id: string,
	): Promise<ICampoProyectoIntegrador>;
};
