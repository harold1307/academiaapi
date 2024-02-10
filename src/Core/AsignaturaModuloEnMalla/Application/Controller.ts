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
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import type { IAsignaturaModuloEnMallaController } from "../Domain/IAsignaturaModuloEnMallaController";
import type { IAsignaturaModuloEnMallaService } from "../Domain/IAsignaturaModuloEnMallaService";
import type { IUpdateAsignaturaModuloEnMalla } from "../Domain/IUpdateAsignaturaModuloEnMalla";
import { AsignaturaModuloEnMallaService } from "./Service";

export class AsignaturaModuloEnMallaController
	implements IAsignaturaModuloEnMallaController
{
	private _asignaturaModuloEnMallaService: IAsignaturaModuloEnMallaService;
	private _mallaCurricularService: IMallaCurricularService;

	constructor() {
		this._asignaturaModuloEnMallaService = StartupBuilder.resolve(
			AsignaturaModuloEnMallaService,
		);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
	}

	async asignaturasModulosEnMallasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaModuloEnMalla =
				await this._asignaturaModuloEnMallaService.getAllAsignaturaModuloEnMallas();

			return CommonResponse.successful({ data: asignaturaModuloEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasModulosEnMallasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaModuloEnMallaId = req.params.asignaturaModuloEnMallaId;

			if (!asignaturaModuloEnMallaId) return CommonResponse.invalidId();

			const asignaturaModuloEnMalla =
				await this._asignaturaModuloEnMallaService.getAsignaturaModuloEnMallaById(
					asignaturaModuloEnMallaId,
				);

			return CommonResponse.successful({ data: asignaturaModuloEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasModulosEnMallasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaModuloEnMallaId = req.params.asignaturaModuloEnMallaId;

			if (!asignaturaModuloEnMallaId) return CommonResponse.invalidId();

			const asignaturaModulo =
				await this._asignaturaModuloEnMallaService.getAsignaturaModuloEnMallaById(
					asignaturaModuloEnMallaId,
				);

			if (!asignaturaModulo)
				return {
					jsonBody: {
						message: "El modulo de la malla no existe",
					},
					status: 400,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				asignaturaModulo.mallaId,
			);

			if (!malla)
				return {
					jsonBody: {
						message: "La malla del modulo no existe",
					},
					status: 400,
				};

			if (malla.enUso)
				return {
					jsonBody: {
						message: "La malla del modulo esta en uso, no se puede eliminar",
					},
					status: 400,
				};

			await this._asignaturaModuloEnMallaService.deleteAsignaturaModuloEnMallaById(
				asignaturaModuloEnMallaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasModulosEnMallasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaModuloEnMallaId = req.params.asignaturaModuloEnMallaId;

			if (!asignaturaModuloEnMallaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asignaturaModuloEnMalla =
				await this._asignaturaModuloEnMallaService.updateAsignaturaModuloEnMallaById(
					{
						id: asignaturaModuloEnMallaId,
						data: bodyVal.data,
					},
				);

			return CommonResponse.successful({ data: asignaturaModuloEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateAsignaturaModuloEnMalla>
>({
	tipoAsignatura: z
		.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const)
		.optional(),
	identificacion: z.string().optional(),
	permiteMatriculacion: z.boolean().optional(),
	validaParaCredito: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	requeridaParaGraduar: z.boolean().optional(),
	cantidadMatriculas: z.number().optional(),

	cantidadMatriculasAutorizadas: z.number().nullable().optional(),

	minimoCreditosRequeridos: z.number().nullable().optional(),
	maximaCantidadHorasSemanalas: z.number().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	noValidaAsistencia: z.boolean().optional(),
	materiaGeneral: z.boolean().optional(),
	guiaPracticaMetodologiaObligatoria: z.boolean().optional(),
	aprobarGuiaPracticaMetodologica: z.boolean().optional(),

	competencia: z.string().nullable().optional(),

	objetivosEspecificos: z.string().nullable().optional(),

	descripcion: z.string().nullable().optional(),

	resultados: z.string().nullable().optional(),

	aporteAsignaturaAlPerfil: z.string().nullable().optional(),

	objetivoGeneral: z.string().nullable().optional(),

	areaConocimientoId: z.string().uuid().optional(),
	campoFormacionId: z.string().uuid().optional(),
});
