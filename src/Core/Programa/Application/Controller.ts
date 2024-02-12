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
import { type ICreateMallaCurricular } from "../../MallaCurricular/Domain/ICreateMallaCurricular";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import type { ICreatePracticaComunitariaEnMalla } from "../../PracticaComunitariaEnMalla/Domain/ICreatePracticaComunitariaEnMalla";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../PracticaPreProfesionalEnMalla/Domain/ICreatePracticaPreProfesionalEnMalla";
import { TipoDocumentoService } from "../../TipoDocumento/Application/Service";
import type { ITipoDocumentoService } from "../../TipoDocumento/Domain/ITipoDocumentoService";
import { TipoDocumentoEnProgramaService } from "../../TipoDocumentoEnPrograma/Application/Service";
import type { ICreateTipoDocumentoEnPrograma } from "../../TipoDocumentoEnPrograma/Domain/ICreateTipoDocumentoEnPrograma";
import type { ITipoDocumentoEnProgramaService } from "../../TipoDocumentoEnPrograma/Domain/ITipoDocumentoEnProgramaService";
import { TituloObtenidoService } from "../../TituloObtenido/Application/Service";
import type { ICreateTituloObtenido } from "../../TituloObtenido/Domain/ICreateTituloObtenido";
import type { ITituloObtenidoService } from "../../TituloObtenido/Domain/ITituloObtenidoService";
import type { IProgramaController } from "../Domain/IProgramaController";
import type { IProgramaService } from "../Domain/IProgramaService";
import type { IUpdatePrograma } from "../Domain/IUpdatePrograma";
import { ProgramaService } from "./Service";

export class ProgramaController implements IProgramaController {
	private _programaService: IProgramaService;
	private _tipoDocumentoService: ITipoDocumentoService;
	private _tipoDocumentoEnProgramaService: ITipoDocumentoEnProgramaService;
	private _tituloObtenidoService: ITituloObtenidoService;
	private _modalidadService: IModalidadService;
	private _mallaCurricularService: IMallaCurricularService;

	constructor() {
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._tipoDocumentoEnProgramaService = StartupBuilder.resolve(
			TipoDocumentoEnProgramaService,
		);
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
		this._tituloObtenidoService = StartupBuilder.resolve(TituloObtenidoService);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
	}

	async programasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programas = await this._programaService.getAllProgramas();

			return CommonResponse.successful({ data: programas });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const programa = await this._programaService.getProgramaById(programaId);

			return CommonResponse.successful({ data: programa });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const programa = await this._programaService.updateProgramaById({
				id: programaId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: programa });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			await this._programaService.deleteProgramaById(programaId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasCreateTipoDocumento(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaId = req.params.programaId;
			const tipoDocumentoId = req.params.tipoDocumentoId;

			if (!programaId || !tipoDocumentoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createTipoDocumentoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return { jsonBody: { message: "El programa no existe" }, status: 400 };

			const tipoDocumento =
				await this._tipoDocumentoService.getTipoDocumentoById(tipoDocumentoId);

			if (!tipoDocumento)
				return {
					jsonBody: { message: "El tipo de documento no existe" },
					status: 400,
				};

			const newTipoDocumentoEnPrograma =
				await this._tipoDocumentoEnProgramaService.createTipoDocumentoEnPrograma(
					{ ...bodyVal.data, programaId, tipoDocumentoId },
				);

			ctx.log({ newTipoDocumentoEnPrograma });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasCreateTituloObtenido(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createTituloObtenidoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return { jsonBody: { message: "El programa no existe" }, status: 400 };

			const newTituloObtenido =
				await this._tituloObtenidoService.createTituloObtenido({
					...bodyVal.data,
					programaId,
				});

			ctx.log({ newTituloObtenido });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasCreateMalla(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const programaId = req.params.programaId;

			if (!programaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createMallaCurricularBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				fechaAprobacion,
				fechaLimiteVigencia,
				modalidadId,
				tituloObtenidoId,
				practicasComunitarias,
				practicasPreProfesionales,
				niveles,
				...data
			} = bodyVal.data;

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return { jsonBody: { message: "El programa no existe" }, status: 400 };

			const modalidad =
				await this._modalidadService.getModalidadById(modalidadId);

			if (!modalidad)
				return {
					jsonBody: { message: "La modalidad no existe" },
					status: 400,
				};

			if (
				practicasComunitarias &&
				practicasComunitarias.registroDesdeNivel &&
				practicasComunitarias.registroDesdeNivel > niveles
			) {
				return {
					jsonBody: {
						message:
							"El registro desde nivel de las practicas comunitarias no puede ser mayor al número de niveles",
					},
					status: 400,
				};
			}

			if (
				practicasPreProfesionales &&
				practicasPreProfesionales.registroDesdeNivel &&
				practicasPreProfesionales.registroDesdeNivel > niveles
			) {
				return {
					jsonBody: {
						message:
							"El registro desde nivel de las practicas pre profesionales no puede ser mayor al número de niveles",
					},
					status: 400,
				};
			}

			if (tituloObtenidoId) {
				const tituloObtenido =
					await this._tituloObtenidoService.getTituloObtenidoById(
						tituloObtenidoId,
					);

				if (!tituloObtenido)
					return {
						jsonBody: { message: "El titulo obtenido no existe" },
						status: 400,
					};

				const programa = await this._programaService.getProgramaById(
					tituloObtenido.programaId,
				);

				if (!programa)
					return {
						jsonBody: {
							message:
								"El titulo obtenido no tiene un programa enlazado, no se puede asignar",
						},
					};

				if (programa.id !== programaId)
					return {
						jsonBody: {
							message: "El titulo obtenido no pertenece al programa",
						},
					};
			}

			const newMallaCurricular =
				await this._mallaCurricularService.createMallaCurricular({
					...data,
					fechaAprobacion: new Date(fechaAprobacion),
					fechaLimiteVigencia: new Date(fechaLimiteVigencia),
					programaId,
					modalidadId,
					tituloObtenidoId,
					practicasComunitarias,
					practicasPreProfesionales,
					niveles,
				});

			ctx.log({ newMallaCurricular });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdatePrograma>>({
	alias: z.string().optional(),
	detalleNivelTitulacionId: z.string().optional(),
	estado: z.boolean().optional(),
});

const createTipoDocumentoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateTipoDocumentoEnPrograma, "programaId" | "tipoDocumentoId">
	>
>({
	requeridoDigital: z.boolean(),
	requeridoFisico: z.boolean(),
});

const createTituloObtenidoBodySchema = z.object<
	ZodInferSchema<Omit<ICreateTituloObtenido, "programaId">>
>({
	nombre: z.string(),
});

const createMallaCurricularBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateMallaCurricular,
			"fechaAprobacion" | "fechaLimiteVigencia" | "programaId"
		> & {
			fechaAprobacion: string;
			fechaLimiteVigencia: string;
			practicasPreProfesionales:
				| (Omit<ICreatePracticaPreProfesionalEnMalla, "mallaCurricularId"> & {
						registroDesdeNivel: number | null;
				  })
				| null;
			practicasComunitarias:
				| (Omit<ICreatePracticaComunitariaEnMalla, "mallaCurricularId"> & {
						registroDesdeNivel: number | null;
				  })
				| null;
		}
	>
>({
	tipoDuracion: z
		.enum(["ANOS", "CREDITOS", "HORAS", "SEMESTRES"] as const)
		.nullable(),
	codigo: z.string().nullable(),
	fechaAprobacion: z.string().datetime(),
	fechaLimiteVigencia: z.string().datetime(),
	cantidadOtrasMateriasMatricula: z.number(),
	limiteSeleccionMateriaPorAdministrativo: z.boolean(),
	cantidadArrastres: z.number().nullable(),
	porcentajeMinimoPasarNivel: z.number().nullable(),
	maximoMateriasAdelantar: z.number().nullable(),
	automatriculaModulos: z.boolean(),
	plantillasSilabo: z.boolean(),
	modeloPlanificacion: z.boolean(),
	perfilEgreso: z.string().nullable(),
	observaciones: z.string().nullable(),
	tituloObtenidoId: z.string().nullable(),
	modalidadId: z.string(),

	niveles: z.number(),
	practicasComunitarias: z
		.object({
			requiereAutorizacion: z.boolean(),
			creditos: z.number().nullable(),
			horas: z.number().nullable(),
			registroDesdeNivel: z.number().min(0).max(10).nullable(),
			registroPracticasAdelantadas: z.boolean(),
			registroMultiple: z.boolean(),
		})
		.nullable(),
	practicasPreProfesionales: z
		.object({
			requiereAutorizacion: z.boolean(),
			creditos: z.number().nullable(),
			horas: z.number().nullable(),
			registroDesdeNivel: z.number().min(0).max(10).nullable(),
			registroPracticasAdelantadas: z.boolean(),
		})
		.nullable(),
});