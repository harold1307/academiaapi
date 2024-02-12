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
import type { ICreateParalelo } from "../Domain/ICreateParalelo";
import type { IParaleloController } from "../Domain/IParaleloController";
import type { IParaleloService } from "../Domain/IParaleloService";
import type { IUpdateParalelo } from "../Domain/IUpdateParalelo";
import { ParaleloService } from "./Service";

export class ParaleloController implements IParaleloController {
	private _paraleloService: IParaleloService;

	constructor() {
		this._paraleloService = StartupBuilder.resolve(ParaleloService);
	}

	async paralelosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newParalelo = await this._paraleloService.createParalelo(
				bodyVal.data,
			);

			ctx.log({ newCurso: newParalelo });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async paralelosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const paralelos = await this._paraleloService.getAllParalelos();

			return CommonResponse.successful({ data: paralelos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async paralelosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const paraleloId = req.params.paraleloId;

			if (!paraleloId) return CommonResponse.invalidId();

			const paralelo = await this._paraleloService.getParaleloById(paraleloId);

			return CommonResponse.successful({
				data: paralelo,
			});
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async paralelosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const paraleloId = req.params.paraleloId;

			if (!paraleloId) return CommonResponse.invalidId();

			await this._paraleloService.deleteParaleloById(paraleloId);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async paralelosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const paraleloId = req.params.paraleloId;

			if (!paraleloId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const paralelo = await this._paraleloService.updateParaleloById({
				id: paraleloId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: paralelo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateParalelo>>({
	nombre: z.string(),
	orden: z.number(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateParalelo>>({
	nombre: z.string().optional(),
	orden: z.number().optional(),
});
