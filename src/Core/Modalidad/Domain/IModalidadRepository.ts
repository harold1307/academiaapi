import type { ICreateModalidad } from "./ICreateModalidad";
import type { IModalidad } from "./IModalidad";
import type { IUpdateModalidad } from "./IUpdateModalidad";

export type IUpdateModalidadParams = {
	id: string;
	data: IUpdateModalidad;
};

export type IModalidadRepository = {
	create(data: ICreateModalidad): Promise<IModalidad>;
	getAll(): Promise<IModalidad[]>;
	getById(id: string): Promise<IModalidad | null>;
	update(params: IUpdateModalidadParams): Promise<IModalidad>;
	deleteById(id: string): Promise<IModalidad>;
};
