import type { IMateriaEnNivelAcademico } from "./IMateriaEnNivelAcademico";
import type { ICreateMateriaEnNivelAcademico } from "./ICreateMateriaEnNivelAcademico";
import type { UpdateMateriaEnNivelAcademicoParams } from "./IMateriaEnNivelAcademicoRepository";

export type IMateriaEnNivelAcademicoService = {
	createMateriasEnNivelAcademico(
		data: ICreateMateriaEnNivelAcademico,
	): Promise<number>;
	getAllMateriaEnNivelAcademicos(): Promise<IMateriaEnNivelAcademico[]>;
	getMateriaEnNivelAcademicoById(
		id: string,
	): Promise<IMateriaEnNivelAcademico | null>;
	updateMateriaEnNivelAcademicoById(
		params: UpdateMateriaEnNivelAcademicoParams,
	): Promise<IMateriaEnNivelAcademico>;
	deleteMateriaEnNivelAcademicoById(
		id: string,
	): Promise<IMateriaEnNivelAcademico>;
};
