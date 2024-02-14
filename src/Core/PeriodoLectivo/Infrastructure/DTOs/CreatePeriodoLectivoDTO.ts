import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreatePeriodoLectivo } from "../../Domain/ICreatePeriodoLectivo";

const schema = z
	.object<ZodInferSchema<ICreatePeriodoLectivo>>({
		nombre: z.string().min(1),
		inicio: z.date(),
		fin: z.date(),
		tipo: z.enum(["GRADO", "POSGRADO"] as const),

		limiteMatriculaOrdinaria: z.date().nullable(),
		limiteMatriculaExtraordinaria: z.date().nullable(),
		limiteMatriculaEspecial: z.date().nullable(),
		automatriculaAlumnosFechaExtraordinaria: z.boolean().nullable(),

		estudianteSeleccionaParaleloAutomatricula: z.boolean().nullable(),
		seImpartioNivelacion: z.boolean(),
		planificacionCargaHoraria: z.boolean(),

		planificacionProfesoresFormaTotal: z.boolean().nullable(),
		aprobacionPlanificacionProfesores: z.boolean().nullable(),

		legalizacionAutomaticaContraPagos: z.boolean().nullable(),
		numeroSecuencia: z.number().nullable(),
		corteId: z.string().uuid().nullable(),

		cronogramaNotasCoordinacion: z.boolean(),
		puedenAutomatricularseSegundasOMasMatriculas: z.boolean(),
		puedenMatricularseArrastre: z.boolean(),

		numeroMatriculaAutomatico: z.boolean().nullable(),
		numeroMatricularAlLegalizar: z.boolean().nullable(),
	})
	.superRefine(
		(
			{
				limiteMatriculaEspecial,
				limiteMatriculaExtraordinaria,
				limiteMatriculaOrdinaria,
				automatriculaAlumnosFechaExtraordinaria,
				planificacionProfesoresFormaTotal,
				aprobacionPlanificacionProfesores,
				numeroMatriculaAutomatico,
				numeroMatricularAlLegalizar,
			},
			ctx,
		) => {
			const fechasMatriculas = [
				limiteMatriculaEspecial,
				limiteMatriculaExtraordinaria,
				limiteMatriculaOrdinaria,
				automatriculaAlumnosFechaExtraordinaria,
			];

			const fechasMatriculasNull = fechasMatriculas.filter(
				(field): field is null => field === null,
			);

			if (
				fechasMatriculasNull.length !== 4 &&
				fechasMatriculasNull.length !== 0
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si se usa fecha en matriculas, los campos respectivos son requeridos de lo contrario todos null.",
					path: [
						"limiteMatriculaEspecial",
						"limiteMatriculaExtraordinaria",
						"limiteMatriculaOrdinaria",
						"automatriculaAlumnosFechaExtraordinaria",
					],
				});

				return;
			}

			const planificacionObligatoria = [
				planificacionProfesoresFormaTotal,
				aprobacionPlanificacionProfesores,
			];

			const planificacionObligatoriaNull = planificacionObligatoria.filter(
				(field): field is null => field === null,
			);

			if (
				planificacionObligatoriaNull.length !== 2 &&
				planificacionObligatoriaNull.length !== 0
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si se usa planificacion obligatoria, los campos respectivos son requeridos de lo contrario todos null.",
					path: [
						"planificacionProfesoresFormaTotal",
						"aprobacionPlanificacionProfesores",
					],
				});

				return;
			}

			const numeroMatricula = [
				numeroMatriculaAutomatico,
				numeroMatricularAlLegalizar,
			];

			const numeroMatriculaNull = numeroMatricula.filter(
				(field): field is null => field === null,
			);

			if (
				numeroMatriculaNull.length !== 2 &&
				numeroMatriculaNull.length !== 0
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si se usa numero de matricula, los campos respectivos son requeridos de lo contrario todos null.",
					path: ["numeroMatriculaAutomatico", "numeroMatricularAlLegalizar"],
				});

				return;
			}
		},
	);

class CreatePeriodoLectivoDTOError extends BaseDTOError<ICreatePeriodoLectivo> {
	constructor(error: z.ZodError<ICreatePeriodoLectivo>) {
		super(error);
		this.name = "CreatePeriodoLectivoDTOError";
		this.message = "Error de validacion para crear el periodo lectivo";
	}
}

export class CreatePeriodoLectivoDTO extends BaseValidatorDTO<
	ICreatePeriodoLectivo,
	CreatePeriodoLectivoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreatePeriodoLectivoDTOError, input);
	}
}
