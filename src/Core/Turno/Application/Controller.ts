import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ITurnoController } from "../Domain/ITurnoController";
import type { ITurnoService } from "../Domain/ITurnoService";
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

			const turno = await this._turnoService.getAllTurnos();

			return {
				jsonBody: { data: turno, message: "Solicitud exitosa" },
				status: 200,
			};
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

			if (!turnoId) {
				return {
					jsonBody: {
						message: "ID invalido o no proporcionado",
					},
					status: 400,
				};
			}

			const turno = await this._turnoService.getTurnoById(turnoId);

			return {
				jsonBody: { data: turno, message: "Solicitud exitosa" },
				status: 200,
			};
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

			if (!turnoId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._turnoService.deleteTurnoById(turnoId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}
