import type { IVarianteCurso } from "./IVarianteCurso";

export type ICreateVarianteCurso = Omit<
	IVarianteCurso,
	"cursoId" | "id" | "fechaAprobacion"
> & {
	fechaAprobacion: string;
};
