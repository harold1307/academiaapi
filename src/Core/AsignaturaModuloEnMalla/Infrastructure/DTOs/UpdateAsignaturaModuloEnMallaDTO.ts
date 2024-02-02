import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaModuloEnMalla } from "../../Domain/IUpdateAsignaturaModuloEnMalla";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaModuloEnMalla>>({
	tipoAsignatura: z
		.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const)
		.optional(),
	identificacion: z.string().optional(),
	permiteMatriculacion: z.boolean().optional(),
	validaParaCredito: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	requeridaParaGraduar: z.boolean().optional(),
	cantidadMatriculas: z.number().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	cantidadMatriculasAutorizadas: z.number().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	minimoCreditosRequeridos: z.number().nullable().optional(),
	maximaCantidadHorasSemanalas: z.number().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	noValidaAsistencia: z.boolean().optional(),
	materiaGeneral: z.boolean().optional(),
	guiaPracticaMetodologiaObligatoria: z.boolean().optional(),
	aprobarGuiaPracticaMetodologica: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	competencia: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivosEspecificos: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	descripcion: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultados: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	aporteAsignaturaAlPerfil: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivoGeneral: z.string().nullable().optional(),

	areaConocimientoId: z.string().uuid().optional(),
	campoFormacionId: z.string().uuid().optional(),
});

class UpdateAsignaturaModuloEnMallaDTOError extends BaseDTOError<IUpdateAsignaturaModuloEnMalla> {
	constructor(error: z.ZodError<IUpdateAsignaturaModuloEnMalla>) {
		super(error);
		this.name = "UpdateAsignaturaModuloEnMallaDTOError";
		this.message =
			"Error de validacion para actualizar el AsignaturaModuloEnMalla";
	}
}

export class UpdateAsignaturaModuloEnMallaDTO extends BaseValidatorDTO<
	IUpdateAsignaturaModuloEnMalla,
	UpdateAsignaturaModuloEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaModuloEnMallaDTOError, input);
	}
}
