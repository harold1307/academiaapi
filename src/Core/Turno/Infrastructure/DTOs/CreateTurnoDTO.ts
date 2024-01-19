import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreateTurno } from "../../Domain/ICreateTurno";

const schema = z.object<ZodInferSchema<ICreateTurno>>({
	nombre: z.string(),
	horas: z.number().int(),
	comienza: z.date(),
	termina: z.date(),
	sesionId: z.string(),
});

export class CreateTurnoDTO {
	private data: ICreateTurno | undefined;

	constructor(private input: unknown) {}

	validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}
