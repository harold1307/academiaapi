import type { ICompetencia } from "./ICompetencia";
import type { ICreateCompetencia } from "./ICreateCompetencia";
// import type { IUpdateCompetencia } from "./IUpdateCompetencia";

export type ICompetenciaRepository = {
	create(data: ICreateCompetencia): Promise<ICompetencia>;
	getAll(): Promise<ICompetencia[]>;
	getById(id: string): Promise<ICompetencia | null>;
	// update(params: {
	// 	id: string;
	// 	competencia: IUpdateCompetencia;
	// }): Promise<ICompetencia>;
	deleteById(id: string): Promise<ICompetencia>;
};
