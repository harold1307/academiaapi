import type { IAsignatura } from "./IAsignatura";
import type { ICreateAsignatura } from "./ICreateAsignatura";
import type { IUpdateAsignatura } from "./IUpdateAsignatura";

export interface IAsignaturaRepository {
	create(data: ICreateAsignatura): Promise<IAsignatura>;
	getAll(): Promise<IAsignatura[]>;
	getById(id: string): Promise<IAsignatura | null>;
	update(params: {
		id: string;
		asignatura: IUpdateAsignatura;
	}): Promise<IAsignatura>;
	deleteById(id: string): Promise<IAsignatura>;
}
