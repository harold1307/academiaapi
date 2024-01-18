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
import { CursoEscuelaService } from "../../CursoEscuela/Application/Service";
import type { ICreateCursoEscuela } from "../../CursoEscuela/Domain/ICreateCursoEscuela";
import type { ICursoEscuelaService } from "../../CursoEscuela/Domain/ICursoEscuelaService";
import type { IVarianteCursoController } from "../Domain/IVarianteCursoController";
import type { IVarianteCursoService } from "../Domain/IVarianteCursoService";
import { VarianteCursoService } from "./Service";

export class VarianteCursoController implements IVarianteCursoController {
	private _varianteCursoService: IVarianteCursoService;
	private _asignaturaEnVarianteCursoService: IAsignaturaEnVarianteCursoService;
	private _cursoEscuelaService: ICursoEscuelaService;

	constructor() {
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
		this._asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
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

	async variantesCursoByIdCreateCursoEscuela(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const body = await req.json();

			const bodyVal = createByCursoBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error);
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			if (!varianteCurso) {
				return {
					jsonBody: { message: "La variante de curso no existe" },
				};
			}

			const newCurso = await this._cursoEscuelaService.createCursoEscuela({
				...varianteCurso,
				...bodyVal.data,
				fechaFin: new Date(bodyVal.data.fechaFin),
				fechaInicio: new Date(bodyVal.data.fechaInicio),
				fechaLimiteRegistro: new Date(bodyVal.data.fechaLimiteRegistro),
				plantillaId: varianteCursoId,
			});

			ctx.log({ newCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return { jsonBody: { message: error.message }, status: 500 };
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

const createByCursoBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateCursoEscuela,
			| "plantillaId"
			| "fechaInicio"
			| "fechaFin"
			| "fechaLimiteRegistro"
			| "registroExterno"
			| "registroInterno"
			| "verificarSesion"
			| "registroDesdeOtraSede"
			| "edadMinima"
			| "edadMaxima"
			| "costoPorMateria"
			| "cumpleRequisitosMalla"
			| "pasarRecord"
			| "aprobarCursoPrevio"
		> & {
			fechaInicio: string;
			fechaFin: string;
			fechaLimiteRegistro: string;
		}
	>
>({
	nombre: z.string(),
	codigo: z.string().nullable(),
	paraleloId: z.string(),
	sesionId: z.string(),
	tema: z.string(),
	observaciones: z.string().nullable(),
	departamento: z.string().nullable(),
	fechaInicio: z.string(),
	fechaFin: z.string(),
	fechaLimiteRegistro: z.string(),
	diasLimitePago: z.number(),
	nivel: z.number(),
	cupos: z.number().nullable(),
	evaluaProfesor: z.boolean(),
	matriculaConDeuda: z.boolean(),
	legalizarMatriculas: z.boolean(),
});
