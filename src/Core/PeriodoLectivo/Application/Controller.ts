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
import { CalculoCostoService } from "../../CalculoCosto/Application/Service";
import type { ICalculoCostoService } from "../../CalculoCosto/Domain/ICalculoCostoService";
import type { IUpdateCalculoCosto } from "../../CalculoCosto/Domain/IUpdateCalculoCosto";
import { CorteService } from "../../Corte/Application/Service";
import type { ICorteService } from "../../Corte/Domain/ICorteService";
import { CronogramaMatriculacionService } from "../../CronogramaMatriculacion/Application/Service";
import type { ICreateCronogramaMatriculacion } from "../../CronogramaMatriculacion/Domain/ICreateCronogramaMatriculacion";
import type { ICronogramaMatriculacionService } from "../../CronogramaMatriculacion/Domain/ICronogramaMatriculacionService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { NivelMallaService } from "../../NivelMalla/Application/Service";
import type { INivelMallaService } from "../../NivelMalla/Domain/INivelMallaService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { RequisitoMatriculacionService } from "../../RequisitoMatriculacion/Application/Service";
import type { ICreateRequisitoMatriculacion } from "../../RequisitoMatriculacion/Domain/ICreateRequisitoMatriculacion";
import type { IRequisitoMatriculacionService } from "../../RequisitoMatriculacion/Domain/IRequisitoMatriculacionService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import { SubPeriodoLectivoService } from "../../SubPeriodoLectivo/Application/Service";
import type { ICreateSubPeriodoLectivo } from "../../SubPeriodoLectivo/Domain/ICreateSubPeriodoLectivo";
import type { ISubPeriodoLectivoService } from "../../SubPeriodoLectivo/Domain/ISubPeriodoLectivoService";
import { TipoDocumentoService } from "../../TipoDocumento/Application/Service";
import type { ITipoDocumentoService } from "../../TipoDocumento/Domain/ITipoDocumentoService";
import type { ICreatePeriodoLectivo } from "../Domain/ICreatePeriodoLectivo";
import type { IPeriodoLectivoController } from "../Domain/IPeriodoLectivoController";
import type { IPeriodoLectivoService } from "../Domain/IPeriodoLectivoService";
import type { IUpdatePeriodoLectivo } from "../Domain/IUpdatePeriodoLectivo";
import { PeriodoLectivoService } from "./Service";

export class PeriodoLectivoController implements IPeriodoLectivoController {
	private _periodoLectivoService: IPeriodoLectivoService;
	private _corteService: ICorteService;
	private _calculoCostoService: ICalculoCostoService;
	private _requisitoMatriculacionService: IRequisitoMatriculacionService;
	private _nivelMallaService: INivelMallaService;
	private _tipoDocumentoService: ITipoDocumentoService;
	private _subPeriodoLectivoService: ISubPeriodoLectivoService;
	private _cronogramaMatriculacionService: ICronogramaMatriculacionService;
	private _modalidadService: IModalidadService;
	private _programaService: IProgramaService;
	private _sedeService: ISedeService;

	constructor() {
		this._periodoLectivoService = StartupBuilder.resolve(PeriodoLectivoService);
		this._corteService = StartupBuilder.resolve(CorteService);
		this._calculoCostoService = StartupBuilder.resolve(CalculoCostoService);
		this._requisitoMatriculacionService = StartupBuilder.resolve(
			RequisitoMatriculacionService,
		);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
		this._subPeriodoLectivoService = StartupBuilder.resolve(
			SubPeriodoLectivoService,
		);
		this._cronogramaMatriculacionService = StartupBuilder.resolve(
			CronogramaMatriculacionService,
		);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._sedeService = StartupBuilder.resolve(SedeService);
	}

	async periodosLectivosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const periodosLectivos =
				await this._periodoLectivoService.getAllPeriodoLectivos();

			return CommonResponse.successful({ data: periodosLectivos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const periodoLectivo =
				await this._periodoLectivoService.getPeriodoLectivoById(
					periodoLectivoId,
				);

			return CommonResponse.successful({ data: periodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			await this._periodoLectivoService.deletePeriodoLectivoById(
				periodoLectivoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				inicio,
				fin,
				limiteMatriculaEspecial,
				limiteMatriculaExtraordinaria,
				limiteMatriculaOrdinaria,
				corteId,
				...data
			} = bodyVal.data;

			if (corteId) {
				const corte = await this._corteService.getCorteById(corteId);

				if (!corte)
					return { jsonBody: { message: "El corte no existe" }, status: 400 };
			}

			const newPeriodoLectivo =
				await this._periodoLectivoService.createPeriodoLectivo({
					...data,
					inicio: new Date(inicio),
					fin: new Date(fin),
					limiteMatriculaEspecial: limiteMatriculaEspecial
						? new Date(limiteMatriculaEspecial)
						: null,
					limiteMatriculaExtraordinaria: limiteMatriculaExtraordinaria
						? new Date(limiteMatriculaExtraordinaria)
						: null,
					limiteMatriculaOrdinaria: limiteMatriculaOrdinaria
						? new Date(limiteMatriculaOrdinaria)
						: null,
					corteId,
				});

			ctx.log({ newPeriodoLectivo });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				inicio,
				fin,
				limiteMatriculaEspecial,
				limiteMatriculaExtraordinaria,
				limiteMatriculaOrdinaria,
				corteId,
				...data
			} = bodyVal.data;

			if (corteId) {
				const corte = await this._corteService.getCorteById(corteId);

				if (!corte)
					return { jsonBody: { message: "El corte no existe" }, status: 400 };
			}

			const periodoLectivo =
				await this._periodoLectivoService.updatePeriodoLectivoById({
					id: periodoLectivoId,
					data: {
						...data,
						inicio: inicio ? new Date(inicio) : undefined,
						fin: fin ? new Date(fin) : undefined,
						limiteMatriculaEspecial:
							limiteMatriculaEspecial !== undefined
								? limiteMatriculaEspecial
									? new Date(limiteMatriculaEspecial)
									: null
								: undefined,
						limiteMatriculaExtraordinaria:
							limiteMatriculaExtraordinaria !== undefined
								? limiteMatriculaExtraordinaria
									? new Date(limiteMatriculaExtraordinaria)
									: null
								: undefined,
						limiteMatriculaOrdinaria:
							limiteMatriculaOrdinaria !== undefined
								? limiteMatriculaOrdinaria
									? new Date(limiteMatriculaOrdinaria)
									: null
								: undefined,
						corteId,
					},
				});

			return CommonResponse.successful({ data: periodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosUpdateCalculoCosto(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateCalculoCostoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const periodo =
				await this._periodoLectivoService.getPeriodoLectivoById(
					periodoLectivoId,
				);

			if (!periodo)
				return {
					jsonBody: { message: "El periodo lectivo no existe" },
					status: 400,
				};

			const updatedCalculo =
				await this._calculoCostoService.updateCalculoCostoById({
					id: periodo.calculoCostoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: updatedCalculo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosCreateRequisitoMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createRequisitoMatriculacionBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { tipoDocumentoId, sedeId, programaId, modalidadId, ...data } =
				bodyVal.data;

			const tipoDocumento =
				await this._tipoDocumentoService.getTipoDocumentoById(tipoDocumentoId);

			if (!tipoDocumento)
				return {
					jsonBody: {
						message: "El tipo de documento no existe",
					},
					status: 400,
				};

			if (programaId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};
			}

			const sede = await this._sedeService.getSedeById(sedeId);

			if (!sede)
				return {
					jsonBody: {
						message: "La sede no existe",
					},
					status: 400,
				};

			if (modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: {
							message: "La modalidad no existe",
						},
						status: 400,
					};
			}

			const newRequisitoMatriculacion =
				await this._requisitoMatriculacionService.createRequisitoMatriculacion({
					...data,
					periodoId: periodoLectivoId,
					tipoDocumentoId,
					modalidadId,
					programaId,
					sedeId,
				});

			ctx.log({ newRequisitoMatriculacion });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosCreateSubPeriodo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createSubPeriodoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const periodo =
				await this._periodoLectivoService.getPeriodoLectivoById(
					periodoLectivoId,
				);

			if (!periodo)
				return {
					jsonBody: {
						message: "El periodo lectivo no existe",
					},
					status: 400,
				};

			const { fechaFin, fechaInicio, ...data } = bodyVal.data;

			const newSubPeriodoLectivo =
				await this._subPeriodoLectivoService.createSubPeriodoLectivo({
					...data,
					fechaFin: new Date(fechaFin),
					fechaInicio: new Date(fechaInicio),
					periodoId: periodo.id,
				});

			ctx.log({ newSubPeriodoLectivo });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosCreateCronogramaMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createCronogramaMatriculacionBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const periodo =
				await this._periodoLectivoService.getPeriodoLectivoById(
					periodoLectivoId,
				);

			if (!periodo)
				return {
					jsonBody: { message: "El periodo lectivo no existe" },
					status: 400,
				};

			const {
				fechaFin,
				fechaInicio,
				modalidadId,
				programaId,
				sedeId,
				...rest
			} = bodyVal.data;

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return {
					jsonBody: {
						message: "El programa no existe",
					},
					status: 400,
				};

			const sede = await this._sedeService.getSedeById(sedeId);

			if (!sede)
				return {
					jsonBody: {
						message: "La sede no existe",
					},
					status: 400,
				};

			if (modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: {
							message: "La modalidad no existe",
						},
						status: 400,
					};
			}

			const newCronogramaMatriculacion =
				await this._cronogramaMatriculacionService.createCronogramaMatriculacion(
					{
						...rest,
						fechaFin: new Date(fechaFin),
						fechaInicio: new Date(fechaInicio),
						periodoId: periodoLectivoId,
						modalidadId,
						programaId,
						sedeId,
					},
				);

			ctx.log({ newCronogramaMatriculacion });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosGetByIdWithCronogramasMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const periodoLectivo =
				await this._periodoLectivoService.getPeriodoLectivoByIdWithCronogramasMatriculacion(
					periodoLectivoId,
				);

			return CommonResponse.successful({ data: periodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosGetByIdWithSubPeriodos(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const periodoLectivo =
				await this._periodoLectivoService.getPeriodoLectivoByIdWithSubPeriodos(
					periodoLectivoId,
				);

			return CommonResponse.successful({ data: periodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async periodosLectivosGetByIdWithRequisitosMatriculacion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const periodoLectivoId = req.params.periodoLectivoId;

			if (!periodoLectivoId) return CommonResponse.invalidId();

			const periodoLectivo =
				await this._periodoLectivoService.getPeriodoLectivoByIdWithRequisitosMatriculacion(
					periodoLectivoId,
				);

			return CommonResponse.successful({ data: periodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createCronogramaMatriculacionBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateCronogramaMatriculacion,
			"fechaInicio" | "fechaFin" | "periodoId"
		> & {
			fechaInicio: string;
			fechaFin: string;
		}
	>
>({
	fechaInicio: z.string().datetime(),
	fechaFin: z.string().datetime(),
	modalidadId: z.string().nullable(),
	nivel: z.number().nullable(),
	programaId: z.string(),
	sedeId: z.string(),
});

const createSubPeriodoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateSubPeriodoLectivo, "fechaFin" | "fechaInicio" | "periodoId"> & {
			fechaFin: string;
			fechaInicio: string;
		}
	>
>({
	fechaFin: z.string().datetime(),
	fechaInicio: z.string().datetime(),
	nombre: z.string(),
});

const createRequisitoMatriculacionBodySchema = z.object<
	ZodInferSchema<Omit<ICreateRequisitoMatriculacion, "periodoId">>
>({
	obligatorio: z.boolean(),
	transferenciaIES: z.boolean(),
	primeraMatricula: z.boolean(),
	repitenMaterias: z.boolean(),
	descripcion: z.string().nullable(),
	nivel: z.number().nullable(),
	nombre: z.string(),

	programaId: z.string().nullable(),
	sedeId: z.string(),
	modalidadId: z.string().nullable(),
	tipoDocumentoId: z.string(),
});

const updateCalculoCostoBodySchema = z.object<
	ZodInferSchema<IUpdateCalculoCosto>
>({
	costoPorSesion: z.boolean().nullable().optional(),
	cronogramaFechasOpcionPago: z.boolean().nullable().optional(),
	estudiantesEligenOpcionPago: z.boolean().nullable().optional(),
	tipo: z
		.enum(["COSTO_POR_NIVEL_Y_MATERIAS", "COSTO_POR_PLAN_CUOTA"] as const)
		.optional(),
});

const createBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreatePeriodoLectivo,
			| "inicio"
			| "fin"
			| "limiteMatriculaOrdinaria"
			| "limiteMatriculaExtraordinaria"
			| "limiteMatriculaEspecial"
		> & {
			inicio: string;
			fin: string;
			limiteMatriculaOrdinaria: string | null;
			limiteMatriculaExtraordinaria: string | null;
			limiteMatriculaEspecial: string | null;
		}
	>
>({
	nombre: z.string(),
	inicio: z.string().datetime(),
	fin: z.string().datetime(),
	tipo: z.enum(["GRADO", "POSGRADO"] as const),

	limiteMatriculaOrdinaria: z.string().datetime().nullable(),
	limiteMatriculaExtraordinaria: z.string().datetime().nullable(),
	limiteMatriculaEspecial: z.string().datetime().nullable(),
	automatriculaAlumnosFechaExtraordinaria: z.boolean().nullable(),

	estudianteSeleccionaParaleloAutomatricula: z.boolean().nullable(),
	seImpartioNivelacion: z.boolean(),
	planificacionCargaHoraria: z.boolean(),

	planificacionProfesoresFormaTotal: z.boolean().nullable(),
	aprobacionPlanificacionProfesores: z.boolean().nullable(),

	legalizacionAutomaticaContraPagos: z.boolean().nullable(),
	numeroSecuencia: z.number().nullable(),
	corteId: z.string().nullable(),

	cronogramaNotasCoordinacion: z.boolean(),
	puedenAutomatricularseSegundasOMasMatriculas: z.boolean(),
	puedenMatricularseArrastre: z.boolean(),

	numeroMatriculaAutomatico: z.boolean().nullable(),
	numeroMatricularAlLegalizar: z.boolean().nullable(),
});

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<
			IUpdatePeriodoLectivo,
			| "inicio"
			| "fin"
			| "limiteMatriculaExtraordinaria"
			| "limiteMatriculaOrdinaria"
			| "limiteMatriculaEspecial"
		> & {
			inicio?: string;
			fin?: string;
			limiteMatriculaExtraordinaria?: string | null;
			limiteMatriculaOrdinaria?: string | null;
			limiteMatriculaEspecial?: string | null;
		}
	>
>({
	nombre: z.string().min(1).optional(),
	inicio: z.string().optional(),
	fin: z.string().optional(),
	tipo: z.enum(["GRADO", "POSGRADO"] as const).optional(),
	abierto: z.boolean().optional(),
	estado: z.boolean().optional(),
	matriculas: z.boolean().optional(),
	limiteMatriculaExtraordinaria: z.string().nullable().optional(),
	limiteMatriculaOrdinaria: z.string().nullable().optional(),
	limiteMatriculaEspecial: z.string().nullable().optional(),
	automatriculaAlumnosFechaExtraordinaria: z.boolean().nullable().optional(),

	estudianteSeleccionaParaleloAutomatricula: z.boolean().nullable().optional(),
	seImpartioNivelacion: z.boolean().optional(),
	planificacionCargaHoraria: z.boolean().optional(),

	planificacionProfesoresFormaTotal: z.boolean().nullable().optional(),
	aprobacionPlanificacionProfesores: z.boolean().nullable().optional(),

	legalizacionAutomaticaContraPagos: z.boolean().nullable().optional(),
	numeroSecuencia: z.number().nullable().optional(),
	corteId: z.string().uuid().nullable().optional(),

	cronogramaNotasCoordinacion: z.boolean().optional(),
	puedenAutomatricularseSegundasOMasMatriculas: z.boolean().optional(),
	puedenMatricularseArrastre: z.boolean().optional(),

	numeroMatriculaAutomatico: z.boolean().nullable().optional(),
	numeroMatricularAlLegalizar: z.boolean().nullable().optional(),

	actividadesDocencia: z.boolean().optional(),
	actividadesInvestigacion: z.boolean().optional(),
	actividadesGestion: z.boolean().optional(),
	actividadesPracticasComunitarias: z.boolean().optional(),
	actividadesPracticasPreprofesionales: z.boolean().optional(),
	otrasActividades: z.boolean().optional(),
});
