import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaEnVarianteCurso } from "../../Domain/IUpdateAsignaturaEnVarianteCurso";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaEnVarianteCurso>>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),

	asignaturaId: z.string().uuid().optional(),
	modeloEvaluativoId: z.string().uuid().nullable().optional(),

	asistenciaAprobar: z.number().nullable().optional(),
	cantidadDecimales: z.number().int().nullable().optional(),
	notaMaxima: z.number().nullable().optional(),
	notaMinima: z.number().nullable().optional(),
});

class UpdateAsignaturaEnVarianteCursoDTOError extends BaseDTOError<IUpdateAsignaturaEnVarianteCurso> {
	constructor(error: z.ZodError<IUpdateAsignaturaEnVarianteCurso>) {
		super(error);
		this.name = "UpdateAsignaturaEnVarianteCursoDTOError";
		this.message =
			"Error de validacion para actualizar la asignatura en la variante de curso";
	}
}

export class UpdateAsignaturaEnVarianteCursoDTO extends BaseValidatorDTO<
	IUpdateAsignaturaEnVarianteCurso,
	UpdateAsignaturaEnVarianteCursoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaEnVarianteCursoDTOError, input);
	}
}
