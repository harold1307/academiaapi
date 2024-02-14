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
import { PeriodoLectivoService } from "../../PeriodoLectivo/Application/Service";
import type { IPeriodoLectivoService } from "../../PeriodoLectivo/Domain/IPeriodoLectivoService";
import type { ICronogramaMatriculacionController } from "../Domain/ICronogramaMatriculacionController";
import type { ICronogramaMatriculacionService } from "../Domain/ICronogramaMatriculacionService";
import type { IUpdateCronogramaMatriculacion } from "../Domain/IUpdateCronogramaMatriculacion";
import { CronogramaMatriculacionService } from "./Service";

export class CronogramaMatriculacionController
	implements ICronogramaMatriculacionController
{
	private _cronogramaMatriculacionService: ICronogramaMatriculacionService;
	private _periodoLectivoService: IPeriodoLectivoService;

	constructor() {
		this._cronogramaMatriculacionService = StartupBuilder.resolve(
			CronogramaMatriculacionService,
		);
		this._periodoLectivoService = StartupBuilder.resolve(PeriodoLectivoService);
	}

	async cronogramasMatriculacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const cronogramaMatriculacionId = req.params.cronogramaMatriculacionId;

			if (!cronogramaMatriculacionId) return CommonResponse.invalidId();

			const cronogramaMatriculacion =
				await this._cronogramaMatriculacionService.getCronogramaMatriculacionById(
					cronogramaMatriculacionId,
				);

			return CommonResponse.successful({ data: cronogramaMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cronogramasMatriculacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const cronogramaMatriculacionId = req.params.cronogramaMatriculacionId;

			if (!cronogramaMatriculacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { fechaFin, fechaInicio } = bodyVal.data;

			const cronogramaMatriculacion =
				await this._cronogramaMatriculacionService.updateCronogramaMatriculacionById(
					{
						id: cronogramaMatriculacionId,
						data: {
							fechaFin: fechaFin ? new Date(fechaFin) : undefined,
							fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
						},
					},
				);

			return CommonResponse.successful({ data: cronogramaMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async cronogramasMatriculacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const cronogramaMatriculacionId = req.params.cronogramaMatriculacionId;

			if (!cronogramaMatriculacionId) return CommonResponse.invalidId();

			const cronograma =
				await this._cronogramaMatriculacionService.getCronogramaMatriculacionById(
					cronogramaMatriculacionId,
				);

			if (!cronograma)
				return {
					jsonBody: { message: "El cronograma no existe" },
					status: 400,
				};

			const periodo = await this._periodoLectivoService.getPeriodoLectivoById(
				cronograma.periodoId,
			);

			if (!periodo)
				return {
					jsonBody: { message: "El periodo no existe, contacte con soporte" },
					status: 400,
				};

			if (periodo.enUso)
				return {
					jsonBody: {
						message: "El periodo lectivo esta en uso, no se puede eliminar",
					},
					status: 400,
				};

			await this._cronogramaMatriculacionService.deleteCronogramaMatriculacionById(
				cronogramaMatriculacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateCronogramaMatriculacion, "fechaFin" | "fechaInicio"> & {
			fechaFin?: string;
			fechaInicio?: string;
		}
	>
>({
	fechaFin: z.string().datetime().optional(),
	fechaInicio: z.string().datetime().optional(),
});
