import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateCursoEscuela } from "../../Domain/ICreateCursoEscuela";

const schema = z.object<ZodInferSchema<ICreateCursoEscuela>>({
	nombre: z.string(),
	codigo: z.string().nullable(),
	paraleloId: z.string().uuid(),
	sesionId: z.string().uuid(),
	tema: z.string(),
	observaciones: z.string().nullable(),
	departamento: z.string().nullable(),
	fechaInicio: z.date(),
	fechaFin: z.date(),
	fechaLimiteRegistro: z.date(),
	diasLimitePago: z.number(),
	nivel: z.number(),
	cupos: z.number().nullable(),
	evaluaProfesor: z.boolean(),
	matriculaConDeuda: z.boolean(),
	legalizarMatriculas: z.boolean(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificaSesion: z.boolean(),
	registroDesdeOtraSede: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	plantillaId: z.string().uuid().nullable(),
});

class CreateCursoEscuelaDTOError extends BaseDTOError<ICreateCursoEscuela> {
	constructor(error: z.ZodError<ICreateCursoEscuela>) {
		super(error);
		this.name = "CreateCursoEscuelaDTOError";
		this.message = "Error de validacion para crear el curso escuela";
	}
}

export class CreateCursoEscuelaDTO extends BaseValidatorDTO<
	ICreateCursoEscuela,
	CreateCursoEscuelaDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateCursoEscuelaDTOError, input);
	}
}
