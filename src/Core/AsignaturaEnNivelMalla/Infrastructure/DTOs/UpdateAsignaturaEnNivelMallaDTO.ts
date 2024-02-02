import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaEnNivelMalla } from "../../Domain/IUpdateAsignaturaEnNivelMalla";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaEnNivelMalla>>({
	tipoAsignatura: z
		.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const)
		.optional(),
	identificacion: z.string().optional(),
	permiteMatriculacion: z.boolean().optional(),
	calculoNivel: z.boolean().optional(),
	validaParaCredito: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	requeridaParaEgresar: z.boolean().optional(),
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
	horasProyectoIntegrador: z.number().optional(),
	noValidaAsistencia: z.boolean().optional(),
	materiaComun: z.boolean().optional(),
	guiaPracticaMetodologiaObligatoria: z.boolean().optional(),
	aprobarGuiaPracticaMetodologica: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	descripcion: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivoGeneral: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultadosAprendizaje: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	aporteAsignaturaAlPerfil: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	competenciaGenerica: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivosEspecificos: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	observaciones: z.string().nullable().optional(),

	ejeFormativoId: z.string().uuid().optional(),
	areaConocimientoId: z.string().uuid().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	campoFormacionId: z.string().uuid().nullable().optional(),
});

class UpdateAsignaturaEnNivelMallaDTOError extends BaseDTOError<IUpdateAsignaturaEnNivelMalla> {
	constructor(error: z.ZodError<IUpdateAsignaturaEnNivelMalla>) {
		super(error);
		this.name = "UpdateAsignaturaEnNivelMallaDTOError";
		this.message =
			"Error de validacion para actualizar la asignatura en nivel de la malla";
	}
}

export class UpdateAsignaturaEnNivelMallaDTO extends BaseValidatorDTO<
	IUpdateAsignaturaEnNivelMalla,
	UpdateAsignaturaEnNivelMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaEnNivelMallaDTOError, input);
	}
}
