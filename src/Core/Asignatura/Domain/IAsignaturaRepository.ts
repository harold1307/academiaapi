import type { IAsignatura } from "./IAsignatura";
import type { ICreateAsignatura } from "./ICreateAsignatura";
import type { IUpdateAsignatura } from "./IUpdateAsignatura";

export type IUpdateAsignaturaParams = {
	id: string;
	data: IUpdateAsignatura;
};

export interface IAsignaturaRepository {
	create(data: ICreateAsignatura): Promise<IAsignatura>;
	getAll(): Promise<IAsignatura[]>;
	getById(id: string): Promise<IAsignatura | null>;
	update(params: IUpdateAsignaturaParams): Promise<IAsignatura>;
	deleteById(id: string): Promise<IAsignatura>;
}
