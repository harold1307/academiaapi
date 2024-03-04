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
import { AsignaturaService } from "../../Asignatura/Application/Service";
import type { IAsignaturaService } from "../../Asignatura/Domain/IAsignaturaService";
import { AsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoService } from "../../AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoService";
import type { ICreateAsignaturaEnVarianteCurso } from "../../AsignaturaEnVarianteCurso/Domain/ICreateAsignaturaEnVarianteCurso";
import { CursoEscuelaService } from "../../CursoEscuela/Application/Service";
import type { ICreateCursoEscuela } from "../../CursoEscuela/Domain/ICreateCursoEscuela";
import type { ICursoEscuelaService } from "../../CursoEscuela/Domain/ICursoEscuelaService";
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { ModeloEvaluativoService } from "../../ModeloEvaluativo/Application/Service";
import type { IModeloEvaluativoService } from "../../ModeloEvaluativo/Domain/IModeloEvaluativoService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { ProgramaEnVarianteCursoService } from "../../ProgramaEnVarianteCurso/Application/Service";
import type { ICreateProgramaEnVarianteCurso } from "../../ProgramaEnVarianteCurso/Domain/ICreateProgramaEnVarianteCurso";
import type { IProgramaEnVarianteCursoService } from "../../ProgramaEnVarianteCurso/Domain/IProgramaEnVarianteCursoService";
import type { IUpdateVarianteCurso } from "../Domain/IUpdateVarianteCurso";
import type { IVarianteCursoController } from "../Domain/IVarianteCursoController";
import type { IVarianteCursoService } from "../Domain/IVarianteCursoService";
import { VarianteCursoService } from "./Service";

export class VarianteCursoController implements IVarianteCursoController {
	private _varianteCursoService: IVarianteCursoService;
	private _asignaturaEnVarianteCursoService: IAsignaturaEnVarianteCursoService;
	private _cursoEscuelaService: ICursoEscuelaService;
	private _asignaturaService: IAsignaturaService;
	private _modeloEvaluativoService: IModeloEvaluativoService;
	private _programaEnVarianteCursoService: IProgramaEnVarianteCursoService;
	private _programaService: IProgramaService;
	private _mallaCurricularService: IMallaCurricularService;
	private _modalidadService: IModalidadService;

	constructor() {
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
		this._asignaturaEnVarianteCursoService = StartupBuilder.resolve(
			AsignaturaEnVarianteCursoService,
		);
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
		this._asignaturaService = StartupBuilder.resolve(AsignaturaService);
		this._modeloEvaluativoService = StartupBuilder.resolve(
			ModeloEvaluativoService,
		);
		this._programaEnVarianteCursoService = StartupBuilder.resolve(
			ProgramaEnVarianteCursoService,
		);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async variantesCursoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const varianteCurso =
				await this._varianteCursoService.updateVarianteCurso({
					id: varianteCursoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: varianteCurso });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) return CommonResponse.invalidId();

			await this._varianteCursoService.deleteVarianteCurso(varianteCursoId);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoByIdCreateAsignatura(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const varianteCursoId = req.params.varianteCursoId;
			const asignaturaId = req.params.asignaturaId;

			if (!varianteCursoId || !asignaturaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = byIdCreateAsignaturaBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const variante =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			if (!variante) {
				return {
					jsonBody: { message: "La variante de curso no existe" },
					status: 400,
				};
			}

			const asignatura =
				await this._asignaturaService.getAsignaturaById(asignaturaId);

			if (!asignatura) {
				return {
					jsonBody: {
						message: "La asignatura no existe",
					},
					status: 400,
				};
			}

			const { data } = bodyVal;

			if (data.modeloEvaluativoId) {
				const modelo =
					await this._modeloEvaluativoService.getModeloEvaluativoById(
						data.modeloEvaluativoId,
					);

				if (!modelo) {
					return {
						jsonBody: { message: "El modelo evaluativo no existe" },
						status: 400,
					};
				}
			}

			const newAsignaturaEnVarianteCurso =
				await this._asignaturaEnVarianteCursoService.createAsignaturaEnVarianteCurso(
					{
						asignaturaId,
						varianteCursoId,
						data,
					},
				);

			ctx.log({ newAsignaturaEnVarianteCurso });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoByIdGetAsignaturas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			return CommonResponse.successful({ data: varianteCurso });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoByIdCreateCursoEscuela(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado",
					},
					status: 400,
				};
			}

			const body = await req.json();

			const bodyVal = createByCursoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			if (!varianteCurso) {
				return {
					jsonBody: { message: "La variante de curso no existe" },
					status: 400,
				};
			}

			const newCurso = await this._cursoEscuelaService.createCursoEscuela({
				...varianteCurso,
				...bodyVal.data,
				fechaFin: new Date(bodyVal.data.fechaFin),
				fechaInicio: new Date(bodyVal.data.fechaInicio),
				fechaLimiteRegistro: new Date(bodyVal.data.fechaLimiteRegistro),
				plantillaId: varianteCursoId,
			});

			ctx.log({ newCurso });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoByIdCreateProgramaEnVariante(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createProgramaEnVarianteBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { mallaId, modalidadId, programaId, ...data } = bodyVal.data;

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithAsignaturasById(
					varianteCursoId,
				);

			if (!varianteCurso)
				return {
					jsonBody: { message: "La variante de curso no existe" },
					status: 400,
				};

			const programa = await this._programaService.getProgramaById(programaId);

			if (!programa)
				return {
					jsonBody: {
						message: "El programa no existe",
					},
					status: 400,
				};

			if (modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: { message: "La modalidad no existe" },
						status: 400,
					};
			}

			if (mallaId) {
				const malla =
					await this._mallaCurricularService.getMallaCurricularById(mallaId);

				if (!malla)
					return { jsonBody: { message: "La malla no existe" }, status: 400 };

				if (malla.programaId !== programaId)
					return {
						jsonBody: { message: "La malla no pertenece al programa" },
						status: 400,
					};

				if (modalidadId && malla.modalidadId !== modalidadId)
					return {
						jsonBody: { message: "La malla no pertenece a la modalidad" },
						status: 400,
					};
			}

			const newProgramaEnVariante =
				await this._programaEnVarianteCursoService.createProgramaEnVarianteCurso(
					{ ...data, programaId, varianteCursoId, modalidadId, mallaId },
				);

			ctx.log({ newProgramaEnVariante });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async variantesCursoByIdGetProgramas(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const varianteCursoId = req.params.varianteCursoId;

			if (!varianteCursoId) return CommonResponse.invalidId();

			const varianteCurso =
				await this._varianteCursoService.getVarianteCursoWithProgramasById(
					varianteCursoId,
				);

			return CommonResponse.successful({ data: varianteCurso });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateVarianteCurso>>({
	nombre: z.string().optional(),
	codigoBase: z.string().optional(),
	descripcion: z.string().optional(),
	registroExterno: z.boolean().optional(),
	registroInterno: z.boolean().optional(),
	edadMinima: z.number().nullable().optional(),
	edadMaxima: z.number().nullable().optional(),
	fechaAprobacion: z.date().optional(),
	registroDesdeOtraSede: z.boolean().optional(),
	costoPorMateria: z.boolean().optional(),
	cumpleRequisitosMalla: z.boolean().optional(),
	pasarRecord: z.boolean().optional(),
	estado: z.boolean().optional(),
	costoPorCantidadMateria: z.boolean().optional(),
	verificaSesion: z.boolean().optional(),
});

const byIdCreateAsignaturaBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAsignaturaEnVarianteCurso, "asignaturaId" | "varianteCursoId">
	>
>({
	validaCredito: z.boolean(),
	validaPromedio: z.boolean(),
	horasColaborativas: z.number(),
	horasAsistidasDocente: z.number(),
	horasAutonomas: z.number(),
	horasPracticas: z.number(),
	sumaHoras: z.boolean(),
	creditos: z.number(),
	requeridoAprobar: z.boolean(),
	modeloEvaluativoId: z.string().uuid().nullable(),
	asistenciaAprobar: z.number().nullable(),
	cantidadDecimales: z.number().nullable(),
	notaMaxima: z.number().nullable(),
	notaMinima: z.number().nullable(),
});

const createByCursoBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateCursoEscuela,
			| "plantillaId"
			| "fechaInicio"
			| "fechaFin"
			| "fechaLimiteRegistro"
			| "registroExterno"
			| "registroInterno"
			| "verificarSesion"
			| "registroDesdeOtraSede"
			| "edadMinima"
			| "edadMaxima"
			| "costoPorMateria"
			| "cumpleRequisitosMalla"
			| "pasarRecord"
			| "aprobarCursoPrevio"
		> & {
			fechaInicio: string;
			fechaFin: string;
			fechaLimiteRegistro: string;
		}
	>
>({
	nombre: z.string(),
	codigo: z.string().nullable(),
	paraleloId: z.string(),
	sesionId: z.string(),
	tema: z.string(),
	observaciones: z.string().nullable(),
	departamento: z.string().nullable(),
	fechaInicio: z.string(),
	fechaFin: z.string(),
	fechaLimiteRegistro: z.string(),
	diasLimitePago: z.number(),
	cupos: z.number().nullable(),
	evaluaProfesor: z.boolean(),
	matriculaConDeuda: z.boolean(),
	legalizarMatriculas: z.boolean(),
	verificaSesion: z.boolean(),
	periodoId: z.string(),
});

const createProgramaEnVarianteBodySchema = z.object<
	ZodInferSchema<Omit<ICreateProgramaEnVarianteCurso, "varianteCursoId">>
>({
	programaId: z.string(),
	mallaId: z.string().nullable(),
	modalidadId: z.string().nullable(),
	registroExterno: z.boolean(),
});
