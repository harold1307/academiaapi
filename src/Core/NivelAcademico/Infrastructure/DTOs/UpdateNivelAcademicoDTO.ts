import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateNivelAcademico } from "../../Domain/IUpdateNivelAcademico";

const schema = z.object<ZodInferSchema<IUpdateNivelAcademico>>({
	nombre: z.string().nullable().optional(),
	estado: z.boolean().optional(),
	profesores: z.boolean().optional(),
	horarios: z.boolean().optional(),
	cuposMaterias: z.boolean().optional(),
	planificacionProfesores: z.boolean().optional(),
	matriculacion: z.boolean().optional(),

	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
	inicioAgregaciones: z.date().optional(),
	limiteAgregaciones: z.date().optional(),
	validaRequisitosMalla: z.boolean().optional(),
	validaCumplimientoMaterias: z.boolean().optional(),
	horasMinimasPracticasComunitarias: z.number().nullable().optional(),
	horasMinimasPracticasPreprofesionales: z.number().nullable().optional(),
	estudiantesPuedenSeleccionarMaterias: z.boolean().optional(),
	estudiantesPuedenSeleccionarMateriasOtrosHorarios: z.boolean().optional(),
	estudiantesPuedenSeleccionarMateriasOtrasModalidades: z.boolean().optional(),
	estudiantesRegistranProyectosIntegradores: z.boolean().optional(),
	redireccionAPagos: z.boolean().optional(),
	limiteOrdinaria: z.date().optional(),
	limiteExtraordinaria: z.date().optional(),
	limiteEspecial: z.date().optional(),
	diasVencimientoMatricula: z.number().optional(),
	capacidad: z.number().optional(),
	mensaje: z.string().nullable().optional(),
	terminosCondiciones: z.string().nullable().optional(),

	paraleloId: z.string().optional(),
	modeloEvaluativoId: z.string().uuid().optional(),
});

class UpdateNivelAcademicoDTOError extends BaseDTOError<IUpdateNivelAcademico> {
	constructor(error: z.ZodError<IUpdateNivelAcademico>) {
		super(error);
		this.name = "UpdateNivelAcademicoDTOError";
		this.message = "Error de validacion para actualizar el nivel academico";
	}
}

export class UpdateNivelAcademicoDTO extends BaseValidatorDTO<
	IUpdateNivelAcademico,
	UpdateNivelAcademicoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateNivelAcademicoDTOError, input);
	}
}
