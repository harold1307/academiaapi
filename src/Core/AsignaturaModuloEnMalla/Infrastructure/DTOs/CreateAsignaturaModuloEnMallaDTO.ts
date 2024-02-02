import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAsignaturaModuloEnMalla } from "../../Domain/ICreateAsignaturaModuloEnMalla";

const schema = z
	.object<ZodInferSchema<ICreateAsignaturaModuloEnMalla>>({
		tipoAsignatura: z.enum([
			"PRACTICA",
			"TEORICA",
			"TEORICA_PRACTICA",
		] as const),
		identificacion: z.string(),
		permiteMatriculacion: z.boolean(),
		validaParaCredito: z.boolean(),
		validaParaPromedio: z.boolean(),
		costoEnMatricula: z.boolean(),
		requeridaParaGraduar: z.boolean(),
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
		noValidaAsistencia: z.boolean(),
		materiaGeneral: z.boolean(),
		guiaPracticaMetodologiaObligatoria: z.boolean(),
		aprobarGuiaPracticaMetodologica: z.boolean(),
		competencia: z.string().nullable(),
		objetivosEspecificos: z.string().nullable(),
		descripcion: z.string().nullable(),
		resultados: z.string().nullable(),
		aporteAsignaturaAlPerfil: z.string().nullable(),
		objetivoGeneral: z.string().nullable(),

		asignaturaId: z.string().uuid(),
		areaConocimientoId: z.string().uuid(),
		campoFormacionId: z.string().uuid(),
		mallaId: z.string().uuid(),
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

class CreateAsignaturaModuloEnMallaDTOError extends BaseDTOError<ICreateAsignaturaModuloEnMalla> {
	constructor(error: z.ZodError<ICreateAsignaturaModuloEnMalla>) {
		super(error);
		this.name = "CreateAsignaturaModuloEnMallaDTOError";
		this.message = "Error de validacion para crear el AsignaturaModuloEnMalla";
	}
}

export class CreateAsignaturaModuloEnMallaDTO extends BaseValidatorDTO<
	ICreateAsignaturaModuloEnMalla,
	CreateAsignaturaModuloEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAsignaturaModuloEnMallaDTOError, input);
	}
}
