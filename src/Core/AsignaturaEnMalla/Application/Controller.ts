import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { $Enums } from "@prisma/client";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import type { IAsignaturaEnMallaController } from "../Domain/IAsignaturaEnMallaController";
import type { IAsignaturaEnMallaService } from "../Domain/IAsignaturaEnMallaService";
import type { IUpdateAnexoAsignaturaEnMalla } from "../Domain/IUpdateAnexoAsignaturaEnMalla";
import type { IUpdateAsignaturaEnMalla } from "../Domain/IUpdateAsignaturaEnMalla";
import { AsignaturaEnMallaService } from "./Service";

export class AsignaturaEnMallaController
	implements IAsignaturaEnMallaController
{
	private _asignaturaEnMallaService: IAsignaturaEnMallaService;
	private _mallaCurricularService: IMallaCurricularService;

	constructor() {
		this._asignaturaEnMallaService = StartupBuilder.resolve(
			AsignaturaEnMallaService,
		);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
	}

	async asignaturasEnMallasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaEnMallaId = req.params.asignaturaEnMallaId;

			if (!asignaturaEnMallaId) return CommonResponse.invalidId();

			const asignaturaEnMalla =
				await this._asignaturaEnMallaService.getAsignaturaEnMallaById(
					asignaturaEnMallaId,
				);

			return CommonResponse.successful({ data: asignaturaEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnMallasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asignaturaEnMallaId = req.params.asignaturaEnMallaId;

			if (!asignaturaEnMallaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { data } = bodyVal;

			const asignaturaEnMalla =
				await this._asignaturaEnMallaService.getAsignaturaEnMallaById(
					asignaturaEnMallaId,
				);

			if (!asignaturaEnMalla)
				return {
					jsonBody: { message: "Asignatura en malla no existe" },
					status: 400,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				asignaturaEnMalla.mallaId,
			);

			if (!malla)
				return {
					jsonBody: {
						message:
							"La asignatura no tiene una malla enlazada, contactar con soporte",
					},
					status: 400,
				};

			if (asignaturaEnMalla.esAnexo) {
				if (malla.enUso) {
					const inmutableKeys = [
						"permiteMatriculacion",
						"validaCredito",
						"validaPromedio",
						"costoEnMatricula",
						"requeridaEgreso",
						"cantidadMatriculas",
						"horasSemanales",
						"horasColaborativas",
						"horasAsistidasDocente",
						"horasAutonomas",
						"horasPracticas",
						"creditos",
					];

					const newData = Object.fromEntries(
						Object.entries(data).filter(([k]) => !inmutableKeys.includes(k)),
					);

					const updatedAsignaturaEnMalla =
						await this._asignaturaEnMallaService.updateAnexoAsignaturaEnMallaById(
							{
								id: asignaturaEnMallaId,
								data: newData,
							},
						);

					return CommonResponse.successful({ data: updatedAsignaturaEnMalla });
				}

				const updatedAsignaturaEnMalla =
					await this._asignaturaEnMallaService.updateAnexoAsignaturaEnMallaById(
						{
							id: asignaturaEnMallaId,
							data,
						},
					);

				return CommonResponse.successful({ data: updatedAsignaturaEnMalla });
			}

			// filtrando keys que no son mutables cuando la malla esta en uso
			if (malla.enUso) {
				const inmutableKeys = [
					"permiteMatriculacion",
					"calculoNivel",
					"validaCredito",
					"validaPromedio",
					"costoEnMatricula",
					"requeridaEgreso",
					"cantidadMatriculas",
					"horasSemanales",
					"horasColaborativas",
					"horasAsistidasDocente",
					"horasAutonomas",
					"horasPracticas",
					"creditos",
					"horasProyectoIntegrador",
				];

				const newData = Object.fromEntries(
					Object.entries(data).filter(([k]) => !inmutableKeys.includes(k)),
				);

				const updatedAsignaturaEnMalla =
					await this._asignaturaEnMallaService.updateAsignaturaEnMallaById({
						id: asignaturaEnMallaId,
						data: newData,
					});

				return CommonResponse.successful({ data: updatedAsignaturaEnMalla });
			}

			const updatedAsignaturaEnMalla =
				await this._asignaturaEnMallaService.updateAsignaturaEnMallaById({
					id: asignaturaEnMallaId,
					data,
				});

			return CommonResponse.successful({ data: updatedAsignaturaEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnMallasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnMallaId = req.params.asignaturaEnMallaId;

			if (!asignaturaEnMallaId) return CommonResponse.invalidId();

			const asignaturaEnMalla =
				await this._asignaturaEnMallaService.getAsignaturaEnMallaById(
					asignaturaEnMallaId,
				);

			if (!asignaturaEnMalla)
				return {
					jsonBody: { message: "Asignatura en malla no existe" },
					status: 400,
				};

			const malla = await this._mallaCurricularService.getMallaCurricularById(
				asignaturaEnMalla.mallaId,
			);

			if (!malla)
				return {
					jsonBody: {
						message:
							"La asignatura no tiene una malla enlazada, contactar con soporte",
					},
					status: 400,
				};

			if (malla.enUso)
				return {
					jsonBody: {
						message: "La malla esta en uso, no se puede eliminar la asignatura",
					},
					status: 400,
				};

			await this._asignaturaEnMallaService.deleteAsignaturaEnMallaById(
				asignaturaEnMallaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnMallasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnMalla =
				await this._asignaturaEnMallaService.getAllAsignaturasEnMallas();

			return CommonResponse.successful({ data: asignaturaEnMalla });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateAsignaturaEnMalla & IUpdateAnexoAsignaturaEnMalla>
>({
	tipoAsignatura: z.nativeEnum($Enums.TipoAsignatura).optional(),
	identificacion: z.string().optional(),

	permiteMatriculacion: z.boolean().optional(),
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	practicasPreProfesionales: z.boolean().optional(),
	requeridaEgreso: z.boolean().optional(),

	cantidadMatriculas: z.number().optional(),
	horasSemanales: z.number().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),

	noValidaAsistencia: z.boolean().optional(),
	materiaComun: z.boolean().optional(),

	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	objetivos: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	descripcion: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	resultadosAprendizaje: z.string().nullable().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	competenciaGenerica: z.string().nullable().optional(),

	ejeFormativoId: z.string().uuid().optional(),
	areaConocimientoId: z.string().uuid().optional(),
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	campoFormacionId: z.string().uuid().nullable().optional(),
});
