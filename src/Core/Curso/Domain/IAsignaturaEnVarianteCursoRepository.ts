import type { IAsignaturaEnVarianteCurso } from "./IAsignaturaEnVarianteCurso";
import type { ICreateAsignaturaEnVarianteCurso } from "./ICreateAsignaturaEnVarianteCurso";

export type IAsignaturaEnVarianteCursoRepository = {
	create(
		data: ICreateAsignaturaEnVarianteCurso,
	): Promise<IAsignaturaEnVarianteCurso>;
	// getAll(): Promise<IAsignaturaEnVarianteCurso[]>;
	// getById(id: string): Promise<IAsignaturaEnVarianteCurso | null>;
	// update(params: {
	// 	id: string;
	// 	curso: IUpdateCurso;
	// }): Promise<IAsignaturaEnVarianteCurso>;
	// deleteById(id: string): Promise<IAsignaturaEnVarianteCurso>;
};
