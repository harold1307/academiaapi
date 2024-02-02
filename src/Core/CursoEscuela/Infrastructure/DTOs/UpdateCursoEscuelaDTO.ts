import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateCursoEscuela } from "../../Domain/IUpdateCursoEscuela";

const schema = z.object<ZodInferSchema<IUpdateCursoEscuela>>({
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	codigo: z.string().nullable().optional(),
	paraleloId: z.string().uuid().optional(),
	sesionId: z.string().uuid().optional(),
	tema: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	observaciones: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	departamento: z.string().nullable().optional(),
	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
	fechaLimiteRegistro: z.date().optional(),
	diasLimitePago: z.number().optional(),
	nivel: z.number().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	cupos: z.number().nullable().optional(),
	evaluaProfesor: z.boolean().optional(),
	matriculaConDeuda: z.boolean().optional(),
	legalizarMatriculas: z.boolean().optional(),
	registroExterno: z.boolean().optional(),
	registroInterno: z.boolean().optional(),
	verificarSesion: z.boolean().optional(),
	registroDesdeOtraSede: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	edadMinima: z.number().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	edadMaxima: z.number().nullable().optional(),
	costoPorMateria: z.boolean().optional(),
	cumpleRequisitosMalla: z.boolean().optional(),
	pasarRecord: z.boolean().optional(),
	aprobarCursoPrevio: z.boolean().optional(),
});

class UpdateCursoEscuelaDTOError extends BaseDTOError<IUpdateCursoEscuela> {
	constructor(error: z.ZodError<IUpdateCursoEscuela>) {
		super(error);
		this.name = "UpdateCursoEscuelaDTOError";
		this.message = "Error de validacion para crear el curso escuela";
	}
}

export class UpdateCursoEscuelaDTO extends BaseValidatorDTO<
	IUpdateCursoEscuela,
	UpdateCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateCursoEscuelaDTOError, input);
	}
}
