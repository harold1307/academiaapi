import { $Enums } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAnexoAsignaturaEnMalla } from "../../Domain/IUpdateAnexoAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<IUpdateAnexoAsignaturaEnMalla>>({
	tipoAsignatura: z.nativeEnum($Enums.TipoAsignatura).optional(),
	identificacion: z.string().optional(),

	permiteMatriculacion: z.boolean().optional(),
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	practicasPreProfesionales: z.boolean().optional(),
	requeridaEgreso: z.boolean().optional(),

	cantidadMatriculas: z.number().optional(),
	horasSemanales: z.number().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),

	noValidaAsistencia: z.boolean().optional(),
	materiaComun: z.boolean().optional(),

	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivos: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	descripcion: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultadosAprendizaje: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	competenciaGenerica: z.string().nullable().optional(),

	areaConocimientoId: z.string().uuid().optional(),
	campoFormacionId: z.string().uuid().optional(),
});

class UpdateAnexoAsignaturaEnMallaDTOError extends BaseDTOError<IUpdateAnexoAsignaturaEnMalla> {
	constructor(error: z.ZodError<IUpdateAnexoAsignaturaEnMalla>) {
		super(error);
		this.name = "UpdateAnexoAsignaturaEnMallaDTOError";
		this.message =
			"Error de validacion para actualizar la asignatura anexo a la malla";
	}
}

export class UpdateAnexoAsignaturaEnMallaDTO extends BaseValidatorDTO<
	IUpdateAnexoAsignaturaEnMalla,
	UpdateAnexoAsignaturaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAnexoAsignaturaEnMallaDTOError, input);
	}
}
