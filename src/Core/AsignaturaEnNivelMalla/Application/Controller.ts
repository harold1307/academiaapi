import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IAsignaturaEnNivelMallaController } from "../Domain/IAsignaturaEnNivelMallaController";
import type { IAsignaturaEnNivelMallaService } from "../Domain/IAsignaturaEnNivelMallaService";
import { AsignaturaEnNivelMallaService } from "./Service";
import { CommonResponse } from "../../../Utils/CommonResponse";
import type { IUpdateAsignaturaEnNivelMalla } from "../Domain/IUpdateAsignaturaEnNivelMalla";
import type { INivelMallaService } from "../../NivelMalla/Domain/INivelMallaService";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { NivelMallaService } from "../../NivelMalla/Application/Service";
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";

export class AsignaturaEnNivelMallaController
	implements IAsignaturaEnNivelMallaController
{
	private _asignaturaEnNivelMallaService: IAsignaturaEnNivelMallaService;
	private _nivelMallaService: INivelMallaService;
	private _mallaCurricularService: IMallaCurricularService;

	constructor() {
		this._asignaturaEnNivelMallaService = StartupBuilder.resolve(
			AsignaturaEnNivelMallaService,
		);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
	}

	async asignaturasEnNivelesMallaGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaEnNivelMallaId = req.params.asignaturaEnNivelMallaId;

			if (!asignaturaEnNivelMallaId) return CommonResponse.invalidId();

			const asignaturaEnNivelMalla =
				await this._asignaturaEnNivelMallaService.getAsignaturaEnNivelMallaById(
					asignaturaEnNivelMallaId,
				);

			return CommonResponse.successful({ data: asignaturaEnNivelMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnNivelesMallaUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaEnNivelMallaId = req.params.asignaturaEnNivelMallaId;

			if (!asignaturaEnNivelMallaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asignaturaEnNivelMalla =
				await this._asignaturaEnNivelMallaService.getAsignaturaEnNivelMallaById(
					asignaturaEnNivelMallaId,
				);

			if (!asignaturaEnNivelMalla)
				return {
					jsonBody: {
						message: "La asignatura en el nivel de la malla no existe",
					},
					status: 404,
				};

			const nivelMalla = await this._nivelMallaService.getNivelMallaById(
				asignaturaEnNivelMalla.nivelMallaId,
			);

			if (!nivelMalla)
				return {
					jsonBody: {
						message:
							"El nivel de la malla de la asignatura no existe, contacte con soporte",
					},
					status: 404,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				nivelMalla.mallaId,
			);

			if (!malla)
				return {
					jsonBody: { message: "La malla de la asignatura en nivel no existe" },
					status: 404,
				};

			let data = bodyVal.data;

			if (malla.enUso) {
				const cantUpdateFields = [
					"permiteMatriculacion",
					"calculoNivel",
					"validaParaCredito",
					"validaParaPromedio",
					"costoEnMatricula",
					"requeridaParaEgresar",
					"cantidadMatriculas",
					"horasAsistidasDocente",
					"horasAutonomas",
					"horasColaborativas",
					"horasPracticas",
					"creditos",
					"horasProyectoIntegrador",
				] satisfies (keyof IUpdateAsignaturaEnNivelMalla)[];

				data = Object.fromEntries(
					Object.entries(data).filter(
						([key]) => !cantUpdateFields.includes(key as any),
					),
				);
			}

			const updatedAsignaturaEnNivelMalla =
				await this._asignaturaEnNivelMallaService.updateAsignaturaEnNivelMallaById(
					{
						id: asignaturaEnNivelMallaId,
						data,
					},
				);

			return CommonResponse.successful({ data: updatedAsignaturaEnNivelMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnNivelesMallaDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnNivelMallaId = req.params.asignaturaEnNivelMallaId;

			if (!asignaturaEnNivelMallaId) return CommonResponse.invalidId();

			const asignaturaEnNivelMalla =
				await this._asignaturaEnNivelMallaService.getAsignaturaEnNivelMallaById(
					asignaturaEnNivelMallaId,
				);

			if (!asignaturaEnNivelMalla)
				return {
					jsonBody: {
						message: "La asignatura en el nivel de la malla no existe",
					},
					status: 404,
				};

			const nivelMalla = await this._nivelMallaService.getNivelMallaById(
				asignaturaEnNivelMalla.nivelMallaId,
			);

			if (!nivelMalla)
				return {
					jsonBody: {
						message:
							"El nivel de la malla de la asignatura no existe, contacte con soporte",
					},
					status: 404,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				nivelMalla.mallaId,
			);

			if (!malla)
				return {
					jsonBody: { message: "La malla de la asignatura en nivel no existe" },
					status: 404,
				};

			if (malla.enUso)
				return {
					jsonBody: {
						message:
							"La malla de la asignatura en nivel está en uso, no se puede eliminar la asignatura",
					},
					status: 400,
				};

			await this._asignaturaEnNivelMallaService.deleteAsignaturaEnNivelMallaById(
				asignaturaEnNivelMallaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateAsignaturaEnNivelMalla>
>({
	tipoAsignatura: z
		.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const)
		.optional(),
	identificacion: z.string().optional(),
	permiteMatriculacion: z.boolean().optional(),
	calculoNivel: z.boolean().optional(),
	validaParaCredito: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	requeridaParaEgresar: z.boolean().optional(),
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
	horasProyectoIntegrador: z.number().optional(),
	noValidaAsistencia: z.boolean().optional(),
	materiaComun: z.boolean().optional(),
	guiaPracticaMetodologiaObligatoria: z.boolean().optional(),
	aprobarGuiaPracticaMetodologica: z.boolean().optional(),

	descripcion: z.string().nullable().optional(),

	objetivoGeneral: z.string().nullable().optional(),

	resultadosAprendizaje: z.string().nullable().optional(),

	aporteAsignaturaAlPerfil: z.string().nullable().optional(),

	competenciaGenerica: z.string().nullable().optional(),

	objetivosEspecificos: z.string().nullable().optional(),

	observaciones: z.string().nullable().optional(),

	ejeFormativoId: z.string().optional(),
	areaConocimientoId: z.string().optional(),

	campoFormacionId: z.string().nullable().optional(),
});
