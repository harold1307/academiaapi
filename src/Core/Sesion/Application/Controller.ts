import {
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { TurnoService } from "../../Turno/Application/Service";
import type { ICreateTurno } from "../../Turno/Domain/ICreateTurno";
import type { ITurnoService } from "../../Turno/Domain/ITurnoService";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import type { ISesionController } from "../Domain/ISesionController";
import type { ISesionService } from "../Domain/ISesionService";
import { SesionService } from "./Service";

export class SesionController implements ISesionController {
	private _sesionService: ISesionService;
	private _turnoService: ITurnoService;

	constructor() {
		this._sesionService = StartupBuilder.resolve(SesionService);
		this._turnoService = StartupBuilder.resolve(TurnoService);
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
			return ErrorHandler.handle({ ctx, error });
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
			return ErrorHandler.handle({ ctx, error });
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
			return ErrorHandler.handle({ ctx, error });
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
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sesionesCreateTurno(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const sesionId = req.params.sesionId;

			if (!sesionId) {
				return {
					jsonBody: {
						message: "ID invalido o no especificado",
					},
					status: 400,
				};
			}

			const body = await req.json();
			const bodyVal = createTurnoSchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: "Peticion invalida",
					status: 400,
				};
			}

			const { data } = bodyVal;

			const newTurno = await this._turnoService.createTurno({
				...data,
				sesionId,
				comienza: new Date(data.comienza),
				termina: new Date(data.termina),
			});

			ctx.log({ newTurno });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
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

const createTurnoSchema = z.object<
	ZodInferSchema<
		Omit<ICreateTurno, "sesionId" | "comienza" | "termina"> & {
			comienza: string;
			termina: string;
		}
	>
>({
	nombre: z.string(),
	horas: z.number(),
	comienza: z.string().datetime(),
	termina: z.string().datetime(),
});
