import type { ICreateVarianteCurso } from "./ICreateVarianteCurso";
import type { IUpdateVarianteCurso } from "./IUpdateVarianteCurso";
import type { IVarianteCurso } from "./IVarianteCurso";
import type { IVarianteCursoWIthProgramas } from "./IVarianteCursoWIthProgramas";
import type { IVarianteCursoWithAsignaturas } from "./IVarianteCursoWithAsignaturas";
import type { IVarianteCursoWithCurso } from "./IVarianteCursoWithCurso";

export type IUpdateVarianteCursoByIdParams = {
	id: string;
	data: IUpdateVarianteCurso;
};

export type ICreateVarianteCursoParams = {
	cursoId: string;
	data: ICreateVarianteCurso;
};

export type IVarianteCursoRepository = {
	create(params: ICreateVarianteCursoParams): Promise<IVarianteCursoWithCurso>;
	getById(id: string): Promise<IVarianteCurso | null>;
	updateById(params: IUpdateVarianteCursoByIdParams): Promise<IVarianteCurso>;
	deleteById(id: string): Promise<IVarianteCurso>;

	withAsignaturasGetById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null>;
	withProgramasGetById(id: string): Promise<IVarianteCursoWIthProgramas | null>;
};
