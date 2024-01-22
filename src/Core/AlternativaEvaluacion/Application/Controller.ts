import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IAlternativaEvaluacionController } from "../Domain/IAlternativaEvaluacionController";
import type { IAlternativaEvaluacionService } from "../Domain/IAlternativaEvaluacionService";
import type { ICreateAlternativaEvaluacion } from "../Domain/ICreateAlternativaEvaluacion";
import type { IUpdateAlternativaEvaluacion } from "../Domain/IUpdateAlternativaEvaluacion";
import { AlternativaEvaluacionService } from "./Service";

export class AlternativaEvaluacionController
	implements IAlternativaEvaluacionController
{
	private _alternativaEvaluacionService: IAlternativaEvaluacionService;
	constructor() {
		this._alternativaEvaluacionService = StartupBuilder.resolve(
			AlternativaEvaluacionService,
		);
	}

	async alternativasEvaluacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const alternativaEvaluacion =
				await this._alternativaEvaluacionService.getAllAlternativasEvaluacion();

			return {
				jsonBody: { data: alternativaEvaluacion, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async alternativasEvaluacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const alternativaEvaluacionId = req.params.alternativaEvaluacionId;

			if (!alternativaEvaluacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const alternativaEvaluaciones =
				await this._alternativaEvaluacionService.getAlternativaEvaluacionById(
					alternativaEvaluacionId,
				);

			return {
				jsonBody: {
					data: alternativaEvaluaciones,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async alternativasEvaluacionCreate(
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

			const newAlternativaEvaluacion =
				await this._alternativaEvaluacionService.createAlternativaEvaluacion(
					bodyVal.data,
				);

			ctx.log({ newAlternativaEvaluacion });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async alternativasEvaluacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const alternativaEvaluacionId = req.params.alternativaEvaluacionId;

			if (!alternativaEvaluacionId) {
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

			const alternativaEvaluaciones =
				await this._alternativaEvaluacionService.updateAlternativaEvaluacionById(
					{
						id: alternativaEvaluacionId,
						data: bodyVal.data,
					},
				);

			return {
				jsonBody: {
					data: alternativaEvaluaciones,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async alternativasEvaluacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const alternativaEvaluacionId = req.params.alternativaEvaluacionId;

			if (!alternativaEvaluacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._alternativaEvaluacionService.deleteAlternativaEvaluacionById(
				alternativaEvaluacionId,
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

const createBodySchema = z.object<ZodInferSchema<ICreateAlternativaEvaluacion>>(
	{
		codigo: z.string(),
		nombre: z.string(),
	},
);

const updateBodySchema = z.object<ZodInferSchema<IUpdateAlternativaEvaluacion>>(
	{
		codigo: z.string().optional(),
		nombre: z.string().optional(),
	},
);
