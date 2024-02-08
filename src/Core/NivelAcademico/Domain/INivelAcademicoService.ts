import type { INivelAcademico } from "./INivelAcademico";
import type { ICreateNivelAcademico } from "./ICreateNivelAcademico";
import type { UpdateNivelAcademicoParams } from "./INivelAcademicoRepository";

export type INivelAcademicoService = {
	createNivelAcademico(data: ICreateNivelAcademico): Promise<INivelAcademico>;
	getAllNivelAcademicos(): Promise<INivelAcademico[]>;
	getNivelAcademicoById(id: string): Promise<INivelAcademico | null>;
	updateNivelAcademicoById(
		params: UpdateNivelAcademicoParams,
	): Promise<INivelAcademico>;
	deleteNivelAcademicoById(id: string): Promise<INivelAcademico>;
};
