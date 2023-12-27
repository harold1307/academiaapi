import type { IAsignatura } from "./IAsignatura";

export interface IAsignaturaService {
	createAsignatura(data: any): Promise<IAsignatura>;
	getAllAsignaturas(): Promise<IAsignatura[]>;
	getAsignaturaById(id: string): Promise<IAsignatura | null>;
	updateAsignaturaById(params: {
		id: string;
		asignatura: any;
	}): Promise<IAsignatura>;
	deleteAsignaturaById(id: string): Promise<IAsignatura>;
}
