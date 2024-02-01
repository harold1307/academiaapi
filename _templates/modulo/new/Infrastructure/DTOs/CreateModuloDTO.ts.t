---
to: src/Core/<%= name %>/Infrastructure/DTOs/Create<%= name %>DTO.ts
---
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreate<%= name %> } from "../../Domain/ICreate<%= name %>";

const schema = z.object<ZodInferSchema<ICreate<%= name %>>>({})

class Create<%= name %>DTOError extends BaseDTOError<ICreate<%= name %>> {
	constructor(error: z.ZodError<ICreate<%= name %>>) {
		super(error);
		this.name = "Create<%= name %>DTOError";
		this.message =
			"Error de validacion para crear el <%= name %>";
	}
}

export class Create<%= name %>DTO extends BaseValidatorDTO<
	ICreate<%= name %>,
	Create<%= name %>DTOError
> {
	constructor(input: unknown) {
		super(schema, Create<%= name %>DTOError, input);
	}
}
