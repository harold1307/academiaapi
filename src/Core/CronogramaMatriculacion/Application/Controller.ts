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
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { PeriodoLectivoService } from "../../PeriodoLectivo/Application/Service";
import type { IPeriodoLectivoService } from "../../PeriodoLectivo/Domain/IPeriodoLectivoService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import type { ICronogramaMatriculacionController } from "../Domain/ICronogramaMatriculacionController";
import type { ICronogramaMatriculacionService } from "../Domain/ICronogramaMatriculacionService";
import type { IUpdateCronogramaMatriculacion } from "../Domain/IUpdateCronogramaMatriculacion";
import { CronogramaMatriculacionService } from "./Service";

export class CronogramaMatriculacionController
	implements ICronogramaMatriculacionController
{
	private _cronogramaMatriculacionService: ICronogramaMatriculacionService;
	private _periodoLectivoService: IPeriodoLectivoService;
	private _modalidadService: IModalidadService;
	private _programaService: IProgramaService;
	private _sedeService: ISedeService;

	constructor() {
		this._cronogramaMatriculacionService = StartupBuilder.resolve(
			CronogramaMatriculacionService,
		);
		this._periodoLectivoService = StartupBuilder.resolve(PeriodoLectivoService);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._sedeService = StartupBuilder.resolve(SedeService);
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

			const {
				fechaFin,
				fechaInicio,
				modalidadId,
				programaId,
				sedeId,
				...rest
			} = bodyVal.data;

			if (programaId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};
			}

			if (sedeId) {
				const sede = await this._sedeService.getSedeById(sedeId);

				if (!sede)
					return {
						jsonBody: {
							message: "La sede no existe",
						},
						status: 400,
					};
			}

			if (modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: {
							message: "La modalidad no existe",
						},
						status: 400,
					};
			}

			const cronogramaMatriculacion =
				await this._cronogramaMatriculacionService.updateCronogramaMatriculacionById(
					{
						id: cronogramaMatriculacionId,
						data: {
							...rest,
							fechaFin: fechaFin ? new Date(fechaFin) : undefined,
							fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
							modalidadId,
							programaId,
							sedeId,
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
	modalidadId: z.string().nullable().optional(),
	nivel: z.number().nullable().optional(),
	programaId: z.string().optional(),
	sedeId: z.string().optional(),
});
