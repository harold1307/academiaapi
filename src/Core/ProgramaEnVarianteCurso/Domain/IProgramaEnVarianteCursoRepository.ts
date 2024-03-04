import type { IProgramaEnVarianteCurso } from "./IProgramaEnVarianteCurso"
import type { ICreateProgramaEnVarianteCurso } from "./ICreateProgramaEnVarianteCurso"
import type { IUpdateProgramaEnVarianteCurso } from "./IUpdateProgramaEnVarianteCurso";

export type UpdateProgramaEnVarianteCursoParams = {
	id: string;
	data: IUpdateProgramaEnVarianteCurso;
}

export type IProgramaEnVarianteCursoRepository = {
  create(data: ICreateProgramaEnVarianteCurso): Promise<IProgramaEnVarianteCurso>;
	// getAll(): Promise<IProgramaEnVarianteCurso[]>;
	getById(id: string): Promise<IProgramaEnVarianteCurso | null>;
	update(params: UpdateProgramaEnVarianteCursoParams): Promise<IProgramaEnVarianteCurso>;
	deleteById(id: string): Promise<IProgramaEnVarianteCurso>;
}