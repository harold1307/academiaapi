import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IAreaConocimientoController } from "../Domain/IAreaConocimientoController";
import type { IAreaConocimientoService } from "../Domain/IAreaConocimientoService";
import type { ICreateAreaConocimiento } from "../Domain/ICreateAreaConocimiento";
import { AreaConocimientoService } from "./Service";
import type { IUpdateAreaConocimiento } from "../Domain/IUpdateAreaConocimiento";

export class AreaConocimientoController implements IAreaConocimientoController {
	private _areaConocimientoService: IAreaConocimientoService;

	constructor() {
		this._areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);
	}

	async areasConocimientoGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const areaConocimientos =
				await this._areaConocimientoService.getAllAreaConocimientos();

			return {
				jsonBody: { data: areaConocimientos, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async areasConocimientoGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const areaConocimientoId = req.params.areaConocimientoId;

			if (!areaConocimientoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const areaConocimiento =
				await this._areaConocimientoService.getAreaConocimientoById(
					areaConocimientoId,
				);

			return {
				jsonBody: { data: areaConocimiento, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async areasConocimientoCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const newAreaConocimiento =
				await this._areaConocimientoService.createAreaConocimiento(
					bodyVal.data,
				);

			ctx.log({ newAreaConocimiento });

			return { jsonBody: { message: "Solicitud exitosa." }, status: 201 };
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async areasConocimientoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const areaConocimientoId = req.params.areaConocimientoId;

			if (!areaConocimientoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const { data } = bodyVal;

			const areaConocimiento =
				await this._areaConocimientoService.updateAreaConocimientoById({
					id: areaConocimientoId,
					data,
				});

			return {
				jsonBody: { data: areaConocimiento, message: "Actualizacion exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async areasConocimientoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const areaConocimientoId = req.params.areaConocimientoId;

			if (!areaConocimientoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._areaConocimientoService.deleteAreaConocimientoById(
				areaConocimientoId,
			);

			return {
				jsonBody: { message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateAreaConocimiento>>({
	nombre: z.string(),
	codigo: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateAreaConocimiento>>({
	nombre: z.string().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	codigo: z.string().nullable().optional(),
});
