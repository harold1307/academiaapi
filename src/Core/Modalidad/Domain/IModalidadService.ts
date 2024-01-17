import type { ICreateModalidad } from "./ICreateModalidad";
import type { IModalidad } from "./IModalidad";
import type { IUpdateModalidadParams } from "./IModalidadRepository";

export type IModalidadService = {
	createModalidad(data: ICreateModalidad): Promise<IModalidad>;
	getAllModalidades(): Promise<IModalidad[]>;
	getModalidadById(id: string): Promise<IModalidad | null>;
	updateModalidadById(params: IUpdateModalidadParams): Promise<IModalidad>;
	deleteModalidadById(id: string): Promise<IModalidad>;
};
