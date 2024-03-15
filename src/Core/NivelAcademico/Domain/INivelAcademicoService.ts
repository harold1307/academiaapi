import type { ICreateNivelAcademico } from "./ICreateNivelAcademico";
import type { INivelAcademico } from "./INivelAcademico";
import type { UpdateNivelAcademicoParams } from "./INivelAcademicoRepository";
import type { INivelAcademicoWithMaterias } from "./INivelAcademicoWithMaterias";

export type GetAllNivelesAcademicosParams = {
	filters?: Record<string, string | undefined>;
};

export type INivelAcademicoService = {
	createNivelAcademico(data: ICreateNivelAcademico): Promise<INivelAcademico>;
	getAllNivelesAcademicos(
		params?: GetAllNivelesAcademicosParams,
	): Promise<INivelAcademico[]>;
	getNivelAcademicoById(id: string): Promise<INivelAcademico | null>;
	getNivelAcademicoByIdWithMaterias(
		id: string,
	): Promise<INivelAcademicoWithMaterias | null>;
	updateNivelAcademicoById(
		params: UpdateNivelAcademicoParams,
	): Promise<INivelAcademico>;
	deleteNivelAcademicoById(id: string): Promise<INivelAcademico>;
};
