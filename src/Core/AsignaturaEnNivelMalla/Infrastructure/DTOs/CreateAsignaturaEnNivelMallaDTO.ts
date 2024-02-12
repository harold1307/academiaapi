import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaEnNivelMalla } from "../../Domain/ICreateAsignaturaEnNivelMalla";

const schema = z
	.object<ZodInferSchema<ICreateAsignaturaEnNivelMalla>>({
		tipoAsignatura: z.enum([
			"PRACTICA",
			"TEORICA",
			"TEORICA_PRACTICA",
		] as const),
		identificacion: z.string(),
		permiteMatriculacion: z.boolean(),
		calculoNivel: z.boolean(),
		validaParaCredito: z.boolean(),
		validaParaPromedio: z.boolean(),
		costoEnMatricula: z.boolean(),
		requeridaParaEgresar: z.boolean(),
		cantidadMatriculas: z.number(),
		cantidadMatriculasAutorizadas: z.number().nullable(),
		minimoCreditosRequeridos: z.number().nullable(),
		maximaCantidadHorasSemanalas: z.number(),
		horasColaborativas: z.number(),
		horasAsistidasDocente: z.number(),
		horasAutonomas: z.number(),
		horasPracticas: z.number(),
		sumaHoras: z.boolean(),
		creditos: z.number(),
		horasProyectoIntegrador: z.number(),
		noValidaAsistencia: z.boolean(),
		materiaComun: z.boolean(),
		guiaPracticaMetodologiaObligatoria: z.boolean(),
		aprobarGuiaPracticaMetodologica: z.boolean(),
		descripcion: z.string().nullable(),
		objetivoGeneral: z.string().nullable(),
		resultadosAprendizaje: z.string().nullable(),
		aporteAsignaturaAlPerfil: z.string().nullable(),
		competenciaGenerica: z.string().nullable(),
		objetivosEspecificos: z.string().nullable(),
		observaciones: z.string().nullable(),

		ejeFormativoId: z.string().uuid(),
		nivelMallaId: z.string().uuid(),
		asignaturaId: z.string().uuid(),
		areaConocimientoId: z.string().uuid(),
		campoFormacionId: z.string().uuid().nullable(),
	})
	.superRefine(
		(
			{ guiaPracticaMetodologiaObligatoria, aprobarGuiaPracticaMetodologica },
			ctx,
		) => {
			if (
				!guiaPracticaMetodologiaObligatoria &&
				aprobarGuiaPracticaMetodologica
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"No se puede aprobar la guia practica o metodologica si no se requiere la guia",
					path: ["guiaPracticaMetodologiaObligatoria"],
				});
			}
		},
	);

class CreateAsignaturaEnNivelMallaDTOError extends BaseDTOError<ICreateAsignaturaEnNivelMalla> {
	constructor(error: z.ZodError<ICreateAsignaturaEnNivelMalla>) {
		super(error);
		this.name = "CreateAsignaturaEnNivelMallaDTOError";
		this.message =
			"Error de validacion para crear la asignatura en nivel de la malla";
	}
}

export class CreateAsignaturaEnNivelMallaDTO extends BaseValidatorDTO<
	ICreateAsignaturaEnNivelMalla,
	CreateAsignaturaEnNivelMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaEnNivelMallaDTOError, input);
	}
}
