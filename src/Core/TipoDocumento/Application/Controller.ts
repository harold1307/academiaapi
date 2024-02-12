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
import type { ICreateTipoDocumento } from "../Domain/ICreateTipoDocumento";
import type { ITipoDocumentoController } from "../Domain/ITipoDocumentoController";
import type { ITipoDocumentoService } from "../Domain/ITipoDocumentoService";
import type { IUpdateTipoDocumento } from "../Domain/IUpdateTipoDocumento";
import { TipoDocumentoService } from "./Service";

export class TipoDocumentoController implements ITipoDocumentoController {
	private _tipoDocumentoService: ITipoDocumentoService;

	constructor() {
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
	}

	async tiposDocumentoGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tipoDocumento =
				await this._tipoDocumentoService.getAllTiposDocumento();

			return CommonResponse.successful({ data: tipoDocumento });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tipoDocumentoId = req.params.tipoDocumentoId;

			if (!tipoDocumentoId) return CommonResponse.invalidId();

			const tiposDocumento =
				await this._tipoDocumentoService.getTipoDocumentoById(tipoDocumentoId);

			return CommonResponse.successful({ data: tiposDocumento });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newTipoDocumento =
				await this._tipoDocumentoService.createTipoDocumento(bodyVal.data);

			ctx.log({ newTipoDocumento });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tipoDocumentoId = req.params.tipoDocumentoId;

			if (!tipoDocumentoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const tipoDocumento =
				await this._tipoDocumentoService.updateTipoDocumentoById({
					id: tipoDocumentoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: tipoDocumento });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tipoDocumentoId = req.params.tipoDocumentoId;

			if (!tipoDocumentoId) return CommonResponse.invalidBody();

			await this._tipoDocumentoService.deleteTipoDocumentoById(tipoDocumentoId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateTipoDocumento>>({
	nombre: z.string(),
	titulo: z.boolean(),
	actaGrado: z.boolean(),
	cedula: z.boolean(),
	papeletaVotacion: z.boolean(),
	carnetConadis: z.boolean(),
	convalidacion: z.boolean(),
	partidaNacimiento: z.boolean(),
	preNivelacion: z.boolean(),
	serviciosBasicos: z.boolean(),
	examenIngreso: z.boolean(),
	paraPasantia: z.boolean(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateTipoDocumento>>({
	nombre: z.string().optional(),
	titulo: z.boolean().optional(),
	actaGrado: z.boolean().optional(),
	cedula: z.boolean().optional(),
	papeletaVotacion: z.boolean().optional(),
	carnetConadis: z.boolean().optional(),
	convalidacion: z.boolean().optional(),
	partidaNacimiento: z.boolean().optional(),
	preNivelacion: z.boolean().optional(),
	serviciosBasicos: z.boolean().optional(),
	examenIngreso: z.boolean().optional(),
	paraPasantia: z.boolean().optional(),
});
