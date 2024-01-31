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
import type { ICreatePerfilPractica } from "../Domain/ICreatePerfilPractica";
import type { IPerfilPracticaController } from "../Domain/IPerfilPracticaController";
import type { IPerfilPracticaService } from "../Domain/IPerfilPracticaService";
import type { IUpdatePerfilPractica } from "../Domain/IUpdatePerfilPractica";
import { PerfilPracticaService } from "./Service";

export class PerfilPracticaController implements IPerfilPracticaController {
	private _perfilPracticaService: IPerfilPracticaService;

	constructor() {
		this._perfilPracticaService = StartupBuilder.resolve(PerfilPracticaService);
	}

	async perfilesPracticaGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const perfilPractica =
				await this._perfilPracticaService.getAllPerfilesPractica();

			return CommonResponse.successful({ data: perfilPractica });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async perfilesPracticaGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const perfilPracticaId = req.params.perfilPracticaId;

			if (!perfilPracticaId) return CommonResponse.invalidId();

			const perfilPractica =
				await this._perfilPracticaService.getPerfilPracticaById(
					perfilPracticaId,
				);

			return CommonResponse.successful({ data: perfilPractica });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async perfilesPracticaCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newPerfilPractica =
				await this._perfilPracticaService.createPerfilPractica(bodyVal.data);

			ctx.log({ newPerfilPractica });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async perfilesPracticaUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const perfilPracticaId = req.params.perfilPracticaId;

			if (!perfilPracticaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const perfilPractica =
				await this._perfilPracticaService.updatePerfilPracticaById({
					id: perfilPracticaId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: perfilPractica });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async perfilesPracticaDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const perfilPracticaId = req.params.perfilPracticaId;

			if (!perfilPracticaId) return CommonResponse.invalidId();

			await this._perfilPracticaService.deletePerfilPracticaById(
				perfilPracticaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreatePerfilPractica>>({
	nombre: z.string(),
	actividades: z.string().nullable(),
	capacidades: z.string().nullable(),
	resultados: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdatePerfilPractica>>({
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	actividades: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	capacidades: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultados: z.string().nullable().optional(),
});
