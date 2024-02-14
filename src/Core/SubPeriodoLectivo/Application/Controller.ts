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
import type { ISubPeriodoLectivoController } from "../Domain/ISubPeriodoLectivoController";
import type { ISubPeriodoLectivoService } from "../Domain/ISubPeriodoLectivoService";
import type { IUpdateSubPeriodoLectivo } from "../Domain/IUpdateSubPeriodoLectivo";
import { SubPeriodoLectivoService } from "./Service";

export class SubPeriodoLectivoController
	implements ISubPeriodoLectivoController
{
	private _subPeriodoLectivoService: ISubPeriodoLectivoService;

	constructor() {
		this._subPeriodoLectivoService = StartupBuilder.resolve(
			SubPeriodoLectivoService,
		);
	}

	async subPeriodosLectivosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const subPeriodoLectivo =
				await this._subPeriodoLectivoService.getAllSubPeriodoLectivos();

			return CommonResponse.successful({ data: subPeriodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async subPeriodosLectivosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const subPeriodoLectivoId = req.params.subPeriodoLectivoId;

			if (!subPeriodoLectivoId) return CommonResponse.invalidId();

			const subPeriodoLectivo =
				await this._subPeriodoLectivoService.getSubPeriodoLectivoById(
					subPeriodoLectivoId,
				);

			return CommonResponse.successful({ data: subPeriodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async subPeriodosLectivosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const subPeriodoLectivoId = req.params.subPeriodoLectivoId;

			if (!subPeriodoLectivoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { fechaFin, fechaInicio, ...data } = bodyVal.data;

			const subPeriodoLectivo =
				await this._subPeriodoLectivoService.updateSubPeriodoLectivoById({
					id: subPeriodoLectivoId,
					data: {
						...data,
						fechaFin: fechaFin ? new Date(fechaFin) : undefined,
						fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
					},
				});

			return CommonResponse.successful({ data: subPeriodoLectivo });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async subPeriodosLectivosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const subPeriodoLectivoId = req.params.subPeriodoLectivoId;

			if (!subPeriodoLectivoId) return CommonResponse.invalidId();

			await this._subPeriodoLectivoService.deleteSubPeriodoLectivoById(
				subPeriodoLectivoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateSubPeriodoLectivo, "fechaFin" | "fechaInicio"> & {
			fechaFin?: string;
			fechaInicio?: string;
		}
	>
>({
	fechaFin: z.string().datetime().optional(),
	fechaInicio: z.string().datetime().optional(),
	nombre: z.string().optional(),
});
