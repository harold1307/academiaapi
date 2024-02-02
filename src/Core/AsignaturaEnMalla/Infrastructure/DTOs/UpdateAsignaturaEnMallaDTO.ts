import { $Enums } from "@prisma/client";
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaEnMalla } from "../../Domain/IUpdateAsignaturaEnMalla";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaEnMalla>>({
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

	ejeFormativoId: z.string().uuid().optional(),
	areaConocimientoId: z.string().uuid().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	campoFormacionId: z.string().uuid().nullable().optional(),
});

class UpdateAsignaturaEnMallaDTOError extends BaseDTOError<IUpdateAsignaturaEnMalla> {
	constructor(error: z.ZodError<IUpdateAsignaturaEnMalla>) {
		super(error);
		this.name = "UpdateAsignaturaEnMallaDTOError";
		this.message = "Error de validacion para actualizar la asignatura en malla";
	}
}

export class UpdateAsignaturaEnMallaDTO extends BaseValidatorDTO<
	IUpdateAsignaturaEnMalla,
	UpdateAsignaturaEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaEnMallaDTOError, input);
	}
}
