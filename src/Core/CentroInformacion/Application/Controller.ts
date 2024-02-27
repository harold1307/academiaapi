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
import type { ICentroInformacionController } from "../Domain/ICentroInformacionController";
import type { ICentroInformacionService } from "../Domain/ICentroInformacionService";
import type { ICreateCentroInformacion } from "../Domain/ICreateCentroInformacion";
import type { IUpdateCentroInformacion } from "../Domain/IUpdateCentroInformacion";
import { CentroInformacionService } from "./Service";

export class CentroInformacionController
	implements ICentroInformacionController
{
	private _centroInformacionService: ICentroInformacionService;

	constructor() {
		this._centroInformacionService = StartupBuilder.resolve(
			CentroInformacionService,
		);
	}

	async centrosInformacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const centrosInformacion =
				await this._centroInformacionService.getAllCentroInformacions();

			return CommonResponse.successful({ data: centrosInformacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async centrosInformacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const centroInformacionId = req.params.centroInformacionId;

			if (!centroInformacionId) return CommonResponse.invalidId();

			const centroInformacion =
				await this._centroInformacionService.getCentroInformacionById(
					centroInformacionId,
				);

			return CommonResponse.successful({ data: centroInformacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async centrosInformacionCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newCentroInformacion =
				await this._centroInformacionService.createCentroInformacion(
					bodyVal.data,
				);

			ctx.log({ newCentroInformacion });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async centrosInformacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const centroInformacionId = req.params.centroInformacionId;

			if (!centroInformacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const centroInformacion =
				await this._centroInformacionService.updateCentroInformacionById({
					id: centroInformacionId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: centroInformacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async centrosInformacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const centroInformacionId = req.params.centroInformacionId;

			if (!centroInformacionId) return CommonResponse.invalidId();

			await this._centroInformacionService.deleteCentroInformacionById(
				centroInformacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateCentroInformacion>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateCentroInformacion>>({
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
});
