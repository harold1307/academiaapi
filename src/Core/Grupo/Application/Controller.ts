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
import type { ICreateGrupo } from "../Domain/ICreateGrupo";
import type { IGrupoController } from "../Domain/IGrupoController";
import type { IGrupoService } from "../Domain/IGrupoService";
import type { IUpdateGrupo } from "../Domain/IUpdateGrupo";
import { GrupoService } from "./Service";

export class GrupoController implements IGrupoController {
	private _grupoService: IGrupoService;

	constructor() {
		this._grupoService = StartupBuilder.resolve(GrupoService);
	}

	async gruposGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const grupo = await this._grupoService.getAllGrupos();

			return CommonResponse.successful({ data: grupo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async gruposGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const grupoId = req.params.grupoId;

			if (!grupoId) return CommonResponse.invalidId();

			const grupo = await this._grupoService.getGrupoById(grupoId);

			return CommonResponse.successful({ data: grupo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async gruposCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newGrupo = await this._grupoService.createGrupo(bodyVal.data);

			ctx.log({ newGrupo });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async gruposUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const grupoId = req.params.grupoId;

			if (!grupoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const grupo = await this._grupoService.updateGrupoById({
				id: grupoId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: grupo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async gruposDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const grupoId = req.params.grupoId;

			if (!grupoId) return CommonResponse.invalidId();

			await this._grupoService.deleteGrupoById(grupoId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateGrupo>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateGrupo>>({
	nombre: z.string().optional(),
});
