import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateNivelAcademico } from "../../Domain/ICreateNivelAcademico";

const schema = z
	.object<ZodInferSchema<ICreateNivelAcademico>>({
		nombre: z.string().nullable(),
		fechaInicio: z.date(),
		fechaFin: z.date(),
		inicioAgregaciones: z.date(),
		limiteAgregaciones: z.date(),
		validaRequisitosMalla: z.boolean(),
		validaCumplimientoMaterias: z.boolean(),
		horasMinimasPracticasComunitarias: z.number().nullable(),
		horasMinimasPracticasPreprofesionales: z.number().nullable(),
		estudiantesPuedenSeleccionarMaterias: z.boolean(),
		estudiantesPuedenSeleccionarMateriasOtrosHorarios: z.boolean(),
		estudiantesPuedenSeleccionarMateriasOtrasModalidades: z.boolean(),
		estudiantesRegistranProyectosIntegradores: z.boolean(),
		redireccionAPagos: z.boolean(),
		limiteOrdinaria: z.date(),
		limiteExtraordinaria: z.date(),
		limiteEspecial: z.date(),
		diasVencimientoMatricula: z.number(),
		capacidad: z.number().int().min(0),
		mensaje: z.string().nullable(),
		terminosCondiciones: z.string().nullable(),

		paraleloId: z.string(),
		modeloEvaluativoId: z.string().uuid(),
		sesionId: z.string().uuid(),
		nivelMallaId: z.string().uuid(),
	})
	.superRefine(
		(
			{
				estudiantesPuedenSeleccionarMaterias,
				estudiantesPuedenSeleccionarMateriasOtrasModalidades,
				estudiantesPuedenSeleccionarMateriasOtrosHorarios,
			},
			ctx,
		) => {
			if (
				(estudiantesPuedenSeleccionarMateriasOtrasModalidades ||
					estudiantesPuedenSeleccionarMateriasOtrosHorarios) &&
				!estudiantesPuedenSeleccionarMaterias
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Si el estudiante no puede seleccionar materias, entonces este no puede seleccionarlas de otras modalidades u horarios",
					path: [
						"estudiantesPuedenSeleccionarMateriasOtrasModalidades",
						"estudiantesPuedenSeleccionarMateriasOtrosHorarios",
					],
				});
			}
		},
	);

class CreateNivelAcademicoDTOError extends BaseDTOError<ICreateNivelAcademico> {
	constructor(error: z.ZodError<ICreateNivelAcademico>) {
		super(error);
		this.name = "CreateNivelAcademicoDTOError";
		this.message = "Error de validacion para crear el nivel academico";
	}
}

export class CreateNivelAcademicoDTO extends BaseValidatorDTO<
	ICreateNivelAcademico,
	CreateNivelAcademicoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateNivelAcademicoDTOError, input);
	}
}
