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
import { AsignaturaEnNivelMallaService } from "../../AsignaturaEnNivelMalla/Application/Service";
import type { IAsignaturaEnNivelMallaService } from "../../AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMallaService";
import type { ICreateAsignaturaEnNivelMalla } from "../../AsignaturaEnNivelMalla/Domain/ICreateAsignaturaEnNivelMalla";
import { CampoFormacionService } from "../../CampoFormacion/Application/Service";
import type { ICampoFormacionService } from "../../CampoFormacion/Domain/ICampoFormacionService";
import { CompetenciaService } from "../../Competencia/Application/Service";
import type { ICompetenciaService } from "../../Competencia/Domain/ICompetenciaService";
import { EjeFormativoService } from "../../EjeFormativo/Application/Service";
import type { IEjeFormativoService } from "../../EjeFormativo/Domain/IEjeFormativoService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { NivelMallaService } from "../../NivelMalla/Application/Service";
import type { INivelMallaService } from "../../NivelMalla/Domain/INivelMallaService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import type { ICreateLugarEjecucion } from "../Domain/ICreateLugarEjecucion";
import type { IMallaCurricularController } from "../Domain/IMallaCurricularController";
import type { IMallaCurricularService } from "../Domain/IMallaCurricularService";
import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
import { MallaCurricularService } from "./Service";

export class MallaCurricularController implements IMallaCurricularController {
	private _mallaCurricularService: IMallaCurricularService;
	private _asignaturaService: IAsignaturaService;
	private _competenciaService: ICompetenciaService;
	private _modalidadService: IModalidadService;
	private _asignaturaEnNivelMallaService: IAsignaturaEnNivelMallaService;
	private _nivelMallaService: INivelMallaService;
	private _ejeFormativoService: IEjeFormativoService;
	private _campoFormacionService: ICampoFormacionService;
	private _areaConocimientoService: IAreaConocimientoService;
	private _sedeService: ISedeService;

	constructor() {
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._competenciaService = StartupBuilder.resolve(CompetenciaService);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._asignaturaEnNivelMallaService = StartupBuilder.resolve(
			AsignaturaEnNivelMallaService,
		);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);
		this._campoFormacionService = StartupBuilder.resolve(CampoFormacionService);
		this._areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);
		this._sedeService = StartupBuilder.resolve(SedeService);
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

	async mallasCurricularesCreateAsignaturaEnNivelMalla(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;
			const nivelMallaId = req.params.nivelMallaId;

			if (!mallaCurricularId || !nivelMallaId)
				return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAsignaturaEnNivelMallaBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error.issues);
				return CommonResponse.invalidBody();
			}

			const {
				asignaturaId,
				ejeFormativoId,
				campoFormacionId,
				areaConocimientoId,
				...data
			} = bodyVal.data;

			const malla =
				await this._mallaCurricularService.getMallaCurricularById(
					mallaCurricularId,
				);

			if (!malla) {
				return {
					jsonBody: { message: "La malla curricular no existe" },
					status: 400,
				};
			}

			if (malla.enUso)
				return {
					jsonBody: {
						message:
							"La malla curricular está en uso, no se pueden crear asignaturas en el nivel de la malla",
					},
					status: 400,
				};

			const nivelMalla =
				await this._nivelMallaService.getNivelMallaById(nivelMallaId);

			if (!nivelMalla)
				return {
					jsonBody: { message: "El nivel de la malla no existe" },
					status: 400,
				};

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			if (!asignatura) {
				return {
					jsonBody: { message: "La asignatura no existe" },
					status: 400,
				};
			}

			const ejeFormativo =
				await this._ejeFormativoService.getEjeFormativoById(ejeFormativoId);

			if (!ejeFormativo)
				return {
					jsonBody: {
						message: "El eje formativo no existe",
					},
					status: 400,
				};

			if (campoFormacionId) {
				const campoFormacion =
					await this._campoFormacionService.getCampoFormacionById(
						campoFormacionId,
					);

				if (!campoFormacion)
					return {
						jsonBody: { message: "El campo de formación no existe" },
						status: 400,
					};
			}

			const areaConocimiento =
				await this._areaConocimientoService.getAreaConocimientoById(
					areaConocimientoId,
				);

			if (!areaConocimiento)
				return {
					jsonBody: { message: "El área de conocimiento no existe" },
					status: 400,
				};

			const newAsignaturaEnNivelMalla =
				await this._asignaturaEnNivelMallaService.createAsignaturaEnNivelMalla({
					...data,
					asignaturaId,
					nivelMallaId,
					ejeFormativoId,
					campoFormacionId,
					areaConocimientoId,
				});

			ctx.log({ newAsignaturaEnNivelMalla });

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

			const { query } = req;

			const mallaCurricular =
				await this._mallaCurricularService.getMallaCurricularByIdWithAsignaturas(
					mallaCurricularId,
					{
						asignaturas_esAnexo: query.get("asignaturas_esAnexo")
							? query.get("asignaturas_esAnexo") === "true"
								? true
								: false
							: undefined,
					},
				);

			return CommonResponse.successful({ data: mallaCurricular });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

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

const createAsignaturaEnNivelMallaBodySchema = z.object<
	ZodInferSchema<Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">>
>({
	tipoAsignatura: z.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const),
	identificacion: z.string(),
	permiteMatriculacion: z.boolean(),
	calculoNivel: z.boolean(),
	validaParaCredito: z.boolean(),
	validaParaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	requeridaParaEgresar: z.boolean(),
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
	horasProyectoIntegrador: z.number(),
	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),
	guiaPracticaMetodologiaObligatoria: z.boolean(),
	aprobarGuiaPracticaMetodologica: z.boolean(),
	descripcion: z.string().nullable(),
	objetivoGeneral: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),
	aporteAsignaturaAlPerfil: z.string().nullable(),
	competenciaGenerica: z.string().nullable(),
	objetivosEspecificos: z.string().nullable(),
	observaciones: z.string().nullable(),

	ejeFormativoId: z.string(),
	asignaturaId: z.string(),
	areaConocimientoId: z.string(),
	campoFormacionId: z.string().nullable(),
});
