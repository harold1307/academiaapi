import type { ICreateModalidad } from "./ICreateModalidad";
import type { IModalidad } from "./IModalidad";
import type { UpdateModalidadParams } from "./IModalidadRepository";

export type IModalidadService = {
	createModalidad(data: ICreateModalidad): Promise<IModalidad>;
	getAllModalidades(): Promise<IModalidad[]>;
	getModalidadById(id: string): Promise<IModalidad | null>;
	updateModalidadById(params: UpdateModalidadParams): Promise<IModalidad>;
	deleteModalidadById(id: string): Promise<IModalidad>;
};
