import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { ICreateNivelTitulacion } from "../Domain/ICreateNivelTitulacion";
import type { INivelTitulacionController } from "../Domain/INivelTitulacionController";
import type { INivelTitulacionService } from "../Domain/INivelTitulacionService";
import type { IUpdateNivelTitulacion } from "../Domain/IUpdateNivelTitulacion";
import { NivelTitulacionService } from "./Service";

export class NivelTitulacionController implements INivelTitulacionController {
	private _nivelTitulacionService: INivelTitulacionService;

	constructor() {
		this._nivelTitulacionService = StartupBuilder.resolve(
			NivelTitulacionService,
		);
	}

	async nivelesTitulacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelesTitulacion =
				await this._nivelTitulacionService.getAllNivelesTitulacion();

			return {
				jsonBody: { data: nivelesTitulacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesTitulacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelTitulacionId = req.params.nivelTitulacionId;

			if (!nivelTitulacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const nivelTitulacion =
				await this._nivelTitulacionService.getNivelTitulacionById(
					nivelTitulacionId,
				);

			return {
				jsonBody: { data: nivelTitulacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesTitulacionCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const newNivelTitulacion =
				await this._nivelTitulacionService.createNivelTitulacion(bodyVal.data);

			ctx.log({ newNivelTitulacion });

			return { jsonBody: { message: "Solicitud exitosa" }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesTitulacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelTitulacionId = req.params.nivelTitulacionId;

			if (!nivelTitulacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._nivelTitulacionService.deleteNivelTitulacionById(
				nivelTitulacionId,
			);

			return {
				jsonBody: { message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesTitulacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelTitulacionId = req.params.nivelTitulacionId;

			if (!nivelTitulacionId) {
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
					jsonBody: {
						message: "Peticion invalida",
					},
					status: 400,
				};
			}

			const nivelTitulacion =
				await this._nivelTitulacionService.updateNivelTitulacionById({
					id: nivelTitulacionId,
					data: bodyVal.data,
				});

			return {
				jsonBody: { data: nivelTitulacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateNivelTitulacion>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateNivelTitulacion>>({
	nombre: z.string().optional(),
});
