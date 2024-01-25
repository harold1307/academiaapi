import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { ICreateModeloNivelacion } from "../Domain/ICreateModeloNivelacion";
import type { IModeloNivelacionController } from "../Domain/IModeloNivelacionController";
import type { IModeloNivelacionService } from "../Domain/IModeloNivelacionService";
import type { IUpdateModeloNivelacion } from "../Domain/IUpdateModeloNivelacion";
import { ModeloNivelacionService } from "./Service";

export class ModeloNivelacionController implements IModeloNivelacionController {
	private _modeloNivelacionService: IModeloNivelacionService;
	constructor() {
		this._modeloNivelacionService = StartupBuilder.resolve(
			ModeloNivelacionService,
		);
	}

	async modelosNivelacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const modeloNivelacion =
				await this._modeloNivelacionService.getAllModelosNivelacion();

			return {
				jsonBody: { data: modeloNivelacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosNivelacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const modeloNivelacionId = req.params.modeloNivelacionId;

			if (!modeloNivelacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const modeloNivelacion =
				await this._modeloNivelacionService.getModeloNivelacionById(
					modeloNivelacionId,
				);

			return {
				jsonBody: { data: modeloNivelacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosNivelacionCreate(
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

			const newModeloNivelacion =
				await this._modeloNivelacionService.createModeloNivelacion(
					bodyVal.data,
				);

			ctx.log({ newModeloNivelacion });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosNivelacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const modeloNivelacionId = req.params.modeloNivelacionId;

			if (!modeloNivelacionId) {
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

			const modeloNivelacion =
				await this._modeloNivelacionService.updateModeloNivelacionById({
					id: modeloNivelacionId,
					data: bodyVal.data,
				});

			return {
				jsonBody: { data: modeloNivelacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosNivelacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const modeloNivelacionId = req.params.modeloNivelacionId;

			if (!modeloNivelacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._modeloNivelacionService.deleteModeloNivelacionById(
				modeloNivelacionId,
			);

			return {
				jsonBody: { message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateModeloNivelacion>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	observaciones: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateModeloNivelacion>>({
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	// @ts-expect-error ZodInferSchema not well typed for nullable optional fields
	observaciones: z.string().nullable().optional(),
});
