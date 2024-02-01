import type { z } from "zod";

export class BaseDTOError<T> extends Error {
	constructor(public error: z.ZodError<T>) {
		super();
	}
}

export class BaseValidatorDTO<T, Err extends BaseDTOError<T>> {
	private data: T;
	constructor(
		schema: z.ZodSchema,
		Err: new (error: z.ZodError<T>) => Err,
		private input: unknown,
	) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new Err(parse.error);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}
