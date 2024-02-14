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
import { NivelMallaService } from "../../NivelMalla/Application/Service";
import type { INivelMallaService } from "../../NivelMalla/Domain/INivelMallaService";
import { TipoDocumentoService } from "../../TipoDocumento/Application/Service";
import type { ITipoDocumentoService } from "../../TipoDocumento/Domain/ITipoDocumentoService";
import type { IRequisitoMatriculacionController } from "../Domain/IRequisitoMatriculacionController";
import type { IRequisitoMatriculacionService } from "../Domain/IRequisitoMatriculacionService";
import type { IUpdateRequisitoMatriculacion } from "../Domain/IUpdateRequisitoMatriculacion";
import { RequisitoMatriculacionService } from "./Service";

export class RequisitoMatriculacionController
	implements IRequisitoMatriculacionController
{
	private _requisitoMatriculacionService: IRequisitoMatriculacionService;
	private _nivelMallaService: INivelMallaService;
	private _tipoDocumentoService: ITipoDocumentoService;

	constructor() {
		this._requisitoMatriculacionService = StartupBuilder.resolve(
			RequisitoMatriculacionService,
		);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
	}

	async requisitosMatriculacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.getAllRequisitoMatriculacions();

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.getRequisitoMatriculacionById(
					requisitoMatriculacionId,
				);

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const requisito =
				await this._requisitoMatriculacionService.getRequisitoMatriculacionById(
					requisitoMatriculacionId,
				);

			if (!requisito)
				return {
					jsonBody: { message: "El requisito de matriculacion no existe" },
					status: 400,
				};

			const { nivelId, tipoDocumentoId, ...data } = bodyVal.data;

			if (nivelId && nivelId !== requisito.nivelId) {
				const nivel = await this._nivelMallaService.getNivelMallaById(nivelId);

				if (!nivel)
					return {
						jsonBody: {
							message: "El nivel no existe",
						},
						status: 400,
					};
			}

			if (tipoDocumentoId && tipoDocumentoId !== requisito.tipoDocumentoId) {
				const tipoDocumento =
					await this._tipoDocumentoService.getTipoDocumentoById(
						tipoDocumentoId,
					);

				if (!tipoDocumento)
					return {
						jsonBody: {
							message: "El tipo de documento no existe",
						},
						status: 400,
					};
			}

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.updateRequisitoMatriculacionById(
					{
						id: requisitoMatriculacionId,
						data: { ...data, tipoDocumentoId, nivelId },
					},
				);

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			await this._requisitoMatriculacionService.deleteRequisitoMatriculacionById(
				requisitoMatriculacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateRequisitoMatriculacion>
>({
	obligatorio: z.boolean().optional(),
	transferenciaIES: z.boolean().optional(),
	primeraMatricula: z.boolean().optional(),
	repitenMaterias: z.boolean().optional(),
	descripcion: z.string().nullable().optional(),

	nivelId: z.string().optional(),
	tipoDocumentoId: z.string().optional(),
});
