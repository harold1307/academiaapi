import type { IAsignatura } from "./IAsignatura";
import type { ICreateAsignatura } from "./ICreateAsignatura";
import type { IUpdateAsignatura } from "./IUpdateAsignatura";

export type UpdateAsignaturaParams = {
	id: string;
	data: IUpdateAsignatura;
};

export type IAsignaturaRepository = {
	create(data: ICreateAsignatura): Promise<IAsignatura>;
	getAll(): Promise<IAsignatura[]>;
	getById(id: string): Promise<IAsignatura | null>;
	update(params: UpdateAsignaturaParams): Promise<IAsignatura>;
	deleteById(id: string): Promise<IAsignatura>;
};
