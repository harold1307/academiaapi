---
to: src/Core/<%= name %>/Infrastructure/DTOs/Update<%= name %>DTO.ts
---
import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdate<%= name %> } from "../../Domain/IUpdate<%= name %>";

const schema = z.object<ZodInferSchema<IUpdate<%= name %>>>({})

class Update<%= name %>DTOError extends BaseDTOError<IUpdate<%= name %>> {
	constructor(error: z.ZodError<IUpdate<%= name %>>) {
		super(error);
		this.name = "Update<%= name %>DTOError";
		this.message =
			"Error de validacion para actualizar el <%= name %>";
	}
}

export class Update<%= name %>DTO extends BaseValidatorDTO<
	IUpdate<%= name %>,
	Update<%= name %>DTOError
> {
	constructor(input: unknown) {
		super(schema, Update<%= name %>DTOError, input);
	}
}