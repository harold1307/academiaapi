---
to: src/Core/<%= name %>/Application/Controller.ts
---
import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { I<%= name %>Controller } from "../Domain/I<%= name %>Controller";
import type { I<%= name %>Service } from "../Domain/I<%= name %>Service";
import { <%= name %>Service } from "./Service";

export class <%= name %>Controller implements I<%= name %>Controller {
	private <%= h.inflection.camelize(name, true) %>Service: I<%= name %>Service;

	constructor() {
		this.<%= h.inflection.camelize(name, true) %>Service = StartupBuilder.resolve(
			<%= name %>Service,
		);
	}
}