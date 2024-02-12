import type { IAsignatura } from "./IAsignatura";
import type { UpdateAsignaturaParams } from "./IAsignaturaRepository";
import type { ICreateAsignatura } from "./ICreateAsignatura";

export type IAsignaturaService = {
	createAsignatura(data: ICreateAsignatura): Promise<IAsignatura>;
	getAllAsignaturas(): Promise<IAsignatura[]>;
	getAsignaturaById(id: string): Promise<IAsignatura | null>;
	updateAsignaturaById(params: UpdateAsignaturaParams): Promise<IAsignatura>;
	deleteAsignaturaById(id: string): Promise<IAsignatura>;
};
