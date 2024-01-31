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
import type { IDetalleNivelTitulacionController } from "../Domain/IDetalleNivelTitulacionController";
import type { IDetalleNivelTitulacionService } from "../Domain/IDetalleNivelTitulacionService";
import type { IUpdateDetalleNivelTitulacion } from "../Domain/IUpdateDetalleNivelTitulacion";
import { DetalleNivelTitulacionService } from "./Service";

export class DetalleNivelTitulacionController
	implements IDetalleNivelTitulacionController
{
	private _detalleNivelTitulacionService: IDetalleNivelTitulacionService;

	constructor() {
		this._detalleNivelTitulacionService = StartupBuilder.resolve(
			DetalleNivelTitulacionService,
		);
	}

	async detallesNivelTitulacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const detalleNivelTitulacion =
				await this._detalleNivelTitulacionService.getAllDetallesNivelTitulacion();

			return CommonResponse.successful({ data: detalleNivelTitulacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async detallesNivelTitulacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const detalleNivelTitulacionId = req.params.detalleNivelTitulacionId;

			if (!detalleNivelTitulacionId) {
				return CommonResponse.invalidId();
			}

			const detalleNivelTitulaciones =
				await this._detalleNivelTitulacionService.getDetalleNivelTitulacionById(
					detalleNivelTitulacionId,
				);

			return CommonResponse.successful({ data: detalleNivelTitulaciones });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async detallesNivelTitulacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const detalleNivelTitulacionId = req.params.detalleNivelTitulacionId;

			if (!detalleNivelTitulacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const detalleNivelTitulaciones =
				await this._detalleNivelTitulacionService.updateDetalleNivelTitulacionById(
					{
						id: detalleNivelTitulacionId,
						data: bodyVal.data,
					},
				);

			return CommonResponse.successful({ data: detalleNivelTitulaciones });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async detallesNivelTitulacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const detalleNivelTitulacionId = req.params.detalleNivelTitulacionId;

			if (!detalleNivelTitulacionId) return CommonResponse.invalidBody();

			await this._detalleNivelTitulacionService.deleteDetalleNivelTitulacionById(
				detalleNivelTitulacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateDetalleNivelTitulacion>
>({
	nombre: z.string().optional(),
});
