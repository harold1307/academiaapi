import type { ICampoProyectoIntegrador } from "./ICampoProyectoIntegrador";
import type { ICreateCampoProyectoIntegrador } from "./ICreateCampoProyectoIntegrador";
import type { IUpdateCampoProyectoIntegrador } from "./IUpdateCampoProyectoIntegrador";

export type IUpdateCampoProyectoIntegradorParams = {
	id: string;
	data: IUpdateCampoProyectoIntegrador;
};

export type ICampoProyectoIntegradorRepository = {
	create(
		data: ICreateCampoProyectoIntegrador,
	): Promise<ICampoProyectoIntegrador>;
	getAll(): Promise<ICampoProyectoIntegrador[]>;
	getById(id: string): Promise<ICampoProyectoIntegrador | null>;
	update(
		params: IUpdateCampoProyectoIntegradorParams,
	): Promise<ICampoProyectoIntegrador>;
	deleteById(id: string): Promise<ICampoProyectoIntegrador>;
};
