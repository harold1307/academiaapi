import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
import type { UpdateAsignaturaEnVarianteCursoParams } from "./IAsignaturaEnVarianteCursoRepository";
import type { ICreateAsignaturaEnVarianteCurso } from "./ICreateAsignaturaEnVarianteCurso";

export type ICreateAsignaturaEnVarianteCursoParams = {
	asignaturaId: string;
	varianteCursoId: string;
	data: Omit<
		ICreateAsignaturaEnVarianteCurso,
		"asignaturaId" | "varianteCursoId"
	>;
};

export type IAsignaturaEnVarianteCursoService = {
	createAsignaturaEnVarianteCurso(
		params: ICreateAsignaturaEnVarianteCursoParams,
	): Promise<IAsignaturaEnVarianteCurso>;
	updateAsignaturaEnVarianteCursoById(
		params: UpdateAsignaturaEnVarianteCursoParams,
	): Promise<IAsignaturaEnVarianteCurso>;
	deleteAsignaturaEnVarianteCursoById(
		id: string,
	): Promise<IAsignaturaEnVarianteCurso>;
	getAsignaturaEnVarianteCursoById(
		id: string,
	): Promise<IAsignaturaEnVarianteCurso | null>;
};
