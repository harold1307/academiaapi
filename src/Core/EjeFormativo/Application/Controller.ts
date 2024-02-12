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
import type { ICreateEjeFormativo } from "../Domain/ICreateEjeFormativo";
import type { IEjeFormativoController } from "../Domain/IEjeFormativoController";
import type { IEjeFormativoService } from "../Domain/IEjeFormativoService";
import type { IUpdateEjeFormativo } from "../Domain/IUpdateEjeFormativo";
import { EjeFormativoService } from "./Service";

export class EjeFormativoController implements IEjeFormativoController {
	private _ejeFormativoService: IEjeFormativoService;

	constructor() {
		this._ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);
	}

	async ejesFormativosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const ejesFormativos =
				await this._ejeFormativoService.getAllEjeFormativos();

			return CommonResponse.successful({ data: ejesFormativos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ejesFormativosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const ejeFormativoId = req.params.ejeFormativoId;

			if (!ejeFormativoId) return CommonResponse.invalidId();

			const ejeFormativo =
				await this._ejeFormativoService.getEjeFormativoById(ejeFormativoId);

			return CommonResponse.successful({ data: ejeFormativo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ejesFormativosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newEjeFormativo =
				await this._ejeFormativoService.createEjeFormativo(bodyVal.data);

			ctx.log({ newEjeFormativo });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ejesFormativosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const ejeFormativoId = req.params.ejeFormativoId;

			if (!ejeFormativoId) return CommonResponse.invalidId();

			await this._ejeFormativoService.deleteEjeFormativoById(ejeFormativoId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ejesFormativosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const ejeFormativoId = req.params.ejeFormativoId;

			if (!ejeFormativoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const ejeFormativo =
				await this._ejeFormativoService.updateEjeFormativoById({
					id: ejeFormativoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: ejeFormativo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateEjeFormativo>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateEjeFormativo>>({
	nombre: z.string().optional(),
});
