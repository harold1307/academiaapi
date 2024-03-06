import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { IResponsableAsesorEstudianteController } from "../Domain/IResponsableAsesorEstudianteController";
import type { IResponsableAsesorEstudianteService } from "../Domain/IResponsableAsesorEstudianteService";
import { ResponsableAsesorEstudianteService } from "./Service";

export class ResponsableAsesorEstudianteController
	implements IResponsableAsesorEstudianteController
{
	private _responsableAsesorEstudianteService: IResponsableAsesorEstudianteService;

	constructor() {
		this._responsableAsesorEstudianteService = StartupBuilder.resolve(
			ResponsableAsesorEstudianteService,
		);
	}

	async responsablesAsesoresEstudianteGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableAsesorEstudiante =
				await this._responsableAsesorEstudianteService.getAllResponsableAsesorEstudiantes();

			return CommonResponse.successful({ data: responsableAsesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesAsesoresEstudianteGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const responsableAsesorEstudianteId =
				req.params.responsableAsesorEstudianteId;

			if (!responsableAsesorEstudianteId) return CommonResponse.invalidId();

			const responsableAsesorEstudiante =
				await this._responsableAsesorEstudianteService.getResponsableAsesorEstudianteById(
					responsableAsesorEstudianteId,
				);

			return CommonResponse.successful({ data: responsableAsesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesAsesoresEstudianteDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableAsesorEstudianteId =
				req.params.responsableAsesorEstudianteId;

			if (!responsableAsesorEstudianteId) return CommonResponse.invalidId();

			await this._responsableAsesorEstudianteService.deleteResponsableAsesorEstudianteById(
				responsableAsesorEstudianteId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}
