import type { IProgramaEnVarianteCurso } from "./IProgramaEnVarianteCurso"
import type { ICreateProgramaEnVarianteCurso } from "./ICreateProgramaEnVarianteCurso"
import type { UpdateProgramaEnVarianteCursoParams } from "./IProgramaEnVarianteCursoRepository";

export type IProgramaEnVarianteCursoService = {
  createProgramaEnVarianteCurso(data: ICreateProgramaEnVarianteCurso): Promise<IProgramaEnVarianteCurso>;
	// getAllProgramaEnVarianteCursos(): Promise<IProgramaEnVarianteCurso[]>;
	getProgramaEnVarianteCursoById(id: string): Promise<IProgramaEnVarianteCurso | null>;
	updateProgramaEnVarianteCursoById(params: UpdateProgramaEnVarianteCursoParams): Promise<IProgramaEnVarianteCurso>;
	deleteProgramaEnVarianteCursoById(id: string): Promise<IProgramaEnVarianteCurso>;
}