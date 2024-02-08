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
import { EjeFormativoService } from "../../EjeFormativo/Application/Service";
import type { IEjeFormativoService } from "../../EjeFormativo/Domain/IEjeFormativoService";
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import { NivelAcademicoService } from "../../NivelAcademico/Application/Service";
import type { ICreateNivelAcademico } from "../../NivelAcademico/Domain/ICreateNivelAcademico";
import type { INivelAcademicoService } from "../../NivelAcademico/Domain/INivelAcademicoService";
import { ParaleloService } from "../../Paralelo/Application/Service";
import type { IParaleloService } from "../../Paralelo/Domain/IParaleloService";
import { SesionService } from "../../Sesion/Application/Service";
import type { ISesionService } from "../../Sesion/Domain/ISesionService";
import type { INivelMallaController } from "../Domain/INivelMallaController";
import type { INivelMallaService } from "../Domain/INivelMallaService";
import type { IUpdateNivelMalla } from "../Domain/IUpdateNivelMalla";
import { NivelMallaService } from "./Service";

export class NivelMallaController implements INivelMallaController {
	private _nivelMallaService: INivelMallaService;
	private _asignaturaService: IAsignaturaService;
	private _asignaturaEnNivelMallaService: IAsignaturaEnNivelMallaService;
	private _ejeFormativoService: IEjeFormativoService;
	private _campoFormacionService: ICampoFormacionService;
	private _areaConocimientoService: IAreaConocimientoService;
	private _mallaCurricularService: IMallaCurricularService;
	private _nivelAcademicoService: INivelAcademicoService;
	private _sesionService: ISesionService;
	private _paraleloService: IParaleloService;
	private _modeloEvaluativoService: IModeloEvaluativoService;

	constructor() {
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._asignaturaEnNivelMallaService = StartupBuilder.resolve(
			AsignaturaEnNivelMallaService,
		);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._ejeFormativoService = StartupBuilder.resolve(EjeFormativoService);
		this._campoFormacionService = StartupBuilder.resolve(CampoFormacionService);
		this._areaConocimientoService = StartupBuilder.resolve(
			AreaConocimientoService,
		);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._nivelAcademicoService = StartupBuilder.resolve(NivelAcademicoService);
		this._sesionService = StartupBuilder.resolve(SesionService);
		this._paraleloService = StartupBuilder.resolve(ParaleloService);
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
		);
	}

	async nivelesMallaGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelMalla = await this._nivelMallaService.getAllNivelMallas();

			return CommonResponse.successful({ data: nivelMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesMallaGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelMallaId = req.params.nivelMallaId;

			if (!nivelMallaId) return CommonResponse.invalidId();

			const nivelMalla =
				await this._nivelMallaService.getNivelMallaById(nivelMallaId);

			return CommonResponse.successful({ data: nivelMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesMallaUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelMallaId = req.params.nivelMallaId;

			if (!nivelMallaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const nivelMalla = await this._nivelMallaService.updateNivelMallaById({
				id: nivelMallaId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: nivelMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesMallaCreateAsignatura(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const nivelMallaId = req.params.nivelMallaId;
			const asignaturaId = req.params.asignaturaId;

			if (!nivelMallaId || !asignaturaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAsignaturaBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error.issues);
				return CommonResponse.invalidBody();
			}

			const { ejeFormativoId, campoFormacionId, areaConocimientoId, ...data } =
				bodyVal.data;

			const nivelMalla =
				await this._nivelMallaService.getNivelMallaById(nivelMallaId);

			if (!nivelMalla)
				return {
					jsonBody: { message: "El nivel de la malla no existe" },
					status: 400,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				nivelMalla.mallaId,
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

	async nivelesMallaCreateNivelAcademico(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelMallaId = req.params.nivelMallaId;
			const sesionId = req.params.sesionId;

			if (!nivelMallaId || !sesionId) return CommonResponse.invalidId();

			const nivelMalla =
				await this._nivelMallaService.getNivelMallaById(nivelMallaId);

			if (!nivelMalla)
				return {
					jsonBody: { message: "El nivel de la malla no existe" },
					status: 400,
				};

			const sesion = await this._sesionService.getSesionById(sesionId);

			if (!sesion)
				return { jsonBody: { message: "La sesion no existe" }, status: 400 };

			const body = await req.json();
			const bodyVal = createNivelAcademicoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				paraleloId,
				modeloEvaluativoId,
				fechaInicio,
				fechaFin,
				inicioAgregaciones,
				limiteAgregaciones,
				limiteOrdinaria,
				limiteExtraordinaria,
				limiteEspecial,
				...data
			} = bodyVal.data;

			const paralelo = await this._paraleloService.getParaleloById(paraleloId);

			if (!paralelo)
				return { jsonBody: { message: "El paralelo no existe" }, status: 400 };

			const modeloEvaluativo =
				await this._modeloEvaluativoService.getModeloEvaluativoById(
					modeloEvaluativoId,
				);

			if (!modeloEvaluativo)
				return {
					jsonBody: { message: "El modelo evaluativo no existe" },
					status: 400,
				};

			const newNivelAcademico =
				await this._nivelAcademicoService.createNivelAcademico({
					...data,
					nivelMallaId,
					sesionId,
					paraleloId,
					modeloEvaluativoId,
					fechaInicio: new Date(fechaInicio),
					fechaFin: new Date(fechaFin),
					inicioAgregaciones: new Date(inicioAgregaciones),
					limiteAgregaciones: new Date(limiteAgregaciones),
					limiteOrdinaria: new Date(limiteOrdinaria),
					limiteExtraordinaria: new Date(limiteExtraordinaria),
					limiteEspecial: new Date(limiteEspecial),
				});

			ctx.log({ newNivelAcademico });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateNivelMalla>>({
	tituloObtenidoId: z.string().nullable(),
});

const createAsignaturaBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId" | "asignaturaId">
	>
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
	areaConocimientoId: z.string(),
	campoFormacionId: z.string().nullable(),
});

const createNivelAcademicoBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateNivelAcademico,
			| "nivelMallaId"
			| "sesionId"
			| "fechaInicio"
			| "fechaFin"
			| "inicioAgregaciones"
			| "limiteAgregaciones"
			| "limiteOrdinaria"
			| "limiteExtraordinaria"
			| "limiteEspecial"
		> & {
			fechaInicio: string;
			fechaFin: string;
			inicioAgregaciones: string;
			limiteAgregaciones: string;
			limiteOrdinaria: string;
			limiteExtraordinaria: string;
			limiteEspecial: string;
		}
	>
>({
	nombre: z.string().nullable(),
	fechaInicio: z.string().datetime(),
	fechaFin: z.string().datetime(),
	inicioAgregaciones: z.string().datetime(),
	limiteAgregaciones: z.string().datetime(),
	validaRequisitosMalla: z.boolean(),
	validaCumplimientoMaterias: z.boolean(),
	horasMinimasPracticasComunitarias: z.number().nullable(),
	horasMinimasPracticasPreprofesionales: z.number().nullable(),
	estudiantesPuedenSeleccionarMaterias: z.boolean(),
	estudiantesPuedenSeleccionarMateriasOtrosHorarios: z.boolean(),
	estudiantesPuedenSeleccionarMateriasOtrasModalidades: z.boolean(),
	estudiantesRegistranProyectosIntegradores: z.boolean(),
	redireccionAPagos: z.boolean(),
	limiteOrdinaria: z.string().datetime(),
	limiteExtraordinaria: z.string().datetime(),
	limiteEspecial: z.string().datetime(),
	diasVencimientoMatricula: z.number(),
	capacidad: z.number().int().min(0),
	mensaje: z.string().nullable(),
	terminosCondiciones: z.string().nullable(),

	paraleloId: z.string(),
	modeloEvaluativoId: z.string(),
});
