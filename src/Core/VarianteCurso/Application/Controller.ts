import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import type { ZodInferSchema } from "../../../types";
import { AsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoService";
import type { ICreateAsignaturaEnVarianteCurso } from "../../AsignaturaEnVarianteCurso/Domain/ICreateAsignaturaEnVarianteCurso";
import type { IVarianteCursoController } from "../Domain/IVarianteCursoController";
import type { IVarianteCursoService } from "../Domain/IVarianteCursoService";
import { VarianteCursoService } from "./Service";

export class VarianteCursoController implements IVarianteCursoController {
	private _varianteCursoService: IVarianteCursoService;
	private _asignaturaEnVarianteCursoService: IAsignaturaEnVarianteCursoService;

	constructor() {
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
		this._asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);
	}

	async variantesCursoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: { message: "ID invalido o no ha sido proporcionado" },
					status: 400,
				};
			}

			const body = await req.json();

			const varianteCurso =
				await this._varianteCursoService.updateVarianteCurso({
					id: varianteCursoId,
					data: body,
				});

			return {
				jsonBody: { data: varianteCurso, message: "Actualizacion exitosa." },
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

	async variantesCursoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: {
						message: "ID invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const _varianteCursoService =
				StartupBuilder.resolve(VarianteCursoService);

			await _varianteCursoService.deleteVarianteCurso(varianteCursoId);

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

	async variantesCursoByIdCreateAsignatura(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const varianteCursoId = req.params.varianteCursoId;
			const asignaturaId = req.params.asignaturaId;

			if (!varianteCursoId || !asignaturaId) {
				return {
					jsonBody: { message: "ID invalido o no ha sido proporcionado" },
					status: 400,
				};
			}

			const bodyVal = byIdCreateAsignaturaBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const { data } = bodyVal;

			const newAsignaturaEnVarianteCurso =
				await this._asignaturaEnVarianteCursoService.createAsignaturaEnVarianteCurso(
					{
						asignaturaId,
						varianteCursoId,
						data,
					},
				);

			ctx.log({ newAsignaturaEnVarianteCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return { jsonBody: { message: "Error" }, status: 500 };
		}
	}

	async variantesCursoByIdGetAsignaturas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			return {
				jsonBody: { data: varianteCurso, message: "Solicitud exitosa." },
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
}

const byIdCreateAsignaturaBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaEnVarianteCurso, "asignaturaId" | "varianteCursoId">
	>
>({
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	requeridoAprobar: z.boolean(),
	asistenciaAprobar: z.number(),
});
