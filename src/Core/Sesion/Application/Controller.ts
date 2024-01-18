import {
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import type { ZodInferSchema } from "../../../types";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import type { ISesionController } from "../Domain/ISesionController";
import type { ISesionService } from "../Domain/ISesionService";
import { SesionService } from "./Service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class SesionController implements ISesionController {
	private _sesionService: ISesionService;

	constructor() {
		this._sesionService = StartupBuilder.resolve(SesionService);
	}

	async sesionesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const sesiones = await this._sesionService.getAllSesiones();

			return {
				jsonBody: { data: sesiones, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return { jsonBody: { message: "Error" }, status: 500 };
		}
	}

	async sesionesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const sesionId = req.params.sesionId;

			if (!sesionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const sesion = await this._sesionService.getSesionById(sesionId);

			return {
				jsonBody: { data: sesion, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			ctx.error(error);

			return {
				jsonBody: {
					message: error.message,
				},
				status: 500,
			};
		}
	}

	async sesionesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: "Peticion invalida",
					status: 400,
				};
			}

			const newSesion = await this._sesionService.createSesion(bodyVal.data);

			ctx.log({ newCurso: newSesion });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			if (error instanceof PrismaClientKnownRequestError) {
				return { jsonBody: { message: error.meta?.cause }, status: 500 };
			}

			return { jsonBody: { message: error.message }, status: 500 };
		}
	}

	async sesionesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const sesionId = req.params.sesionId;

			if (!sesionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._sesionService.deleteSesionById(sesionId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return {
				jsonBody: {
					message: error.message,
				},
				status: 500,
			};
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateSesion>>({
	nombre: z.string(),
	sedeId: z.string(),
	alias: z.string().nullable(),
	lunes: z.boolean(),
	martes: z.boolean(),
	miercoles: z.boolean(),
	jueves: z.boolean(),
	viernes: z.boolean(),
	sabado: z.boolean(),
	domingo: z.boolean(),
});
