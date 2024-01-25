import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { ICreateProyectoIntegrador } from "../Domain/ICreateProyectoIntegrador";
import type { IProyectoIntegradorController } from "../Domain/IProyectoIntegradorController";
import type { IProyectoIntegradorService } from "../Domain/IProyectoIntegradorService";
import type { IUpdateProyectoIntegrador } from "../Domain/IUpdateProyectoIntegrador";
import { ProyectoIntegradorService } from "./Service";

export class ProyectoIntegradorController
	implements IProyectoIntegradorController
{
	private _proyectoIntegradorService: IProyectoIntegradorService;

	constructor() {
		this._proyectoIntegradorService = StartupBuilder.resolve(
			ProyectoIntegradorService,
		);
	}

	async proyectosIntegradoresGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const proyectosIntegradores =
				await this._proyectoIntegradorService.getAllProyectosIntegradores();

			return {
				jsonBody: { data: proyectosIntegradores, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async proyectosIntegradoresGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const proyectoIntegradorId = req.params.proyectoIntegradorId;

			if (!proyectoIntegradorId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const modeloEvaluativo =
				await this._proyectoIntegradorService.getProyectoIntegradorById(
					proyectoIntegradorId,
				);

			return {
				jsonBody: { data: modeloEvaluativo, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async proyectosIntegradoresCreate(
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

			const newModeloEvaluativo =
				await this._proyectoIntegradorService.createProyectoIntegrador(
					bodyVal.data,
				);

			ctx.log({ newModeloEvaluativo });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async proyectosIntegradoresUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const proyectoIntegradorId = req.params.proyectoIntegradorId;

			if (!proyectoIntegradorId) {
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

			const modeloEvaluativo =
				await this._proyectoIntegradorService.updateProyectoIntegradorById({
					id: proyectoIntegradorId,
					data: bodyVal.data,
				});

			return {
				jsonBody: { data: modeloEvaluativo, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async proyectosIntegradoresDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const proyectoIntegradorId = req.params.proyectoIntegradorId;

			if (!proyectoIntegradorId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._proyectoIntegradorService.deleteProyectoIntegradorById(
				proyectoIntegradorId,
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

const createBodySchema = z.object<ZodInferSchema<ICreateProyectoIntegrador>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	observaciones: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateProyectoIntegrador>>({
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	// @ts-expect-error ZodInferSchema not well typed for nullable optional fields
	observaciones: z.string().nullable().optional(),
});
