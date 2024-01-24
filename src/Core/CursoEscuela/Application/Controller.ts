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
import { AsignaturaEnCursoEscuelaService } from "../../AsignaturaEnCursoEscuela/Application/Service";
import type { IAsignaturaEnCursoEscuelaService } from "../../AsignaturaEnCursoEscuela/Domain/IAsignaturaEnCursoEscuelaService";
import type { ICreateAsignaturaEnCursoEscuela } from "../../AsignaturaEnCursoEscuela/Domain/ICreateAsignaturaEnCursoEscuela";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import type { ICreateCursoEscuela } from "../Domain/ICreateCursoEscuela";
import type { ICursoEscuelaController } from "../Domain/ICursoEscuelaController";
import type { ICursoEscuelaService } from "../Domain/ICursoEscuelaService";
import { CursoEscuelaService } from "./Service";
import type { ISesionService } from "../../Sesion/Domain/ISesionService";
import { SesionService } from "../../Sesion/Application/Service";
import type { IParaleloService } from "../../Paralelo/Domain/IParaleloService";
import { ParaleloService } from "../../Paralelo/Application/Service";

export class CursoEscuelaController implements ICursoEscuelaController {
	private _cursoEscuelaService: ICursoEscuelaService;
	private _asignaturaEnCursoEscuelaService: IAsignaturaEnCursoEscuelaService;
	private _asignaturaService: IAsignaturaService;
	private _modeloEvaluativoService: IModeloEvaluativoService;
	private _sesionService: ISesionService;
	private _paraleloService: IParaleloService;

	constructor() {
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
		this._asignaturaEnCursoEscuelaService = StartupBuilder.resolve(
			AsignaturaEnCursoEscuelaService,
		);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
		);
		this._sesionService = StartupBuilder.resolve(SesionService);
		this._paraleloService = StartupBuilder.resolve(ParaleloService);
	}

	async cursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const cursos = await this._cursoEscuelaService.getAllCursoEscuelas();

			return {
				jsonBody: { data: cursos, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const curso =
				await this._cursoEscuelaService.getCursoEscuelaById(cursoEscuelaId);

			return {
				jsonBody: { data: curso, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error);
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const { data } = bodyVal;

			const sesion = await this._sesionService.getSesionById(data.sesionId);

			if (!sesion) {
				return {
					jsonBody: { message: "La sesion no existe." },
					status: 400,
				};
			}

			const paralelo = await this._paraleloService.getParaleloById(
				data.paraleloId,
			);

			if (!paralelo) {
				return {
					jsonBody: { message: "El paralelo no existe." },
					status: 400,
				};
			}

			const newCurso = await this._cursoEscuelaService.createCursoEscuela({
				...data,
				fechaFin: new Date(data.fechaFin),
				fechaInicio: new Date(data.fechaInicio),
				fechaLimiteRegistro: new Date(data.fechaLimiteRegistro),
				plantillaId: null,
			});

			ctx.log({ newCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._cursoEscuelaService.deleteCursoEscuelaById(cursoEscuelaId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasCreateAsignatura(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const cursoEscuelaId = req.params.cursoEscuelaId;
			const asignaturaId = req.params.asignaturaId;

			if (!cursoEscuelaId || !asignaturaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const cursoEscuela =
				await this._cursoEscuelaService.getCursoEscuelaById(cursoEscuelaId);

			if (!cursoEscuela) {
				return {
					jsonBody: {
						message: "El curso escuela no existe",
					},
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

			const body = await req.json();
			const bodyVal = createAsignaturaBodySchema.safeParse(body);

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

			const newAsignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.createAsignaturaEnCursoEscuela(
					{ ...data, cursoEscuelaId, asignaturaId },
				);

			ctx.log({ newAsignaturaEnCursoEscuela });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createAsignaturaBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaEnCursoEscuela, "cursoEscuelaId" | "asignaturaId">
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
	profesorId: z.string().nullable(),
	modeloEvaluativoId: z.string().nullable(),
});

const createBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateCursoEscuela,
			"plantillaId" | "fechaInicio" | "fechaFin" | "fechaLimiteRegistro"
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
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificarSesion: z.boolean(),
	registroDesdeOtraSede: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	aprobarCursoPrevio: z.boolean(),
});
