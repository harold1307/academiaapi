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
import { AreaConocimientoService } from "../../AreaConocimiento/Application/Service";
import type { IAreaConocimientoService } from "../../AreaConocimiento/Domain/IAreaConocimientoService";
import { AsignaturaService } from "../../Asignatura/Application/Service";
import type { IAsignaturaService } from "../../Asignatura/Domain/IAsignaturaService";
import { AsignaturaModuloEnMallaService } from "../../AsignaturaModuloEnMalla/Application/Service";
import type { IAsignaturaModuloEnMallaService } from "../../AsignaturaModuloEnMalla/Domain/IAsignaturaModuloEnMallaService";
import type { ICreateAsignaturaModuloEnMalla } from "../../AsignaturaModuloEnMalla/Domain/ICreateAsignaturaModuloEnMalla";
import { CampoFormacionService } from "../../CampoFormacion/Application/Service";
import type { ICampoFormacionService } from "../../CampoFormacion/Domain/ICampoFormacionService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import type { ICreateLugarEjecucion } from "../Domain/ICreateLugarEjecucion";
import type { IMallaCurricularController } from "../Domain/IMallaCurricularController";
import type { IMallaCurricularService } from "../Domain/IMallaCurricularService";
import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
import { MallaCurricularService } from "./Service";

export class MallaCurricularController implements IMallaCurricularController {
	private _mallaCurricularService: IMallaCurricularService;
	private _sedeService: ISedeService;
	private _asignaturaModuloEnMallaService: IAsignaturaModuloEnMallaService;
	private _asignaturaService: IAsignaturaService;
	private _campoFormacionService: ICampoFormacionService;
	private _areaConocimientoService: IAreaConocimientoService;

	constructor() {
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._sedeService = StartupBuilder.resolve(SedeService);
		this._asignaturaModuloEnMallaService = StartupBuilder.resolve(
			AsignaturaModuloEnMallaService,
		);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._campoFormacionService = StartupBuilder.resolve(CampoFormacionService);
		this._areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);
	}

	async mallasCurricularesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const mallaCurriculares =
				await this._mallaCurricularService.getAllMallasCurriculares(
					Object.fromEntries(req.query.entries()),
				);

			return CommonResponse.successful({ data: mallaCurriculares });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			const mallaCurricular =
				await this._mallaCurricularService.getMallaCurricularById(
					mallaCurricularId,
				);

			return CommonResponse.successful({
				data: mallaCurricular,
			});
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { fechaAprobacion, fechaLimiteVigencia, ...data } = bodyVal.data;

			const mallaCurricular =
				await this._mallaCurricularService.updateMallaCurricularById({
					id: mallaCurricularId,
					data: {
						...data,
						fechaAprobacion: fechaAprobacion
							? new Date(fechaAprobacion)
							: undefined,
						fechaLimiteVigencia: fechaLimiteVigencia
							? new Date(fechaLimiteVigencia)
							: undefined,
					},
				});

			return CommonResponse.successful({ data: mallaCurricular });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			await this._mallaCurricularService.deleteMallaCurricularById(
				mallaCurricularId,
			);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesCreateLugarEjecucion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createLugarEjecucionBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { data } = bodyVal;

			const malla =
				await this._mallaCurricularService.getMallaCurricularById(
					mallaCurricularId,
				);

			if (!malla)
				return {
					jsonBody: {
						message: "La malla curricular no existe",
					},
					status: 400,
				};

			const sede = await this._sedeService.getSedeById(data.sedeId);

			if (!sede)
				return {
					jsonBody: { message: "La sede no existe" },
					status: 400,
				};

			const newLugarEjecucion =
				await this._mallaCurricularService.createLugarEjecucion(
					mallaCurricularId,
					data,
				);

			ctx.log({ newLugarEjecucion });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesGetByIdWithLugaresEjecucion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			const mallaCurricular =
				await this._mallaCurricularService.getMallaCurricularByIdWithLugaresEjecucion(
					mallaCurricularId,
				);

			return CommonResponse.successful({ data: mallaCurricular });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesGetByIdWithAsignaturas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const mallaCurricularId = req.params.mallaCurricularId;

			if (!mallaCurricularId) return CommonResponse.invalidId();

			const mallaCurricular =
				await this._mallaCurricularService.getMallaCurricularById(
					mallaCurricularId,
				);

			return CommonResponse.successful({ data: mallaCurricular });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async mallasCurricularesCreateModulo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const mallaCurricularId = req.params.mallaCurricularId;
			const asignaturaId = req.params.asignaturaId;

			if (!mallaCurricularId || !asignaturaId)
				return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createModuloBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			if (!asignatura)
				return {
					jsonBody: { message: "La asignatura no existe" },
					status: 400,
				};

			const malla =
				await this._mallaCurricularService.getMallaCurricularById(
					mallaCurricularId,
				);

			if (!malla)
				return {
					jsonBody: {
						message: "La malla no existe",
					},
					status: 400,
				};

			const { campoFormacionId, areaConocimientoId, ...data } = bodyVal.data;

			const campo =
				await this._campoFormacionService.getCampoFormacionById(
					campoFormacionId,
				);

			if (!campo)
				return {
					jsonBody: { message: "El campo de formacion no existe" },
					status: 400,
				};

			const area =
				await this._areaConocimientoService.getAreaConocimientoById(
					areaConocimientoId,
				);

			if (!area)
				return {
					jsonBody: {
						message: "El area de conocimiento no existe",
					},
					status: 400,
				};

			const newAsignaturaModulo =
				await this._asignaturaModuloEnMallaService.createAsignaturaModuloEnMalla(
					{
						...data,
						mallaId: mallaCurricularId,
						asignaturaId,
						campoFormacionId,
						areaConocimientoId,
					},
				);

			ctx.log({ newModulo: newAsignaturaModulo });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createModuloBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaModuloEnMalla, "mallaId" | "asignaturaId">
	>
>({
	tipoAsignatura: z.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const),
	identificacion: z.string(),
	permiteMatriculacion: z.boolean(),
	validaParaCredito: z.boolean(),
	validaParaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	requeridaParaGraduar: z.boolean(),
	cantidadMatriculas: z.number(),
	cantidadMatriculasAutorizadas: z.number().nullable(),
	minimoCreditosRequeridos: z.number().nullable(),
	maximaCantidadHorasSemanalas: z.number(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	noValidaAsistencia: z.boolean(),
	materiaGeneral: z.boolean(),
	guiaPracticaMetodologiaObligatoria: z.boolean(),
	aprobarGuiaPracticaMetodologica: z.boolean(),
	competencia: z.string().nullable(),
	objetivosEspecificos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultados: z.string().nullable(),
	aporteAsignaturaAlPerfil: z.string().nullable(),
	objetivoGeneral: z.string().nullable(),

	areaConocimientoId: z.string(),
	campoFormacionId: z.string(),
});

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateMallaCurricular, "fechaAprobacion" | "fechaLimiteVigencia"> & {
			fechaAprobacion?: string;
			fechaLimiteVigencia?: string;
		}
	>
>({
	estado: z.boolean().optional(),

	tipoDuracion: z
		.enum(["ANOS", "CREDITOS", "HORAS", "SEMESTRES"] as const)
		.nullable()
		.optional(),

	codigo: z.string().nullable().optional(),
	fechaAprobacion: z.string().datetime().optional(),
	fechaLimiteVigencia: z.string().datetime().optional(),
	cantidadOtrasMateriasMatricula: z.number().optional(),
	limiteSeleccionMateriaPorAdministrativo: z.boolean().optional(),

	cantidadArrastres: z.number().nullable().optional(),

	porcentajeMinimoPasarNivel: z.number().nullable().optional(),

	maximoMateriasAdelantar: z.number().nullable().optional(),
	automatriculaModulos: z.boolean().optional(),
	plantillasSilabo: z.boolean().optional(),
	modeloPlanificacion: z.boolean().optional(),

	perfilEgreso: z.string().nullable().optional(),

	observaciones: z.string().nullable().optional(),

	tituloObtenidoId: z.string().uuid().nullable().optional(),
});

const createLugarEjecucionBodySchema = z.object<
	ZodInferSchema<Omit<ICreateLugarEjecucion, "mallaId">>
>({
	sedeId: z.string(),
	codigo: z.string().nullable(),
});
