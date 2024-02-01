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
import type { ITurnoController } from "../Domain/ITurnoController";
import type { ITurnoService } from "../Domain/ITurnoService";
import type { IUpdateTurno } from "../Domain/IUpdateTurno";
import { TurnoService } from "./Service";

export class TurnoController implements ITurnoController {
	private _turnoService: ITurnoService;

	constructor() {
		this._turnoService = StartupBuilder.resolve(TurnoService);
	}

	async turnosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const turnos = await this._turnoService.getAllTurnos();

			return CommonResponse.successful({ data: turnos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async turnosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const turnoId = req.params.turnoId;

			if (!turnoId) return CommonResponse.invalidId();

			const turno = await this._turnoService.getTurnoById(turnoId);

			return CommonResponse.successful({ data: turno });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async turnosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const turnoId = req.params.turnoId;

			if (!turnoId) return CommonResponse.invalidId();

			await this._turnoService.deleteTurnoById(turnoId);

			return CommonResponse.successful();
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async turnosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const turnoId = req.params.turnoId;

			if (!turnoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				data: { comienza, termina, ...data },
			} = bodyVal;

			const turno = await this._turnoService.updateTurnoById({
				id: turnoId,
				data: {
					...data,
					comienza: comienza ? new Date(comienza) : undefined,
					termina: termina ? new Date(termina) : undefined,
				},
			});

			return CommonResponse.successful({ data: turno });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateTurno, "comienza" | "termina"> & {
			comienza?: string;
			termina?: string;
		}
	>
>({
	horas: z.number().optional(),
	estado: z.boolean().optional(),
	comienza: z.string().datetime().optional(),
	termina: z.string().datetime().optional(),
});
