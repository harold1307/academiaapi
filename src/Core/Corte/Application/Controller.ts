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
import type { ICorteController } from "../Domain/ICorteController";
import type { ICorteService } from "../Domain/ICorteService";
import type { ICreateCorte } from "../Domain/ICreateCorte";
import { CorteService } from "./Service";

export class CorteController implements ICorteController {
	private _corteService: ICorteService;

	constructor() {
		this._corteService = StartupBuilder.resolve(CorteService);
	}

	async cortesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const cortes = await this._corteService.getAllCortes();

			return CommonResponse.successful({ data: cortes });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cortesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const corteId = req.params.corteId;

			if (!corteId) return CommonResponse.invalidId();

			const corte = await this._corteService.getCorteById(corteId);

			return CommonResponse.successful({ data: corte });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cortesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newCorte = await this._corteService.createCorte(bodyVal.data);

			ctx.log({ newCorte });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cortesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const corteId = req.params.corteId;

			if (!corteId) return CommonResponse.invalidId();

			await this._corteService.deleteCorteById(corteId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cortesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const corteId = req.params.corteId;

			if (!corteId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const corte = await this._corteService.updateCorteById({
				id: corteId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: corte });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateCorte>>({
	nombre: z.string(),
});

const updateBodySchema = createBodySchema.partial();
