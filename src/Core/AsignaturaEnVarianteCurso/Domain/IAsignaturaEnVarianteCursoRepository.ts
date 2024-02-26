import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
import type { ICreateAsignaturaEnVarianteCurso } from "./ICreateAsignaturaEnVarianteCurso";
import type { IUpdateAsignaturaEnVarianteCurso } from "./IUpdateAsignaturaEnVarianteCurso";

export type UpdateAsignaturaEnVarianteCursoParams = {
	id: string;
	data: IUpdateAsignaturaEnVarianteCurso;
};

export type IAsignaturaEnVarianteCursoRepository = {
	create(
		data: ICreateAsignaturaEnVarianteCurso,
	): Promise<IAsignaturaEnVarianteCurso>;
	// getAll(): Promise<IAsignaturaEnVarianteCurso[]>;
	getById(id: string): Promise<IAsignaturaEnVarianteCurso | null>;
	update(
		params: UpdateAsignaturaEnVarianteCursoParams,
	): Promise<IAsignaturaEnVarianteCurso>;
	deleteById(id: string): Promise<IAsignaturaEnVarianteCurso>;
};
