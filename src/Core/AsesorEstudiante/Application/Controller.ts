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
import type { IAsesorEstudianteController } from "../Domain/IAsesorEstudianteController";
import type { IAsesorEstudianteService } from "../Domain/IAsesorEstudianteService";
import type { IUpdateAsesorEstudiante } from "../Domain/IUpdateAsesorEstudiante";
import { AsesorEstudianteService } from "./Service";

export class AsesorEstudianteController implements IAsesorEstudianteController {
	private _asesorEstudianteService: IAsesorEstudianteService;

	constructor() {
		this._asesorEstudianteService = StartupBuilder.resolve(
			AsesorEstudianteService,
		);
	}

	async asesoresEstudianteGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asesorEstudiante =
				await this._asesorEstudianteService.getAllAsesorEstudiantes();

			return CommonResponse.successful({ data: asesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asesoresEstudianteGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asesorEstudianteId = req.params.asesorEstudianteId;

			if (!asesorEstudianteId) return CommonResponse.invalidId();

			const asesorEstudiante =
				await this._asesorEstudianteService.getAsesorEstudianteById(
					asesorEstudianteId,
				);

			return CommonResponse.successful({ data: asesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asesoresEstudianteDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asesorEstudianteId = req.params.asesorEstudianteId;

			if (!asesorEstudianteId) return CommonResponse.invalidId();

			await this._asesorEstudianteService.deleteAsesorEstudianteById(
				asesorEstudianteId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asesoresEstudianteUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asesorEstudianteId = req.params.asesorEstudianteId;

			if (!asesorEstudianteId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const asesorEstudiante =
				await this._asesorEstudianteService.updateAsesorEstudianteById({
					id: asesorEstudianteId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: asesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateAsesorEstudiante>>({
	seguimientoBienestar: z.boolean().optional(),
	seguimientoExpediente: z.boolean().optional(),
});
