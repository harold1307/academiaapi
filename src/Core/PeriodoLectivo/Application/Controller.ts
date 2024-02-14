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
import type { ICreatePeriodoLectivo } from "../Domain/ICreatePeriodoLectivo";
import type { IPeriodoLectivoController } from "../Domain/IPeriodoLectivoController";
import type { IPeriodoLectivoService } from "../Domain/IPeriodoLectivoService";
import type { IUpdatePeriodoLectivo } from "../Domain/IUpdatePeriodoLectivo";
import { PeriodoLectivoService } from "./Service";

export class PeriodoLectivoController implements IPeriodoLectivoController {
	private _periodoLectivoService: IPeriodoLectivoService;
	private _corteService: ICorteService;
	private _calculoCostoService: ICalculoCostoService;

	constructor() {
		this._periodoLectivoService = StartupBuilder.resolve(PeriodoLectivoService);
		this._corteService = StartupBuilder.resolve(CorteService);
		this._calculoCostoService = StartupBuilder.resolve(CalculoCostoService);
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
}

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
