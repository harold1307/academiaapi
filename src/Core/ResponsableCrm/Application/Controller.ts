import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IResponsableCrmController } from "../Domain/IResponsableCrmController";
import type { IResponsableCrmService } from "../Domain/IResponsableCrmService";
import type { IUpdateResponsableCrm } from "../Domain/IUpdateResponsableCrm";
import { ResponsableCrmService } from "./Service";

export class ResponsableCrmController implements IResponsableCrmController {
	private _responsableCrmService: IResponsableCrmService;

	constructor() {
		this._responsableCrmService = StartupBuilder.resolve(ResponsableCrmService);
	}

	async responsablesCrmGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableCrm =
				await this._responsableCrmService.getAllResponsableCrms();

			return CommonResponse.successful({ data: responsableCrm });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesCrmGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableCrmId = req.params.responsableCrmId;

			if (!responsableCrmId) return CommonResponse.invalidId();

			const responsableCrm =
				await this._responsableCrmService.getResponsableCrmById(
					responsableCrmId,
				);

			return CommonResponse.successful({ data: responsableCrm });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesCrmDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableCrmId = req.params.responsableCrmId;

			if (!responsableCrmId) return CommonResponse.invalidId();

			await this._responsableCrmService.deleteResponsableCrmById(
				responsableCrmId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesCrmUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const responsableCrmId = req.params.responsableCrmId;

			if (!responsableCrmId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const responsableCrm =
				await this._responsableCrmService.updateResponsableCrmById({
					id: responsableCrmId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: responsableCrm });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateResponsableCrm>>({
	estado: z.boolean().optional(),
});
