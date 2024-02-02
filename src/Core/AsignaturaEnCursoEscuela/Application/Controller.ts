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
import { CursoEscuelaService } from "../../CursoEscuela/Application/Service";
import type { ICursoEscuelaService } from "../../CursoEscuela/Domain/ICursoEscuelaService";
import type { IAsignaturaEnCursoEscuelaController } from "../Domain/IAsignaturaEnCursoEscuelaController";
import type { IAsignaturaEnCursoEscuelaService } from "../Domain/IAsignaturaEnCursoEscuelaService";
import type { IUpdateAsignaturaEnCursoEscuela } from "../Domain/IUpdateAsignaturaEnCursoEscuela";
import { AsignaturaEnCursoEscuelaService } from "./Service";

export class AsignaturaEnCursoEscuelaController
	implements IAsignaturaEnCursoEscuelaController
{
	private _asignaturaEnCursoEscuelaService: IAsignaturaEnCursoEscuelaService;
	private _cursoEscuelaService: ICursoEscuelaService;

	constructor() {
		this._asignaturaEnCursoEscuelaService = StartupBuilder.resolve(
			AsignaturaEnCursoEscuelaService,
		);
		this._cursoEscuelaService = StartupBuilder.resolve(CursoEscuelaService);
	}

	async asignaturasEnCursoEscuelasGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturasEnCursoEscuelas =
				await this._asignaturaEnCursoEscuelaService.getAllAsignaturaEnCursoEscuelas();

			return CommonResponse.successful({ data: asignaturasEnCursoEscuelas });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) return CommonResponse.invalidId();

			const asignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.getAsignaturaEnCursoEscuelaById(
					asignaturaEnCursoEscuelaId,
				);

			return CommonResponse.successful({ data: asignaturaEnCursoEscuela });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.getAsignaturaEnCursoEscuelaById(
					asignaturaEnCursoEscuelaId,
				);

			if (!asignaturaEnCursoEscuela)
				return {
					jsonBody: {
						message: "La asignatura en curso escuela no existe",
					},
					status: 400,
				};

			const cursoEscuela = await this._cursoEscuelaService.getCursoEscuelaById(
				asignaturaEnCursoEscuela.cursoEscuelaId,
			);

			if (!cursoEscuela)
				return {
					jsonBody: {
						message:
							"La asignatura en curso escuela no tiene un curso escuela enlazado, contacte con soporte",
					},
					status: 400,
				};

			if (cursoEscuela.enUso)
				return {
					jsonBody: {
						message: "El curso escuela esta en uso, no se puede actualizar",
					},
					status: 400,
				};

			const newAsignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.updateAsignaturaEnCursoEscuelaById(
					{ data: bodyVal.data, id: asignaturaEnCursoEscuelaId },
				);

			ctx.log({ newAsignaturaEnCursoEscuela });

			return CommonResponse.successful({ data: newAsignaturaEnCursoEscuela });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asignaturasEnCursoEscuelasDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const asignaturaEnCursoEscuelaId = req.params.asignaturaEnCursoEscuelaId;

			if (!asignaturaEnCursoEscuelaId) return CommonResponse.invalidId();

			const asignaturaEnCursoEscuela =
				await this._asignaturaEnCursoEscuelaService.getAsignaturaEnCursoEscuelaById(
					asignaturaEnCursoEscuelaId,
				);

			if (!asignaturaEnCursoEscuela)
				return {
					jsonBody: {
						message: "La asignatura en curso escuela no existe",
					},
					status: 400,
				};

			const cursoEscuela = await this._cursoEscuelaService.getCursoEscuelaById(
				asignaturaEnCursoEscuela.cursoEscuelaId,
			);

			if (!cursoEscuela)
				return {
					jsonBody: {
						message:
							"La asignatura en curso escuela no tiene un curso escuela enlazado, contacte con soporte",
					},
					status: 400,
				};

			if (cursoEscuela.enUso)
				return {
					jsonBody: {
						message: "El curso escuela esta en uso, no se puede eliminar",
					},
					status: 400,
				};

			await this._asignaturaEnCursoEscuelaService.deleteAsignaturaEnCursoEscuelaById(
				asignaturaEnCursoEscuelaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateAsignaturaEnCursoEscuela>
>({
	validaCredito: z.boolean().optional(),
	validaPromedio: z.boolean().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	requeridoAprobar: z.boolean().optional(),
	asistenciaAprobar: z.number().optional(),
	asignaturaId: z.string().optional(),
	// @ts-expect-error ZodInferSchema doesnt work with nullable and optional types
	profesorId: z.string().nullable().optional(),
});
