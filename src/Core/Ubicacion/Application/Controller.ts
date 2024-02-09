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
import type { IUbicacionController } from "../Domain/IUbicacionController";
import type { IUbicacionService } from "../Domain/IUbicacionService";
import type { IUpdateUbicacion } from "../Domain/IUpdateUbicacion";
import { UbicacionService } from "./Service";

export class UbicacionController implements IUbicacionController {
	private _ubicacionService: IUbicacionService;

	constructor() {
		this._ubicacionService = StartupBuilder.resolve(UbicacionService);
	}

	async ubicacionesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const ubicaciones = await this._ubicacionService.getAllUbicaciones();

			return CommonResponse.successful({ data: ubicaciones });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ubicacionesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const ubicacionId = req.params.ubicacionId;

			if (!ubicacionId) return CommonResponse.invalidId();

			const ubicacion =
				await this._ubicacionService.getUbicacionById(ubicacionId);

			return CommonResponse.successful({ data: ubicacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ubicacionesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const ubicacionId = req.params.ubicacionId;

			if (!ubicacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const ubicacion = await this._ubicacionService.updateUbicacionById({
				id: ubicacionId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: ubicacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async ubicacionesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const ubicacionId = req.params.ubicacionId;

			if (!ubicacionId) return CommonResponse.invalidId();

			await this._ubicacionService.deleteUbicacionById(ubicacionId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateUbicacion>>({
	tipo: z.enum(["AULA", "LABORATORIO", "TALLER", "SALON"] as const).optional(),
	capacidad: z.number().optional(),
	entornoVirtual: z.boolean().optional(),
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
});
