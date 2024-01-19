import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { ICreateCursoEscuela } from "../Domain/ICreateCursoEscuela";
import type { ICursoEscuelaController } from "../Domain/ICursoEscuelaController";
import type { ICursoEscuelaService } from "../Domain/ICursoEscuelaService";
import { CursoEscuelaService } from "./Service";

export class CursoEscuelaController implements ICursoEscuelaController {
	private _cursoEscuelaService: ICursoEscuelaService;

	constructor() {
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
	}

	async cursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const cursos = await this._cursoEscuelaService.getAllCursoEscuelas();

			return {
				jsonBody: { data: cursos, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const curso =
				await this._cursoEscuelaService.getCursoEscuelaById(cursoEscuelaId);

			return {
				jsonBody: { data: curso, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error);
				return {
					jsonBody: { message: "Peticion invalida" },
					status: 400,
				};
			}

			const newCurso = await this._cursoEscuelaService.createCursoEscuela({
				...bodyVal.data,
				fechaFin: new Date(bodyVal.data.fechaFin),
				fechaInicio: new Date(bodyVal.data.fechaInicio),
				fechaLimiteRegistro: new Date(bodyVal.data.fechaLimiteRegistro),
				plantillaId: null,
			});

			ctx.log({ newCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursoEscuelasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoEscuelaId = req.params.cursoEscuelaId;

			if (!cursoEscuelaId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._cursoEscuelaService.deleteCursoEscuelaById(cursoEscuelaId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateCursoEscuela,
			"plantillaId" | "fechaInicio" | "fechaFin" | "fechaLimiteRegistro"
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
	nivel: z.number(),
	cupos: z.number().nullable(),
	evaluaProfesor: z.boolean(),
	matriculaConDeuda: z.boolean(),
	legalizarMatriculas: z.boolean(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	verificarSesion: z.boolean(),
	registroDesdeOtraSede: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	aprobarCursoPrevio: z.boolean(),
});
