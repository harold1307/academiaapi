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
import type { ICreateCampoProyectoIntegrador } from "../../CampoProyectoIntegrador/Domain/ICreateCampoProyectoIntegrador";
import type { ICampoProyectoIntegradorService } from "../../CampoProyectoIntegrador/Domain/ICampoProyectoIntegradorService";
import { CampoProyectoIntegradorService } from "../../CampoProyectoIntegrador/Application/Service";

export class ProyectoIntegradorController
	implements IProyectoIntegradorController
{
	private _proyectoIntegradorService: IProyectoIntegradorService;
	private _campoProyectoIntegradorService: ICampoProyectoIntegradorService;

	constructor() {
		this._proyectoIntegradorService = StartupBuilder.resolve(
			ProyectoIntegradorService,
		);
		this._campoProyectoIntegradorService = StartupBuilder.resolve(
			CampoProyectoIntegradorService,
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

			const proyectoIntegrador =
				await this._proyectoIntegradorService.getProyectoIntegradorById(
					proyectoIntegradorId,
				);

			return {
				jsonBody: { data: proyectoIntegrador, message: "Solicitud exitosa" },
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

			const newProyectoIntegrador =
				await this._proyectoIntegradorService.createProyectoIntegrador(
					bodyVal.data,
				);

			ctx.log({ newProyectoIntegrador });

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

			const proyectoIntegrador =
				await this._proyectoIntegradorService.updateProyectoIntegradorById({
					id: proyectoIntegradorId,
					data: bodyVal.data,
				});

			return {
				jsonBody: { data: proyectoIntegrador, message: "Solicitud exitosa" },
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

	async proyectosIntegradoresCreateCampo(
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

			const proyectoIntegrador =
				await this._proyectoIntegradorService.getProyectoIntegradorById(
					proyectoIntegradorId,
				);

			if (!proyectoIntegrador) {
				return {
					jsonBody: {
						message: "El proyecto integrador no existe",
					},
					status: 400,
				};
			}

			const body = await req.json();
			const bodyVal = createCampoBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const newCampoProyectoIntegrador =
				await this._campoProyectoIntegradorService.createCampoProyectoIntegrador(
					{
						...bodyVal.data,
						proyectoIntegradorId,
					},
				);

			ctx.log({ newCampoProyectoIntegrador });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createCampoBodySchema = z.object<
	ZodInferSchema<Omit<ICreateCampoProyectoIntegrador, "proyectoIntegradorId">>
>({
	nombre: z.string(),
	codigo: z.string(),
	observaciones: z.string().nullable(),
	ordenActa: z.number(),
	notaMaxima: z.number(),
	notaMinima: z.number(),
	decimales: z.number(),
	campoDependiente: z.boolean(),
	actualizaEstado: z.boolean(),
	determinaEstadoFinal: z.boolean(),
});

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
