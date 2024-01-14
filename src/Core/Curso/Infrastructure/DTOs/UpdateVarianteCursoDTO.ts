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

export class UpdateVarianteCursoDTO {
	private data: IUpdateVarianteCurso | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
