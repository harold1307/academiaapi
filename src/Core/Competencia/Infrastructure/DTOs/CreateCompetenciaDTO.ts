import { $Enums } from "@prisma/client";
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateCompetencia } from "../../Domain/ICreateCompetencia";

const schema = z.object<ZodInferSchema<ICreateCompetencia>>({
	tipo: z.nativeEnum($Enums.TipoCompetencia),
	nombre: z.string(),
	asignaturaEnMallaId: z.string().nullable(),
});

export class CreateCompetenciaDTO {
	private competencia: ICreateCompetencia | undefined;

	constructor(private input: any) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.competencia = parse.data;
		}

		return parse;
	}
}
