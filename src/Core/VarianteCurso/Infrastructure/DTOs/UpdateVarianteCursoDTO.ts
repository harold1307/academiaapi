import { z } from "zod";

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
	fechaAprobacion: z.string().datetime().optional(),
	registroDesdeOtraSede: z.boolean().optional(),
	costoPorMateria: z.boolean().optional(),
	cumpleRequisitosMalla: z.boolean().optional(),
	pasarRecord: z.boolean().optional(),
	aprobarCursoPrevio: z.boolean().optional(),
	estado: z.boolean().optional(),
	//@ts-expect-error el type helper ZodInferSchema no contempla los fields nullables
	cursoId: z.string().nullable().optional(),
});

class UpdateVarianteCursoError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "UpdateVarianteCursoError";
		this.message = "Error de validacion para actualizar la variante de curso";
		this.issues = issues;
	}
}

export class UpdateVarianteCursoDTO {
	private data: IUpdateVarianteCurso;

	constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new UpdateVarianteCursoError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
