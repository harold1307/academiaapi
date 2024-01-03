import type { IAsignatura, IAsignaturaWithIsUsed } from "./IAsignatura";

export interface IAsignaturaService {
	createAsignatura(data: any): Promise<IAsignatura>;
	getAllAsignaturas(): Promise<IAsignaturaWithIsUsed[]>;
	getAsignaturaById(id: string): Promise<IAsignatura | null>;
	updateAsignaturaById(params: {
		id: string;
		asignatura: any;
	}): Promise<IAsignatura>;
	deleteAsignaturaById(id: string): Promise<IAsignatura>;
}
