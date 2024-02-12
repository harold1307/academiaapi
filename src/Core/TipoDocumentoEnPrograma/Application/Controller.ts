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
import { TipoDocumentoService } from "../../TipoDocumento/Application/Service";
import type { ITipoDocumentoService } from "../../TipoDocumento/Domain/ITipoDocumentoService";
import type { ITipoDocumentoEnProgramaController } from "../Domain/ITipoDocumentoEnProgramaController";
import type { ITipoDocumentoEnProgramaService } from "../Domain/ITipoDocumentoEnProgramaService";
import type { IUpdateTipoDocumentoEnPrograma } from "../Domain/IUpdateTipoDocumentoEnPrograma";
import { TipoDocumentoEnProgramaService } from "./Service";

export class TipoDocumentoEnProgramaController
	implements ITipoDocumentoEnProgramaController
{
	private _tipoDocumentoEnProgramaService: ITipoDocumentoEnProgramaService;
	private _tipoDocumentoService: ITipoDocumentoService;

	constructor() {
		this._tipoDocumentoEnProgramaService = StartupBuilder.resolve(
			TipoDocumentoEnProgramaService,
		);
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
	}

	async tiposDocumentoEnProgramasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tiposDocumentoEnProgramas =
				await this._tipoDocumentoEnProgramaService.getAllTiposDocumentoEnProgramas();

			return CommonResponse.successful({ data: tiposDocumentoEnProgramas });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoEnProgramasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tipoDocumentoEnProgramaId = req.params.tipoDocumentoEnProgramaId;

			if (!tipoDocumentoEnProgramaId) return CommonResponse.invalidId();

			const tipoDocumentoEnProgramaes =
				await this._tipoDocumentoEnProgramaService.getTipoDocumentoEnProgramaById(
					tipoDocumentoEnProgramaId,
				);

			return CommonResponse.successful({ data: tipoDocumentoEnProgramaes });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoEnProgramasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tipoDocumentoEnProgramaId = req.params.tipoDocumentoEnProgramaId;

			if (!tipoDocumentoEnProgramaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			if (bodyVal.data.tipoDocumentoId) {
				const tipoDocumento =
					await this._tipoDocumentoService.getTipoDocumentoById(
						bodyVal.data.tipoDocumentoId,
					);

				if (!tipoDocumento)
					return {
						jsonBody: {
							message: "El tipo de documento no existe",
						},
						status: 400,
					};
			}

			const tipoDocumentoEnProgramas =
				await this._tipoDocumentoEnProgramaService.updateTipoDocumentoEnProgramaById(
					{
						id: tipoDocumentoEnProgramaId,
						data: bodyVal.data,
					},
				);

			return CommonResponse.successful({ data: tipoDocumentoEnProgramas });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async tiposDocumentoEnProgramasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tipoDocumentoEnProgramaId = req.params.tipoDocumentoEnProgramaId;

			if (!tipoDocumentoEnProgramaId) return CommonResponse.invalidId();

			await this._tipoDocumentoEnProgramaService.deleteTipoDocumentoEnProgramaById(
				tipoDocumentoEnProgramaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateTipoDocumentoEnPrograma>
>({
	requeridoDigital: z.boolean().optional(),
	requeridoFisico: z.boolean().optional(),
	tipoDocumentoId: z.string().optional(),
});
