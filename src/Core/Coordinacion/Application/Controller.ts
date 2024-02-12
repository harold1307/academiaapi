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
import { DetalleNivelTitulacionService } from "../../DetalleNivelTitulacion/Application/Service";
import type { IDetalleNivelTitulacionService } from "../../DetalleNivelTitulacion/Domain/IDetalleNivelTitulacionService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { ICreatePrograma } from "../../Programa/Domain/ICreatePrograma";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import type { ICoordinacionController } from "../Domain/ICoordinacionController";
import type { ICoordinacionService } from "../Domain/ICoordinacionService";
import type { IUpdateCoordinacion } from "../Domain/IUpdateCoordinacion";
import { CoordinacionService } from "./Service";

export class CoordinacionController implements ICoordinacionController {
	private _coordinacionService: ICoordinacionService;
	private _programaService: IProgramaService;
	private _detalleNivelTitulacionService: IDetalleNivelTitulacionService;

	constructor() {
		this._coordinacionService = StartupBuilder.resolve(CoordinacionService);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._detalleNivelTitulacionService = StartupBuilder.resolve(
			DetalleNivelTitulacionService,
		);
	}

	async coordinacionesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const coordinacion =
				await this._coordinacionService.getAllCoordinacions();

			return CommonResponse.successful({ data: coordinacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async coordinacionesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const coordinacionId = req.params.coordinacionId;

			if (!coordinacionId) return CommonResponse.invalidId();

			const coordinacion =
				await this._coordinacionService.getCoordinacionById(coordinacionId);

			return CommonResponse.successful({ data: coordinacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async coordinacionesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const coordinacionId = req.params.coordinacionId;

			if (!coordinacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const coordinacion =
				await this._coordinacionService.updateCoordinacionById({
					id: coordinacionId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: coordinacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async coordinacionesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const coordinacionId = req.params.coordinacionId;

			if (!coordinacionId) return CommonResponse.invalidId();

			await this._coordinacionService.deleteCoordinacionById(coordinacionId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async coordinacionesCreatePrograma(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const coordinacionId = req.params.coordinacionId;

			if (!coordinacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createProgramaBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const coordinacion =
				await this._coordinacionService.getCoordinacionById(coordinacionId);

			if (!coordinacion)
				return {
					jsonBody: { message: "La coordinacion no existe" },
					status: 400,
				};

			const detalleNivelTitulacion =
				await this._detalleNivelTitulacionService.getDetalleNivelTitulacionById(
					bodyVal.data.detalleNivelTitulacionId,
				);

			if (!detalleNivelTitulacion)
				return {
					jsonBody: { message: "El detalle de nivel titulacion no existe" },
					status: 400,
				};

			const newPrograma = await this._programaService.createPrograma({
				...bodyVal.data,
				coordinacionId,
			});

			ctx.log({ newPrograma });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createProgramaBodySchema = z.object<
	ZodInferSchema<Omit<ICreatePrograma, "coordinacionId">>
>({
	alias: z.string(),
	mencion: z.string().nullable(),
	nombre: z.string(),
	detalleNivelTitulacionId: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateCoordinacion>>({
	alias: z.string().optional(),
	nombre: z.string().optional(),
});
