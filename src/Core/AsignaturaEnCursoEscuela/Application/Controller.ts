import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IAsignaturaEnCursoEscuelaController } from "../Domain/IAsignaturaEnCursoEscuelaController";
import type { IAsignaturaEnCursoEscuelaService } from "../Domain/IAsignaturaEnCursoEscuelaService";
import type { IUpdateAsignaturaEnCursoEscuela } from "../Domain/IUpdateAsignaturaEnCursoEscuela";
import { AsignaturaEnCursoEscuelaService } from "./Service";

export class AsignaturaEnCursoEscuelaController
	implements IAsignaturaEnCursoEscuelaController
{
	private _asignaturaEnCursoEscuelaService: IAsignaturaEnCursoEscuelaService;

	constructor() {
		this._asignaturaEnCursoEscuelaService = StartupBuilder.resolve(
			AsignaturaEnCursoEscuelaService,
		);
	}

	async asignaturasEnCursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturasEnCursoEscuelas =
				await this._asignaturaEnCursoEscuelaService.getAllAsignaturaEnCursoEscuelas();

			return {
				jsonBody: {
					data: asignaturasEnCursoEscuelas,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const asignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.getAsignaturaEnCursoEscuelaById(
					asignaturaEnCursoEscuelaId,
				);

			return {
				jsonBody: {
					data: asignaturaEnCursoEscuela,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const newAsignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.updateAsignaturaEnCursoEscuelaById(
					{ data: bodyVal.data, id: asignaturaEnCursoEscuelaId },
				);

			ctx.log({ newAsignaturaEnCursoEscuela });

			return {
				jsonBody: {
					data: newAsignaturaEnCursoEscuela,
					message: "Solicitud exitosa",
				},
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) {
				return {
					jsonBody: {
						message: "ID invalido o no identificado",
					},
					status: 400,
				};
			}

			await this._asignaturaEnCursoEscuelaService.deleteAsignaturaEnCursoEscuelaById(
				asignaturaEnCursoEscuelaId,
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
	ZodInferSchema<IUpdateAsignaturaEnCursoEscuela>
>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),
	asistenciaAprobar: z.number().optional(),
	asignaturaId: z.string().optional(),
	// @ts-expect-error ZodInferSchema doesnt work with nullable and optional types
	profesorId: z.string().nullable().optional(),
});
