import { z } from "zod";

import type { ICreateVarianteCurso } from "../../Domain/ICreateVarianteCurso";
import type { ZodInferSchema } from "../../../../types";

const schema = z.object<ZodInferSchema<ICreateVarianteCurso>>({
	nombre: z.string(),
	codigoBase: z.string(),
	descripcion: z.string(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificarSesion: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	fechaAprobacion: z.string().datetime(),
	registroDesdeOtraSede: z.boolean(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	aprobarCursoPrevio: z.boolean(),
});

class CreateVarianteCursoError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "CreateVarianteCursoError";
		this.message = "Error de validacion para crear la variante de curso";
		this.issues = issues;
	}
}

export class CreateVarianteCursoDTO {
	private data: ICreateVarianteCurso;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new CreateVarianteCursoError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
