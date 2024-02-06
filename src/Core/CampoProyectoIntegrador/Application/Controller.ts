import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { ProyectoIntegradorService } from "../../ProyectoIntegrador/Application/Service";
import type { IProyectoIntegradorService } from "../../ProyectoIntegrador/Domain/IProyectoIntegradorService";
import type { ICampoProyectoIntegradorController } from "../Domain/ICampoProyectoIntegradorController";
import type { ICampoProyectoIntegradorService } from "../Domain/ICampoProyectoIntegradorService";
import type { IUpdateCampoProyectoIntegrador } from "../Domain/IUpdateCampoProyectoIntegrador";
import { CampoProyectoIntegradorService } from "./Service";

export class CampoProyectoIntegradorController
	implements ICampoProyectoIntegradorController
{
	private _campoProyectoIntegradorService: ICampoProyectoIntegradorService;
	private _proyectoIntegradorService: IProyectoIntegradorService;

	constructor() {
		this._campoProyectoIntegradorService = StartupBuilder.resolve(
			CampoProyectoIntegradorService,
		);
		this._proyectoIntegradorService = StartupBuilder.resolve(
			ProyectoIntegradorService,
		);
	}

	async camposProyectoIntegradorGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const camposProyectoIntegrador =
				await this._campoProyectoIntegradorService.getAllCampoProyectosIntegradores();

			return {
				jsonBody: {
					data: camposProyectoIntegrador,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposProyectoIntegradorGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoProyectoIntegradorId = req.params.campoProyectoIntegradorId;

			if (!campoProyectoIntegradorId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoProyectoIntegrador =
				await this._campoProyectoIntegradorService.getCampoProyectoIntegradorById(
					campoProyectoIntegradorId,
				);

			return {
				jsonBody: {
					data: campoProyectoIntegrador,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposProyectoIntegradorUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const campoProyectoIntegradorId = req.params.campoProyectoIntegradorId;

			if (!campoProyectoIntegradorId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoProyectoIntegrador =
				await this._campoProyectoIntegradorService.getCampoProyectoIntegradorById(
					campoProyectoIntegradorId,
				);

			if (!campoProyectoIntegrador) {
				return {
					jsonBody: {
						message: "El campo de proyecto integrador no existe",
					},
					status: 400,
				};
			}

			const proyectoIntegrador =
				await this._proyectoIntegradorService.getProyectoIntegradorById(
					campoProyectoIntegrador.proyectoIntegradorId,
				);

			if (!proyectoIntegrador) {
				return {
					jsonBody: {
						message:
							"El campo de proyecto integrador no tiene un proyecto integrador asociado",
					},
					status: 400,
				};
			}

			if (proyectoIntegrador.enUso) {
				return {
					jsonBody: {
						message:
							"El proyecto integrador asociado esta en uso, no se puede actualizar el campo de proyecto integrador",
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

			const updatedCampoProyectoIntegrador =
				await this._campoProyectoIntegradorService.updateCampoProyectoIntegradorById(
					{
						id: campoProyectoIntegradorId,
						data: bodyVal.data,
					},
				);

			return {
				jsonBody: {
					data: updatedCampoProyectoIntegrador,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async camposProyectoIntegradorDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const campoProyectoIntegradorId = req.params.campoProyectoIntegradorId;

			if (!campoProyectoIntegradorId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const campoProyectoIntegrador =
				await this._campoProyectoIntegradorService.getCampoProyectoIntegradorById(
					campoProyectoIntegradorId,
				);

			if (!campoProyectoIntegrador) {
				return {
					jsonBody: {
						message: "El campo de proyecto integrador no existe",
					},
					status: 400,
				};
			}

			const proyectoIntegrador =
				await this._proyectoIntegradorService.getProyectoIntegradorById(
					campoProyectoIntegrador.proyectoIntegradorId,
				);

			if (!proyectoIntegrador) {
				return {
					jsonBody: {
						message:
							"El campo de proyecto integrador no tiene un proyecto integrador asociado",
					},
					status: 400,
				};
			}

			if (proyectoIntegrador.enUso) {
				return {
					jsonBody: {
						message:
							"El proyecto integrador asociado esta en uso, no se puede eliminar el campo de proyecto integrador",
					},
					status: 400,
				};
			}

			await this._campoProyectoIntegradorService.deleteCampoProyectoIntegradorById(
				campoProyectoIntegradorId,
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

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateCampoProyectoIntegrador>
>({
	nombre: z.string().optional(),
	codigo: z.string().optional(),

	observaciones: z.string().nullable().optional(),
	ordenActa: z.number().optional(),
	notaMaxima: z.number().optional(),
	notaMinima: z.number().optional(),
	decimales: z.number().optional(),
	campoDependiente: z.boolean().optional(),
	actualizaEstado: z.boolean().optional(),
	determinaEstadoFinal: z.boolean().optional(),
});
