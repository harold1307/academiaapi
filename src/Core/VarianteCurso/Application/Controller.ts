import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { AsignaturaService } from "../../Asignatura/Application/Service";
import type { IAsignaturaService } from "../../Asignatura/Domain/IAsignaturaService";
import { AsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoService";
import type { ICreateAsignaturaEnVarianteCurso } from "../../AsignaturaEnVarianteCurso/Domain/ICreateAsignaturaEnVarianteCurso";
import { CursoEscuelaService } from "../../CursoEscuela/Application/Service";
import type { ICreateCursoEscuela } from "../../CursoEscuela/Domain/ICreateCursoEscuela";
import type { ICursoEscuelaService } from "../../CursoEscuela/Domain/ICursoEscuelaService";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import type { IVarianteCursoController } from "../Domain/IVarianteCursoController";
import type { IVarianteCursoService } from "../Domain/IVarianteCursoService";
import { VarianteCursoService } from "./Service";

export class VarianteCursoController implements IVarianteCursoController {
	private _varianteCursoService: IVarianteCursoService;
	private _asignaturaEnVarianteCursoService: IAsignaturaEnVarianteCursoService;
	private _cursoEscuelaService: ICursoEscuelaService;
	private _asignaturaService: IAsignaturaService;
	private _modeloEvaluativoService: IModeloEvaluativoService;

	constructor() {
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
		this._asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
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
			return ErrorHandler.handle({ ctx, error });
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
			return ErrorHandler.handle({ ctx, error });
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

			const variante =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			if (!variante) {
				return {
					jsonBody: { message: "La variante de curso no existe" },
					status: 400,
				};
			}

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			if (!asignatura) {
				return {
					jsonBody: {
						message: "La asignatura no existe",
					},
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

			if (data.modeloEvaluativoId) {
				const modelo =
					await this._modeloEvaluativoService.getModeloEvaluativoById(
						data.modeloEvaluativoId,
					);

				if (!modelo) {
					return {
						jsonBody: { message: "El modelo evaluativo no existe" },
						status: 400,
					};
				}
			}

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
			return ErrorHandler.handle({ ctx, error });
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
			return ErrorHandler.handle({ ctx, error });
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
					status: 400,
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
			return ErrorHandler.handle({ ctx, error });
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
	modeloEvaluativoId: z.string().uuid().nullable(),
	asistenciaAprobar: z.number().nullable(),
	cantidadDecimales: z.number().nullable(),
	notaMaxima: z.number().nullable(),
	notaMinima: z.number().nullable(),
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
	verificaSesion: z.boolean(),
});
