import type { ICreateProyectoIntegrador } from "./ICreateProyectoIntegrador";
import type { IProyectoIntegrador } from "./IProyectoIntegrador";
import type { IUpdateProyectoIntegrador } from "./IUpdateProyectoIntegrador";

export type IUpdateProyectoIntegradorParams = {
	id: string;
	data: IUpdateProyectoIntegrador;
};

export type IProyectoIntegradorRepository = {
	create(data: ICreateProyectoIntegrador): Promise<IProyectoIntegrador>;
	getAll(): Promise<IProyectoIntegrador[]>;
	getById(id: string): Promise<IProyectoIntegrador | null>;
	update(params: IUpdateProyectoIntegradorParams): Promise<IProyectoIntegrador>;
	deleteById(id: string): Promise<IProyectoIntegrador>;
};
