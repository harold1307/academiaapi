---
to: src/Core/<%= name %>/Infrastructure/DTOs/Create<%= name %>DTO.ts
---
import { z } from "zod";

import type { ZodInferSchema } from "../../../../types";
import type { ICreate<%= name %> } from "../../Domain/ICreate<%= name %>";

const schema = z.object<ZodInferSchema<ICreate<%= name %>>>({})

export class Create<%= name %>DTO {
  private data: ICreate<%= name %> | undefined;

  constructor(private input: unknown){}

  validate() {
		const parse = schema.safeParse(this.input);

		if (parse.success) {
			this.data = parse.data;
		}

		return parse;
	}
}