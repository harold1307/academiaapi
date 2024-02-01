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
import type { ICreateSede } from "../Domain/ICreateSede";
import type { ISedeController } from "../Domain/ISedeController";
import type { ISedeService } from "../Domain/ISedeService";
import type { IUpdateSede } from "../Domain/IUpdateSede";
import { SedeService } from "./Service";

export class SedeController implements ISedeController {
	private _sedeService: ISedeService;

	constructor() {
		this._sedeService = StartupBuilder.resolve(SedeService);
	}

	async sedesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const sede = await this._sedeService.getAllSedes();

			return CommonResponse.successful({ data: sede });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sedesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const sedeId = req.params.sedeId;

			if (!sedeId) return CommonResponse.invalidId();

			const sedes = await this._sedeService.getSedeById(sedeId);

			return CommonResponse.successful({ data: sedes });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sedesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newSede = await this._sedeService.createSede(bodyVal.data);

			ctx.log({ newSede });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sedesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const sedeId = req.params.sedeId;

			if (!sedeId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const sede = await this._sedeService.updateSedeById({
				id: sedeId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: sede });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sedesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const sedeId = req.params.sedeId;

			if (!sedeId) return CommonResponse.invalidId();

			await this._sedeService.deleteSedeById(sedeId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateSede>>({
	nombre: z.string(),
	pais: z.string(),
	provincia: z.string(),
	canton: z.string(),
	codigo: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateSede>>({
	nombre: z.string().optional(),
	pais: z.string().optional(),
	provincia: z.string().optional(),
	canton: z.string().optional(),
	codigo: z.string().optional(),
});
