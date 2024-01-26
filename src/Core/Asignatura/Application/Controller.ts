import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IAsignaturaController } from "../Domain/IAsignaturaController";
import type { IAsignaturaService } from "../Domain/IAsignaturaService";
import type { ICreateAsignatura } from "../Domain/ICreateAsignatura";
import type { IUpdateAsignatura } from "../Domain/IUpdateAsignatura";
import { AsignaturaService } from "./Service";

export class AsignaturaController implements IAsignaturaController {
	private _asignaturaService: IAsignaturaService;

	constructor() {
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
	}

	async asignaturasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const asignaturas = await this._asignaturaService.getAllAsignaturas();

			return {
				jsonBody: { data: asignaturas, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const asignaturaId = req.params.asignaturaId;

			if (!asignaturaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			return {
				jsonBody: { data: asignatura, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasCreate(
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

			const newAsignatura = await this._asignaturaService.createAsignatura(
				bodyVal.data,
			);

			ctx.log({ newAsignatura });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const asignaturaId = req.params.asignaturaId;

			if (!asignaturaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			await this._asignaturaService.deleteAsignaturaById(asignaturaId);

			return {
				jsonBody: { message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const asignaturaId = req.params.asignaturaId;

			if (!asignaturaId) {
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

			const { data } = bodyVal;

			const asignatura = await this._asignaturaService.updateAsignaturaById({
				id: asignaturaId,
				data,
			});

			return {
				jsonBody: { data: asignatura, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateAsignatura>>({
	codigo: z.string().nullable(),
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateAsignatura>>({
	codigo: z.string().optional(),
});
