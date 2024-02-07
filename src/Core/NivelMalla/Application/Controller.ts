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
