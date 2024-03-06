import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { IResponsableEnAsesorEstudianteController } from "../Domain/IResponsableEnAsesorEstudianteController";
import type { IResponsableEnAsesorEstudianteService } from "../Domain/IResponsableEnAsesorEstudianteService";
import { ResponsableEnAsesorEstudianteService } from "./Service";

export class ResponsableEnAsesorEstudianteController
	implements IResponsableEnAsesorEstudianteController
{
	private _responsableEnAsesorEstudianteService: IResponsableEnAsesorEstudianteService;

	constructor() {
		this._responsableEnAsesorEstudianteService = StartupBuilder.resolve(
			ResponsableEnAsesorEstudianteService,
		);
	}

	async responsablesEnAsesoresEstudianteDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableEnAsesorEstudianteId =
				req.params.responsableEnAsesorEstudianteId;

			if (!responsableEnAsesorEstudianteId) return CommonResponse.invalidId();

			await this._responsableEnAsesorEstudianteService.deleteResponsableEnAsesorEstudianteById(
				responsableEnAsesorEstudianteId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}
