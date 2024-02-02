import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateVarianteCurso } from "../../Domain/IUpdateVarianteCurso";

const schema = z.object<ZodInferSchema<IUpdateVarianteCurso>>({
	nombre: z.string().optional(),
	codigoBase: z.string().optional(),
	descripcion: z.string().optional(),
	registroExterno: z.boolean().optional(),
	registroInterno: z.boolean().optional(),
	verificarSesion: z.boolean().optional(),
	verificarEdad: z.boolean().optional(),
	//@ts-expect-error el type helper ZodInferSchema no contempla los fields nullables
	edadMinima: z.number().nullable().optional(),
	//@ts-expect-error el type helper ZodInferSchema no contempla los fields nullables
	edadMaxima: z.number().nullable().optional(),
	fechaAprobacion: z.date().optional(),
	registroDesdeOtraSede: z.boolean().optional(),
	costoPorMateria: z.boolean().optional(),
	cumpleRequisitosMalla: z.boolean().optional(),
	pasarRecord: z.boolean().optional(),
	aprobarCursoPrevio: z.boolean().optional(),
	estado: z.boolean().optional(),
});

class UpdateVarianteCursoError extends BaseDTOError<IUpdateVarianteCurso> {
	constructor(error: z.ZodError<IUpdateVarianteCurso>) {
		super(error);
		this.name = "UpdateVarianteCursoError";
		this.message = "Error de validacion para actualizar la variante de curso";
	}
}

export class UpdateVarianteCursoDTO extends BaseValidatorDTO<
	IUpdateVarianteCurso,
	UpdateVarianteCursoError
> {
	constructor(input: unknown) {
		super(schema, UpdateVarianteCursoError, input);
	}
}
