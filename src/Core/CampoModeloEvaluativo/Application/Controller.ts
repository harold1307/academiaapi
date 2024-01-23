import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import type { ICampoModeloEvaluativoController } from "../Domain/ICampoModeloEvaluativoController";
import type { ICampoModeloEvaluativoService } from "../Domain/ICampoModeloEvaluativoService";
import type { IUpdateCampoModeloEvaluativo } from "../Domain/IUpdateCampoModeloEvaluativo";
import { CampoModeloEvaluativoService } from "./Service";

export class CampoModeloEvaluativoController
	implements ICampoModeloEvaluativoController
{
	private _campoModeloEvaluativoService: ICampoModeloEvaluativoService;
	private _modeloEvaluativoService: IModeloEvaluativoService;

	constructor() {
		this._campoModeloEvaluativoService = StartupBuilder.resolve(
			CampoModeloEvaluativoService,
		);
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
		);
	}

	async camposModelosEvaluativosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const camposModelosEvaluativos =
				await this._campoModeloEvaluativoService.getAllCamposModelosEvaluativos();

			return {
				jsonBody: {
					data: camposModelosEvaluativos,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposModelosEvaluativosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoModeloEvaluativoId = req.params.campoModeloEvaluativoId;

			if (!campoModeloEvaluativoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoModeloEvaluativo =
				await this._campoModeloEvaluativoService.getCampoModeloEvaluativoById(
					campoModeloEvaluativoId,
				);

			return {
				jsonBody: {
					data: campoModeloEvaluativo,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposModelosEvaluativosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoModeloEvaluativoId = req.params.campoModeloEvaluativoId;

			if (!campoModeloEvaluativoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoModeloEvaluativo =
				await this._campoModeloEvaluativoService.getCampoModeloEvaluativoById(
					campoModeloEvaluativoId,
				);

			if (!campoModeloEvaluativo) {
				return {
					jsonBody: {
						message: "El campo de modelo evaluativo no existe",
					},
					status: 400,
				};
			}

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getModeloEvaluativoById(
					campoModeloEvaluativo.modeloEvaluativoId,
				);

			if (!modeloEvaluativo) {
				return {
					jsonBody: {
						message:
							"El campo de modelo evaluativo no tiene un modelo evaluativo asociado",
					},
					status: 400,
				};
			}

			if (modeloEvaluativo.enUso) {
				return {
					jsonBody: {
						message:
							"El modelo evaluativo asociado esta en uso, no se puede actualizar el campo de modelo evaluativo",
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

			const updatedCampoModeloEvaluativo =
				await this._campoModeloEvaluativoService.updateCampoModeloEvaluativoById(
					{
						id: campoModeloEvaluativoId,
						data: bodyVal.data,
					},
				);

			return {
				jsonBody: {
					data: updatedCampoModeloEvaluativo,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposModelosEvaluativosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const campoModeloEvaluativoId = req.params.campoModeloEvaluativoId;

			if (!campoModeloEvaluativoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoModeloEvaluativo =
				await this._campoModeloEvaluativoService.getCampoModeloEvaluativoById(
					campoModeloEvaluativoId,
				);

			if (!campoModeloEvaluativo) {
				return {
					jsonBody: {
						message: "El campo de modelo evaluativo no existe",
					},
					status: 400,
				};
			}

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getModeloEvaluativoById(
					campoModeloEvaluativo.modeloEvaluativoId,
				);

			if (!modeloEvaluativo) {
				return {
					jsonBody: {
						message:
							"El campo de modelo evaluativo no tiene un modelo evaluativo asociado",
					},
					status: 400,
				};
			}

			if (modeloEvaluativo.enUso) {
				return {
					jsonBody: {
						message:
							"El modelo evaluativo asociado esta en uso, no se puede eliminar el campo de modelo evaluativo",
					},
					status: 400,
				};
			}

			await this._campoModeloEvaluativoService.deleteCampoModeloEvaluativoById(
				campoModeloEvaluativoId,
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

const updateBodySchema = z.object<ZodInferSchema<IUpdateCampoModeloEvaluativo>>(
	{
		codigo: z.string().optional(),
		ordenActa: z.number().optional(),
		notaMaxima: z.number().optional(),
		notaMinima: z.number().optional(),
		decimales: z.number().optional(),
		campoDependiente: z.boolean().optional(),
		actualizaEstado: z.boolean().optional(),
		actualizaEstadoNegativo: z.boolean().optional(),
		determinaEstadoFinal: z.boolean().optional(),
		defineMaximos: z.boolean().optional(),
		alternativaId: z.string().optional(),
	},
);
