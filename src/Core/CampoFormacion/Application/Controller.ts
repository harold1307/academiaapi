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
import type { ICampoFormacionController } from "../Domain/ICampoFormacionController";
import type { ICampoFormacionService } from "../Domain/ICampoFormacionService";
import type { ICreateCampoFormacion } from "../Domain/ICreateCampoFormacion";
import type { IUpdateCampoFormacion } from "../Domain/IUpdateCampoFormacion";
import { CampoFormacionService } from "./Service";

export class CampoFormacionController implements ICampoFormacionController {
	private _campoFormacionService: ICampoFormacionService;

	constructor() {
		this._campoFormacionService = StartupBuilder.resolve(CampoFormacionService);
	}

	async camposFormacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const campoFormacion =
				await this._campoFormacionService.getAllCampoFormacions();

			return CommonResponse.successful({ data: campoFormacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposFormacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoFormacionId = req.params.campoFormacionId;

			if (!campoFormacionId) return CommonResponse.invalidId();

			const campoFormacion =
				await this._campoFormacionService.getCampoFormacionById(
					campoFormacionId,
				);

			return CommonResponse.successful({ data: campoFormacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposFormacionCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newCampoFormacion =
				await this._campoFormacionService.createCampoFormacion(bodyVal.data);

			ctx.log({ newCampoFormacion });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposFormacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const campoFormacionId = req.params.campoFormacionId;

			if (!campoFormacionId) return CommonResponse.invalidId();

			await this._campoFormacionService.deleteCampoFormacionById(
				campoFormacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposFormacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoFormacionId = req.params.campoFormacionId;

			if (!campoFormacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const campoFormacion =
				await this._campoFormacionService.updateCampoFormacionById({
					id: campoFormacionId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: campoFormacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateCampoFormacion>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateCampoFormacion>>({
	nombre: z.string().optional(),
});
