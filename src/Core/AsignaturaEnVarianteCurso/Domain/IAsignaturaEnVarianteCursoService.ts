import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";

export type ICreateAsignaturaEnVarianteCursoParams = {
	asignaturaId: string;
	varianteCursoId: string;
	data: object;
};

export type IAsignaturaEnVarianteCursoService = {
	createAsignaturaEnVarianteCurso(
		params: ICreateAsignaturaEnVarianteCursoParams,
	): Promise<IAsignaturaEnVarianteCurso>;
};
