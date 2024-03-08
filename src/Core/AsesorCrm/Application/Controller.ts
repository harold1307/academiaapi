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
import { AsesorCrmEnCentroInformacionService } from "../../AsesorCrmEnCentroInformacion/Application/Service";
import type { IAsesorCrmEnCentroInformacionService } from "../../AsesorCrmEnCentroInformacion/Domain/IAsesorCrmEnCentroInformacionService";
import type { IUpdateAsesorCrmEnCentroInformacion } from "../../AsesorCrmEnCentroInformacion/Domain/IUpdateAsesorCrmEnCentroInformacion";
import type { IAsesorCrmController } from "../Domain/IAsesorCrmController";
import type { IAsesorCrmService } from "../Domain/IAsesorCrmService";
import { AsesorCrmService } from "./Service";

export class AsesorCrmController implements IAsesorCrmController {
	private _asesorCrmService: IAsesorCrmService;
	private _asesorCrmEnCentroInformacionService: IAsesorCrmEnCentroInformacionService;

	constructor() {
		this._asesorCrmService = StartupBuilder.resolve(AsesorCrmService);
		this._asesorCrmEnCentroInformacionService = StartupBuilder.resolve(
			AsesorCrmEnCentroInformacionService,
		);
	}

	async asesoresCrmUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const asesorCrmId = req.params.asesorCrmId;

			if (!asesorCrmId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { centroInformacionIds } = bodyVal.data;

			const asesor = await this._asesorCrmService.getAsesorCrmById(asesorCrmId);

			if (!asesor)
				return {
					jsonBody: {
						message: "El asesor de CRM no existe",
					},
					status: 400,
				};

			const asesorCrm =
				await this._asesorCrmEnCentroInformacionService.updateAsesorCrmEnCentroInformacionById(
					{
						asesorCrmId,
						centroInformacionIds,
					},
				);

			return CommonResponse.successful({ data: asesorCrm });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asesoresCrmGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asesoresCrm = await this._asesorCrmService.getAllAsesorCrms();

			return CommonResponse.successful({ data: asesoresCrm });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async asesoresCrmDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const asesorCrmId = req.params.asesorCrmId;

			if (!asesorCrmId) return CommonResponse.invalidId();

			await this._asesorCrmService.deleteAsesorCrmById(asesorCrmId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<Omit<IUpdateAsesorCrmEnCentroInformacion, "asesorCrmId">>
>({
	centroInformacionIds: z.array(z.string()),
});
