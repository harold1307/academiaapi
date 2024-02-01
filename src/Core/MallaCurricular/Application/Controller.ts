import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { TipoAsignatura, TipoDuracion } from "@prisma/client";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { AsignaturaService } from "../../Asignatura/Application/Service";
import type { IAsignaturaService } from "../../Asignatura/Domain/IAsignaturaService";
import { AsignaturaEnMallaService } from "../../AsignaturaEnMalla/Application/Service";
import type { IAsignaturaEnMallaService } from "../../AsignaturaEnMalla/Domain/IAsignaturaEnMallaService";
import type { ICreateAsignaturaEnMalla } from "../../AsignaturaEnMalla/Domain/ICreateAsignaturaEnMalla";
import { CompetenciaService } from "../../Competencia/Application/Service";
import type { ICompetenciaService } from "../../Competencia/Domain/ICompetenciaService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import type { ICreateLugarEjecucion } from "../Domain/ICreateLugarEjecucion";
import type { ICreateMallaCurricular } from "../Domain/ICreateMallaCurricular";
import type { IMallaCurricularController } from "../Domain/IMallaCurricularController";
import type { IMallaCurricularService } from "../Domain/IMallaCurricularService";
import type { IUpdateMallaCurricular } from "../Domain/IUpdateMallaCurricular";
import { MallaCurricularService } from "./Service";

export class MallaCurricularController implements IMallaCurricularController {
	private _mallaCurricularService: IMallaCurricularService;
	private _asignaturaService: IAsignaturaService;
	private _asignaturaEnMallaService: IAsignaturaEnMallaService;
	private _competenciaService: ICompetenciaService;
	private _modalidadService: IModalidadService;
	private _sedeService: ISedeService;

	constructor() {
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._asignaturaEnMallaService = StartupBuilder.resolve(
			AsignaturaEnMallaService,
		);
		this._competenciaService = StartupBuilder.resolve(CompetenciaService);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._sedeService = StartupBuilder.resolve(SedeService);
	}

	async mallasCurricularesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const mallaCurriculares =
				await this._mallaCurricularService.getAllMallasCurricularesWithAsignaturas();

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

	async mallasCurricularesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { fechaAprobacion, fechaLimiteVigencia, ...data } = bodyVal.data;

			const modalidad = await this._modalidadService.getModalidadById(
				data.modalidadId,
			);

			if (!modalidad)
				return {
					jsonBody: { message: "La modalidad no existe" },
					status: 400,
				};

			const newMallaCurricular =
				await this._mallaCurricularService.createMallaCurricular({
					...data,
					fechaAprobacion: new Date(fechaAprobacion),
					fechaLimiteVigencia: new Date(fechaLimiteVigencia),
				});

			ctx.log({ newMallaCurricular });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
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

	async mallasCurricularesCreateAsignaturaEnMalla(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const mallaCurricularId = req.params.mallaCurricularId;
			const asignaturaId = req.params.asignaturaId;

			if (!mallaCurricularId || !asignaturaId)
				return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAsignaturaEnMallaBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { data } = bodyVal;

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

			if (malla.niveles < data.nivel) {
				return {
					jsonBody: { message: "El nivel especificado es mayor a la malla" },
					status: 400,
				};
			}

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			if (!asignatura) {
				return {
					jsonBody: { message: "La asignatura no existe" },
					status: 400,
				};
			}

			let newAsignaturaEnMallaId;

			if (data.esAnexo && !data.ejeFormativoId) {
				const asignaturaEnMalla =
					await this._asignaturaEnMallaService.createAnexoAsignaturaEnMalla({
						mallaId: mallaCurricularId,
						asignaturaId,
						data,
					});

				newAsignaturaEnMallaId = asignaturaEnMalla.id;

				return CommonResponse.successful({ status: 201 });
			}

			if (!data.esAnexo && data.ejeFormativoId) {
				const asignaturaEnMalla =
					await this._asignaturaEnMallaService.createAsignaturaEnMalla(
						data,
						mallaCurricularId,
						asignaturaId,
					);

				newAsignaturaEnMallaId = asignaturaEnMalla.id;
			}

			if (data.competenciaGenerica && newAsignaturaEnMallaId) {
				await this._competenciaService.createCompetenciaForAsignaturaEnMalla(
					{ nombre: data.competenciaGenerica },
					newAsignaturaEnMallaId,
				);
			}

			if (newAsignaturaEnMallaId) {
				return CommonResponse.successful({ status: 201 });
			}

			return { jsonBody: { message: "Error desconocido" }, status: 500 };
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

const createBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateMallaCurricular, "fechaAprobacion" | "fechaLimiteVigencia"> & {
			fechaAprobacion: string;
			fechaLimiteVigencia: string;
		}
	>
>({
	modalidadId: z.string(),
	tituloObtenido: z.string(),
	tipoDuracion: z.nativeEnum(TipoDuracion),
	fechaAprobacion: z.string().datetime(),
	fechaLimiteVigencia: z.string().datetime(),
	niveles: z.number(),
	maximoMateriasMatricula: z.number(),
	cantidadLibreOpcionEgreso: z.number(),
	cantidadOptativasEgreso: z.number(),
	cantidadArrastres: z.number(),
	practicasLigadasMaterias: z.boolean(),
	horasPractica: z.number(),
	registroPracticasDesde: z.number(),
	horasVinculacion: z.number(),
	registroVinculacionDesde: z.number(),
	registroProyectosDesde: z.number(),
	usaNivelacion: z.boolean(),
	plantillasSilabo: z.boolean(),
	perfilEgreso: z.string(),
	observaciones: z.string(),
});

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateMallaCurricular, "fechaAprobacion" | "fechaLimiteVigencia"> & {
			fechaAprobacion?: string;
			fechaLimiteVigencia?: string;
		}
	>
>({
	modalidadId: z.string().optional(),
	tituloObtenido: z.string().optional(),
	tipoDuracion: z.nativeEnum(TipoDuracion).optional(),
	fechaAprobacion: z.string().datetime().optional(),
	fechaLimiteVigencia: z.string().datetime().optional(),
	niveles: z.number().optional(),
	maximoMateriasMatricula: z.number().optional(),
	cantidadLibreOpcionEgreso: z.number().optional(),
	cantidadOptativasEgreso: z.number().optional(),
	cantidadArrastres: z.number().optional(),
	practicasLigadasMaterias: z.boolean().optional(),
	horasPractica: z.number().optional(),
	registroPracticasDesde: z.number().optional(),
	horasVinculacion: z.number().optional(),
	registroVinculacionDesde: z.number().optional(),
	registroProyectosDesde: z.number().optional(),
	usaNivelacion: z.boolean().optional(),
	plantillasSilabo: z.boolean().optional(),
	perfilEgreso: z.string().optional(),
	observaciones: z.string().optional(),
});

const createLugarEjecucionBodySchema = z.object<
	ZodInferSchema<Omit<ICreateLugarEjecucion, "mallaId">>
>({
	sedeId: z.string(),
	codigo: z.string().nullable(),
});

const createAsignaturaEnMallaBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateAsignaturaEnMalla,
			"mallaId" | "asignaturaId" | "esAnexo" | "ejeFormativoId"
		> & {
			competenciaGenerica: string | null;
			esAnexo: boolean;
			ejeFormativoId: string | null;
		}
	>
>({
	esAnexo: z.boolean(),
	nivel: z.number(),
	tipoAsignatura: z.nativeEnum(TipoAsignatura),
	identificacion: z.string(),
	permiteMatriculacion: z.boolean(),
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	costoEnMatricula: z.boolean(),
	practicasPreProfesionales: z.boolean(),
	requeridaEgreso: z.boolean(),
	cantidadMatriculas: z.number(),
	horasSemanales: z.number(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	noValidaAsistencia: z.boolean(),
	materiaComun: z.boolean(),
	objetivos: z.string().nullable(),
	descripcion: z.string().nullable(),
	resultadosAprendizaje: z.string().nullable(),

	competenciaGenerica: z.string().nullable(),
	ejeFormativoId: z.string().nullable(),
	areaConocimientoId: z.string(),
	campoFormacionId: z.string(),
});
