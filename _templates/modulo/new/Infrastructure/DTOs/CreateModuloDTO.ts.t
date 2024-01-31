---
to: src/Core/<%= name %>/Infrastructure/DTOs/Create<%= name %>DTO.ts
---
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreate<%= name %> } from "../../Domain/ICreate<%= name %>";

const schema = z.object<ZodInferSchema<ICreate<%= name %>>>({})

class Create<%= name %>DTOError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super();

		this.name = "Create<%= name %>DTOError";
		this.message =
			"Error de validacion para crear el <%= name %>";
		this.issues = issues;
	}
}

export class Create<%= name %>DTO {
  private data: ICreate<%= name %>

  constructor(private input: unknown) {
		const parse = schema.safeParse(this.input);

		if (!parse.success) {
			throw new Create<%= name %>DTOError(parse.error.issues);
		}

		this.data = parse.data;
	}

	getData() {
		return this.data;
	}
}