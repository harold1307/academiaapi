import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import { AsesorEstudianteService } from "../../AsesorEstudiante/Application/Service";
import type { IAsesorEstudianteService } from "../../AsesorEstudiante/Domain/IAsesorEstudianteService";
import { ResponsableEnAsesorEstudianteService } from "../../ResponsableEnAsesorEstudiante/Application/Service";
import type { IResponsableEnAsesorEstudianteService } from "../../ResponsableEnAsesorEstudiante/Domain/IResponsableEnAsesorEstudianteService";
import type { IResponsableAsesorEstudianteController } from "../Domain/IResponsableAsesorEstudianteController";
import type { IResponsableAsesorEstudianteService } from "../Domain/IResponsableAsesorEstudianteService";
import { ResponsableAsesorEstudianteService } from "./Service";

export class ResponsableAsesorEstudianteController
	implements IResponsableAsesorEstudianteController
{
	private _responsableAsesorEstudianteService: IResponsableAsesorEstudianteService;
	private _responsableEnAsesorEstudianteService: IResponsableEnAsesorEstudianteService;
	private _asesorEstudianteService: IAsesorEstudianteService;

	constructor() {
		this._responsableAsesorEstudianteService = StartupBuilder.resolve(
			ResponsableAsesorEstudianteService,
		);
		this._responsableEnAsesorEstudianteService = StartupBuilder.resolve(
			ResponsableEnAsesorEstudianteService,
		);
		this._asesorEstudianteService = StartupBuilder.resolve(
			AsesorEstudianteService,
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

	async responsablesAsesoresEstudianteCreateRelation(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const responsableAsesorEstudianteId =
				req.params.responsableAsesorEstudianteId;

			const asesorEstudianteId = req.params.asesorEstudianteId;

			if (!responsableAsesorEstudianteId || !asesorEstudianteId)
				return CommonResponse.invalidId();

			const responsable =
				await this._responsableAsesorEstudianteService.getResponsableAsesorEstudianteById(
					responsableAsesorEstudianteId,
				);

			if (!responsable)
				return {
					jsonBody: {
						message: "El responsable no existe",
					},
					status: 400,
				};

			const asesorEstudiante =
				this._asesorEstudianteService.getAsesorEstudianteById(
					asesorEstudianteId,
				);

			if (!asesorEstudiante)
				return {
					jsonBody: {
						message: "El asesor de estudiante no existe",
					},
					status: 400,
				};

			const newresponsableEnAsesorEstudiante =
				await this._responsableEnAsesorEstudianteService.createResponsableEnAsesorEstudiante(
					{
						asesorEstudianteId,
						responsableId: responsableAsesorEstudianteId,
					},
				);

			ctx.log({ newresponsableEnAsesorEstudiante });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async responsablesAsesoresEstudianteGetByIdWithAsesores(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const responsableAsesorEstudianteId =
				req.params.responsableAsesorEstudianteId;

			if (!responsableAsesorEstudianteId) return CommonResponse.invalidId();

			const responsableAsesorEstudiante =
				await this._responsableAsesorEstudianteService.getResponsableAsesorEstudianteByIdWithAsesores(
					responsableAsesorEstudianteId,
				);

			return CommonResponse.successful({ data: responsableAsesorEstudiante });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}
