import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
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
};
