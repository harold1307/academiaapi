import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { AsignaturaService } from "../../Asignatura/Application/Service";
import type { IAsignaturaService } from "../../Asignatura/Domain/IAsignaturaService";
import { AsignaturaEnCursoEscuelaService } from "../../AsignaturaEnCursoEscuela/Application/Service";
import type { IAsignaturaEnCursoEscuelaService } from "../../AsignaturaEnCursoEscuela/Domain/IAsignaturaEnCursoEscuelaService";
import type { ICreateAsignaturaEnCursoEscuela } from "../../AsignaturaEnCursoEscuela/Domain/ICreateAsignaturaEnCursoEscuela";
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import { ParaleloService } from "../../Paralelo/Application/Service";
import type { IParaleloService } from "../../Paralelo/Domain/IParaleloService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { ProgramaEnCursoEscuelaService } from "../../ProgramaEnCursoEscuela/Application/Service";
import type { ICreateProgramaEnCursoEscuela } from "../../ProgramaEnCursoEscuela/Domain/ICreateProgramaEnCursoEscuela";
import type { IProgramaEnCursoEscuelaService } from "../../ProgramaEnCursoEscuela/Domain/IProgramaEnCursoEscuelaService";
import { SesionService } from "../../Sesion/Application/Service";
import type { ISesionService } from "../../Sesion/Domain/ISesionService";
import type { ICreateCursoEscuela } from "../Domain/ICreateCursoEscuela";
import type { ICursoEscuelaController } from "../Domain/ICursoEscuelaController";
import type { ICursoEscuelaService } from "../Domain/ICursoEscuelaService";
import { CursoEscuelaService } from "./Service";

export class CursoEscuelaController implements ICursoEscuelaController {
	private _cursoEscuelaService: ICursoEscuelaService;
	private _asignaturaEnCursoEscuelaService: IAsignaturaEnCursoEscuelaService;
	private _asignaturaService: IAsignaturaService;
	private _modeloEvaluativoService: IModeloEvaluativoService;
	private _sesionService: ISesionService;
	private _paraleloService: IParaleloService;
	private _programaEnCursoEscuelaService: IProgramaEnCursoEscuelaService;
	private _programaService: IProgramaService;
	private _mallaCurricularService: IMallaCurricularService;
	private _modalidadService: IModalidadService;

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
		this._programaEnCursoEscuelaService = StartupBuilder.resolve(
			ProgramaEnCursoEscuelaService,
		);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async cursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const cursos = await this._cursoEscuelaService.getAllCursoEscuelas({
				filters: Object.fromEntries(req.query.entries()),
			});

			return CommonResponse.successful({ data: cursos });
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

			if (!cursoEscuelaId) return CommonResponse.invalidId();

			const curso =
				await this._cursoEscuelaService.getCursoEscuelaById(cursoEscuelaId);

			return CommonResponse.successful({ data: curso });
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

			if (!bodyVal.success) return CommonResponse.invalidBody();

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

			return CommonResponse.successful({ status: 201 });
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

			if (!cursoEscuelaId) return CommonResponse.invalidId();

			await this._cursoEscuelaService.deleteCursoEscuelaById(cursoEscuelaId);

			return CommonResponse.successful();
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

			if (!cursoEscuelaId || !asignaturaId) return CommonResponse.invalidId();

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

			if (cursoEscuela.enUso)
				return {
					jsonBody: {
						message:
							"El curso escuela esta en uso, no se pueden crear asignaturas en curso escuela",
					},
					status: 400,
				};

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

			if (!bodyVal.success) return CommonResponse.invalidBody();

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

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasGetByIdWithProgramas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) return CommonResponse.invalidId();

			const cursoEscuela =
				await this._cursoEscuelaService.getCursoEscuelaWithProgramasById(
					cursoEscuelaId,
				);

			return CommonResponse.successful({ data: cursoEscuela });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasCreateProgramaEnCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createProgramaEnCursoEscuelaBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { mallaId, modalidadId, programaId, ...data } = bodyVal.data;

			const cursoEscuela =
				await this._cursoEscuelaService.getCursoEscuelaById(cursoEscuelaId);

			if (!cursoEscuela)
				return {
					jsonBody: { message: "La variante de curso no existe" },
					status: 400,
				};

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return {
					jsonBody: {
						message: "El programa no existe",
					},
					status: 400,
				};

			if (modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: { message: "La modalidad no existe" },
						status: 400,
					};
			}

			if (mallaId) {
				const malla =
					await this._mallaCurricularService.getMallaCurricularById(mallaId);

				if (!malla)
					return { jsonBody: { message: "La malla no existe" }, status: 400 };

				if (malla.programaId !== programaId)
					return {
						jsonBody: { message: "La malla no pertenece al programa" },
						status: 400,
					};

				if (modalidadId && malla.modalidadId !== modalidadId)
					return {
						jsonBody: { message: "La malla no pertenece a la modalidad" },
						status: 400,
					};
			}

			const newProgramaEnCurso =
				await this._programaEnCursoEscuelaService.createProgramaEnCursoEscuela({
					...data,
					cursoEscuelaId,
					programaId,
					mallaId,
					modalidadId,
				});

			ctx.log({ newProgramaEnCurso });

			return CommonResponse.successful({ status: 201 });
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
	asistenciaAprobar: z.number().nullable(),
	profesorId: z.string().nullable(),
	modeloEvaluativoId: z.string().nullable(),
	cantidadDecimales: z.number().nullable(),
	notaMaxima: z.number().nullable(),
	notaMinima: z.number().nullable(),
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
	cupos: z.number().nullable(),
	evaluaProfesor: z.boolean(),
	matriculaConDeuda: z.boolean(),
	legalizarMatriculas: z.boolean(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificaSesion: z.boolean(),
	registroDesdeOtraSede: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	periodoId: z.string(),
});

const createProgramaEnCursoEscuelaBodySchema = z.object<
	ZodInferSchema<Omit<ICreateProgramaEnCursoEscuela, "cursoEscuelaId">>
>({
	registroExterno: z.boolean(),
	programaId: z.string(),
	mallaId: z.string().nullable(),
	modalidadId: z.string().nullable(),
	nivelDesde: z.number().nullable(),
	nivelHasta: z.number().nullable(),
});
