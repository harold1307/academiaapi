import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import type { IModalidadController } from "../Domain/IModalidadController";
import type { IModalidadService } from "../Domain/IModalidadService";
import { ModalidadService } from "./Service";

const createBodySchema = z.object({
	nombre: z.string(),
	alias: z.string().nullable(),
});

const updateBodySchema = z.object({
	alias: z.string().nullable(),
});

export class ModalidadController implements IModalidadController {
	private _modalidadService: IModalidadService;
	constructor() {
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async modalidadesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const modalidades = await this._modalidadService.getAllModalidades();

			return {
				jsonBody: { data: modalidades, message: "Solicitud exitosa" },
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

	async modalidadesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const modalidadId = req.params.modalidadId;

			if (!modalidadId) {
				return {
					jsonBody: {
						message: "ID invalido o no identificado",
					},
					status: 400,
				};
			}

			const modalidades =
				await this._modalidadService.getModalidadById(modalidadId);

			return {
				jsonBody: { data: modalidades, message: "Solicitud exitosa" },
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

	async modalidadesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const body = await req.json();

			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: {
						message: "Peticion invalida",
					},
					status: 400,
				};
			}

			const newModalidad = await this._modalidadService.createModalidad(
				bodyVal.data,
			);

			ctx.log({ newModalidad });

			return {
				jsonBody: { message: "Solicitud exitosa" },
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

	async modalidadesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const modalidadId = req.params.modalidadId;

			if (!modalidadId) {
				return {
					jsonBody: {
						message: "ID invalido o no identificado",
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
						status: 400,
					},
				};
			}

			const modalidades = await this._modalidadService.updateModalidadById({
				id: modalidadId,
				data: bodyVal.data,
			});

			return {
				jsonBody: { data: modalidades, message: "Solicitud exitosa" },
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

	async modalidadesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const modalidadId = req.params.modalidadId;

			if (!modalidadId) {
				return {
					jsonBody: {
						message: "ID invalido o no identificado",
					},
					status: 400,
				};
			}

			await this._modalidadService.deleteModalidadById(modalidadId);

			return {
				jsonBody: { message: "Solicitud exitosa" },
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
}
