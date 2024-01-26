import type { IAsignatura } from "./IAsignatura";
import type { IUpdateAsignaturaParams } from "./IAsignaturaRepository";
import type { ICreateAsignatura } from "./ICreateAsignatura";

export interface IAsignaturaService {
	createAsignatura(data: ICreateAsignatura): Promise<IAsignatura>;
	getAllAsignaturas(): Promise<IAsignatura[]>;
	getAsignaturaById(id: string): Promise<IAsignatura | null>;
	updateAsignaturaById(params: IUpdateAsignaturaParams): Promise<IAsignatura>;
	deleteAsignaturaById(id: string): Promise<IAsignatura>;
}
