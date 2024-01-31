---
to: src/Core/<%= name %>/Infrastructure/DTOs/Update<%= name %>DTO.ts
---
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { IUpdate<%= name %> } from "../../Domain/IUpdate<%= name %>";

const schema = z.object<ZodInferSchema<IUpdate<%= name %>>>({})

class Update<%= name %>DTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "Update<%= name %>DTOError";
		this.message =
			"Error de validacion para actualizar el <%= name %>";
		this.issues = issues;
	}
}

export class Update<%= name %>DTO {
  private data: IUpdate<%= name %> | undefined;

  constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new Update<%= name %>DTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}