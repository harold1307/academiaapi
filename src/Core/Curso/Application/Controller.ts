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
import { VarianteCursoService } from "../../VarianteCurso/Application/Service";
import type { ICreateVarianteCurso } from "../../VarianteCurso/Domain/ICreateVarianteCurso";
import type { IVarianteCursoService } from "../../VarianteCurso/Domain/IVarianteCursoService";
import type { ICreateCurso } from "../Domain/ICreateCurso";
import type { ICursoController } from "../Domain/ICursoController";
import type { ICursoService } from "../Domain/ICursoService";
import type { IUpdateCurso } from "../Domain/IUpdateCurso";
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

			return CommonResponse.successful({ data: cursos });
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

			if (!cursoId) return CommonResponse.invalidId();

			const curso = await this._cursoService.getCursoById(cursoId);

			return CommonResponse.successful({ data: curso });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newCurso = await this._cursoService.createCurso(bodyVal.data);

			ctx.log({ newCurso });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
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

			if (!cursoId) return CommonResponse.invalidId();

			await this._cursoService.deleteCursoById(cursoId);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const cursoId = req.params.cursoId;

			if (!cursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const curso = await this._cursoService.updateCursoById({
				id: cursoId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: curso });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cursosCreateVarianteCurso(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const cursoId = req.params.cursoId;

			if (!cursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createVarianteCursoBodySchema.safeParse(body);

			if (!bodyVal.success) {
				ctx.error(bodyVal.error.issues);

				return CommonResponse.invalidBody();
			}

			const curso = await this._cursoService.getCursoById(cursoId);

			if (!curso)
				return {
					jsonBody: { message: "La plantilla de curso no existe." },
					status: 400,
				};

			const { fechaAprobacion, ...data } = bodyVal.data;

			const varianteCurso =
				await this._varianteCursoService.createVarianteCurso({
					cursoId,
					data: {
						...data,
						fechaAprobacion: new Date(fechaAprobacion),
					},
				});

			ctx.log({ varianteCurso });

			return CommonResponse.successful({ status: 201 });
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

			if (!cursoId) return CommonResponse.invalidId();

			const curso =
				await this._cursoService.getCursoWithAllVarianteCursos(cursoId);

			return CommonResponse.successful({ data: curso });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateCurso>>({
	nombre: z.string(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateCurso>>({
	estado: z.boolean().optional(),
	nombre: z.string().optional(),
});

const createVarianteCursoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateVarianteCurso, "fechaAprobacion"> & {
			fechaAprobacion: string;
		}
	>
>({
	nombre: z.string(),
	codigoBase: z.string(),
	descripcion: z.string(),
	registroExterno: z.boolean(),
	registroInterno: z.boolean(),
	edadMinima: z.number().nullable(),
	edadMaxima: z.number().nullable(),
	fechaAprobacion: z.string().datetime(),
	registroDesdeOtraSede: z.boolean(),
	costoPorMateria: z.boolean(),
	cumpleRequisitosMalla: z.boolean(),
	pasarRecord: z.boolean(),
	costoPorCantidadMateria: z.boolean(),
	verificaSesion: z.boolean(),
});
