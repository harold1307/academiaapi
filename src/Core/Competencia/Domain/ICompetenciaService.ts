import type { ICompetencia } from "./ICompetencia";

export interface ICompetenciaService {
	// createAsignatura(data: any): Promise<ICompetencia>;
	// getAllAsignaturas(): Promise<ICompetencia[]>;
	// getAsignaturaById(id: string): Promise<ICompetencia | null>;
	// updateAsignaturaById(params: {
	// 	id: string;
	// 	asignatura: any;
	// }): Promise<ICompetencia>;
	// deleteAsignaturaById(id: string): Promise<ICompetencia>;
	createCompetenciaForAsignaturaEnMalla(
		data: any,
		asignaturaEnMallaId: string,
	): Promise<ICompetencia>;
}
