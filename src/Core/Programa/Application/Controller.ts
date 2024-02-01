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
import type { ICreatePrograma } from "../Domain/ICreatePrograma";
import type { IProgramaController } from "../Domain/IProgramaController";
import type { IProgramaService } from "../Domain/IProgramaService";
import type { IUpdatePrograma } from "../Domain/IUpdatePrograma";
import { ProgramaService } from "./Service";

export class ProgramaController implements IProgramaController {
	private _programaService: IProgramaService;
	private _detalleNivelTitulacion: IDetalleNivelTitulacionService;

	constructor() {
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._detalleNivelTitulacion = StartupBuilder.resolve(
			DetalleNivelTitulacionService,
		);
	}

	async programasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programas = await this._programaService.getAllProgramas();

			return CommonResponse.successful({ data: programas });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const programa = await this._programaService.getProgramaById(programaId);

			return CommonResponse.successful({ data: programa });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const detalleNivelTitulacion =
				await this._detalleNivelTitulacion.getDetalleNivelTitulacionById(
					bodyVal.data.detalleNivelTitulacionId,
				);

			if (!detalleNivelTitulacion)
				return {
					jsonBody: { message: "El detalle de nivel titulacion no existe" },
					status: 400,
				};

			const newPrograma = await this._programaService.createPrograma(
				bodyVal.data,
			);

			ctx.log({ newPrograma });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const programa = await this._programaService.updateProgramaById({
				id: programaId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: programa });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			await this._programaService.deleteProgramaById(programaId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreatePrograma>>({
	nombre: z.string(),
	mencion: z.string(),
	alias: z.string(),
	detalleNivelTitulacionId: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdatePrograma>>({
	alias: z.string().optional(),
	detalleNivelTitulacionId: z.string().optional(),
	estado: z.boolean().optional(),
});
