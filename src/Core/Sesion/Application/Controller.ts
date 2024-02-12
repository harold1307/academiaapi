import {
	type HttpRequest,
	type HttpResponseInit,
	type InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import { TurnoService } from "../../Turno/Application/Service";
import type { ICreateTurno } from "../../Turno/Domain/ICreateTurno";
import type { ITurnoService } from "../../Turno/Domain/ITurnoService";
import type { ICreateSesion } from "../Domain/ICreateSesion";
import type { ISesionController } from "../Domain/ISesionController";
import type { ISesionService } from "../Domain/ISesionService";
import type { IUpdateSesion } from "../Domain/IUpdateSesion";
import { SesionService } from "./Service";

export class SesionController implements ISesionController {
	private _sesionService: ISesionService;
	private _turnoService: ITurnoService;
	private _sedeService: ISedeService;

	constructor() {
		this._sesionService = StartupBuilder.resolve(SesionService);
		this._turnoService = StartupBuilder.resolve(TurnoService);
		this._sedeService = StartupBuilder.resolve(SedeService);
	}

	async sesionesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const sesiones = await this._sesionService.getAllSesiones(
				Object.fromEntries(req.query.entries()),
			);

			return CommonResponse.successful({ data: sesiones });
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

			if (!sesionId) return CommonResponse.invalidId();

			const sesion = await this._sesionService.getSesionById(sesionId);

			return CommonResponse.successful({ data: sesion });
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

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const sede = await this._sedeService.getSedeById(bodyVal.data.sedeId);

			if (!sede)
				return {
					jsonBody: {
						message: "La sede no existe",
					},
					status: 400,
				};

			const newSesion = await this._sesionService.createSesion(bodyVal.data);

			ctx.log({ newCurso: newSesion });

			return CommonResponse.successful({ status: 201 });
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

			if (!sesionId) return CommonResponse.invalidId();

			await this._sesionService.deleteSesionById(sesionId);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async sesionesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const sesionId = req.params.sesionId;

			if (!sesionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const sesion = await this._sesionService.updateSesionById({
				id: sesionId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: sesion });
		} catch (error) {
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

			if (!sesionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createTurnoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const sesion = await this._sesionService.getSesionById(sesionId);

			if (!sesion)
				return {
					jsonBody: {
						message: "La sesion no existe",
					},
				};

			const { data } = bodyVal;

			const newTurno = await this._turnoService.createTurno({
				...data,
				sesionId,
				comienza: new Date(data.comienza),
				termina: new Date(data.termina),
			});

			ctx.log({ newTurno });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateSesion>>({
	nombre: z.string(),
	sedeId: z.string(),
	alias: z.string(),
	lunes: z.boolean(),
	martes: z.boolean(),
	miercoles: z.boolean(),
	jueves: z.boolean(),
	viernes: z.boolean(),
	sabado: z.boolean(),
	domingo: z.boolean(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateSesion>>({
	nombre: z.string().optional(),
	sedeId: z.string().optional(),
	alias: z.string().optional(),
	lunes: z.boolean().optional(),
	martes: z.boolean().optional(),
	miercoles: z.boolean().optional(),
	jueves: z.boolean().optional(),
	viernes: z.boolean().optional(),
	sabado: z.boolean().optional(),
	domingo: z.boolean().optional(),
});

const createTurnoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateTurno, "sesionId" | "comienza" | "termina"> & {
			comienza: string;
			termina: string;
		}
	>
>({
	horas: z.number(),
	comienza: z.string().datetime(),
	termina: z.string().datetime(),
});
