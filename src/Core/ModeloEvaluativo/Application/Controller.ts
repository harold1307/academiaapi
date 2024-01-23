import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { CampoModeloEvaluativoService } from "../../CampoModeloEvaluativo/Application/Service";
import type { ICampoModeloEvaluativoService } from "../../CampoModeloEvaluativo/Domain/ICampoModeloEvaluativoService";
import type { ICreateModeloEvaluativo } from "../Domain/ICreateModeloEvaluativo";
import type { IModeloEvaluativoController } from "../Domain/IModeloEvaluativoController";
import type { IModeloEvaluativoService } from "../Domain/IModeloEvaluativoService";
import type { IUpdateModeloEvaluativo } from "../Domain/IUpdateModeloEvaluativo";
import { ModeloEvaluativoService } from "./Service";
import type { ICreateCampoModeloEvaluativo } from "../../CampoModeloEvaluativo/Domain/ICreateCampoModeloEvaluativo";
import type { IAlternativaEvaluacionService } from "../../AlternativaEvaluacion/Domain/IAlternativaEvaluacionService";
import { AlternativaEvaluacionService } from "../../AlternativaEvaluacion/Application/Service";

export class ModeloEvaluativoController implements IModeloEvaluativoController {
	private _modeloEvaluativoService: IModeloEvaluativoService;
	private _campoModeloEvaluativoService: ICampoModeloEvaluativoService;
	private _alternativaEvaluacionService: IAlternativaEvaluacionService;

	constructor() {
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
		);
		this._campoModeloEvaluativoService = StartupBuilder.resolve(
			CampoModeloEvaluativoService,
		);
		this._alternativaEvaluacionService = StartupBuilder.resolve(
			AlternativaEvaluacionService,
		);
	}

	async modelosEvaluativosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getAllModeloEvaluativos();

			return {
				jsonBody: { data: modeloEvaluativo, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosEvaluativosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const modeloEvaluativoId = req.params.modeloEvaluativoId;

			if (!modeloEvaluativoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getModeloEvaluativoById(
					modeloEvaluativoId,
				);

			return {
				jsonBody: { data: modeloEvaluativo, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosEvaluativosCreate(
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
				await this._modeloEvaluativoService.createModeloEvaluativo(
					bodyVal.data,
				);

			ctx.log({ newModeloEvaluativo });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosEvaluativosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const modeloEvaluativoId = req.params.modeloEvaluativoId;

			if (!modeloEvaluativoId) {
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
				await this._modeloEvaluativoService.updateModeloEvaluativoById({
					id: modeloEvaluativoId,
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

	async modelosEvaluativosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const modeloEvaluativoId = req.params.modeloEvaluativoId;

			if (!modeloEvaluativoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._modeloEvaluativoService.deleteModeloEvaluativoById(
				modeloEvaluativoId,
			);

			return {
				jsonBody: { message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modelosEvaluativosCreateCampo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const modeloEvaluativoId = req.params.modeloEvaluativoId;
			const alternativaEvaluacionId = req.params.alternativaEvaluacionId;

			if (!modeloEvaluativoId || !alternativaEvaluacionId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getModeloEvaluativoById(
					modeloEvaluativoId,
				);

			if (!modeloEvaluativo) {
				return {
					jsonBody: {
						message: "El modelo evaluativo no existe",
					},
					status: 400,
				};
			}

			const alternativa =
				await this._alternativaEvaluacionService.getAlternativaEvaluacionById(
					alternativaEvaluacionId,
				);

			if (!alternativa) {
				return {
					jsonBody: {
						message: "La alternativa de evaluacion no existe",
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

			const newCampoModeloEvaluativo =
				await this._campoModeloEvaluativoService.createCampoModeloEvaluativo({
					...bodyVal.data,
					alternativaId: alternativaEvaluacionId,
					modeloEvaluativoId,
				});

			ctx.log({ newCampoModeloEvaluativo });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createCampoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateCampoModeloEvaluativo, "alternativaId" | "modeloEvaluativoId">
	>
>({
	codigo: z.string(),
	ordenActa: z.number(),
	notaMaxima: z.number(),
	notaMinima: z.number(),
	decimales: z.number(),
	campoDependiente: z.boolean(),
	actualizaEstado: z.boolean(),
	actualizaEstadoNegativo: z.boolean(),
	determinaEstadoFinal: z.boolean(),
	defineMaximos: z.boolean(),
});

const createBodySchema = z.object<ZodInferSchema<ICreateModeloEvaluativo>>({
	nombre: z.string(),
	notaMaxima: z.number(),
	notaAprobatoria: z.number(),
	notaRecuperacion: z.number(),
	porcentajeAsistenciaAprobatoria: z.number(),
	decimalesNotaFinal: z.number(),
	defineMaximos: z.boolean(),
	camposActualizanEstado: z.boolean(),
	observaciones: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateModeloEvaluativo>>({
	nombre: z.string().optional(),
	estado: z.boolean().optional(),
	notaMaxima: z.number().optional(),
	notaAprobatoria: z.number().optional(),
	notaRecuperacion: z.number().optional(),
	porcentajeAsistenciaAprobatoria: z.number().optional(),
	decimalesNotaFinal: z.number().optional(),
	defineMaximos: z.boolean().optional(),
	camposActualizanEstado: z.boolean().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	observaciones: z.string().nullable().optional(),
});
