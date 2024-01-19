import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { VarianteCursoService } from "../../VarianteCurso/Application/Service";
import type { ICreateVarianteCurso } from "../../VarianteCurso/Domain/ICreateVarianteCurso";
import type { IVarianteCursoService } from "../../VarianteCurso/Domain/IVarianteCursoService";
import type { ICursoController } from "../Domain/ICursoController";
import type { ICursoService } from "../Domain/ICursoService";
import { CursoService } from "./Service";

export class CursoController implements ICursoController {
	private _cursoService: ICursoService;
	private _varianteCursoService: IVarianteCursoService;
	constructor() {
		this._cursoService = StartupBuilder.resolve(CursoService);
		this._varianteCursoService = StartupBuilder.resolve(VarianteCursoService);
	}

	async cursosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const cursos = await this._cursoService.getAllCursos();

			return {
				jsonBody: { data: cursos, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoId = req.params.cursoId;

			if (!cursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const curso = await this._cursoService.getCursoById(cursoId);

			return {
				jsonBody: { data: curso, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const newCurso = await this._cursoService.createCurso(body);

			ctx.log({ newCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoId = req.params.cursoId;

			if (!cursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._cursoService.deleteCursoById(cursoId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoId = req.params.cursoId;

			if (!cursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const body = await req.json();

			const curso = await this._cursoService.updateCursoById({
				id: cursoId,
				curso: body,
			});

			return {
				jsonBody: { data: curso, message: "Actualizacion exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosCreateVarianteCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const bodyVal = createVarianteCursoBodySchema.safeParse(body);
			const cursoId = req.params.cursoId;

			if (!bodyVal.success || !cursoId) {
				if (!bodyVal.success) {
					console.error(JSON.stringify(bodyVal.error, null, 2));
				}
				return {
					jsonBody: {
						message: "Peticion invalida",
					},
					status: 400,
				};
			}

			const { data } = bodyVal;

			const varianteCurso =
				await this._varianteCursoService.createVarianteCurso({
					cursoId,
					data,
				});

			ctx.log({ varianteCurso });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosByIdGetVarianteCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const cursoId = req.params.cursoId;

			if (!cursoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const curso =
				await this._cursoService.getCursoWithAllVarianteCursos(cursoId);

			return {
				jsonBody: { data: curso, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createVarianteCursoBodySchema = z
	.object<ZodInferSchema<ICreateVarianteCurso>>({
		nombre: z.string(),
		codigoBase: z.string(),
		descripcion: z.string(),
		registroExterno: z.boolean(),
		registroInterno: z.boolean(),
		verificarSesion: z.boolean(),
		edadMinima: z.number().nullable(),
		edadMaxima: z.number().nullable(),
		fechaAprobacion: z.string().datetime(),
		registroDesdeOtraSede: z.boolean(),
		costoPorMateria: z.boolean(),
		cumpleRequisitosMalla: z.boolean(),
		pasarRecord: z.boolean(),
		aprobarCursoPrevio: z.boolean(),
	})
	.superRefine(({ edadMaxima, edadMinima }, ctx) => {
		if (
			(edadMaxima !== null && edadMinima === null) ||
			(edadMaxima === null && edadMinima !== null)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Edad maxima y edad minima deben ser ambos null o numeros",
			});

			return;
		}

		if (edadMaxima !== null && edadMinima !== null && edadMaxima < edadMinima) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Si verificar edad, la edad maxima debe ser mayor.",
			});
		}
	});
