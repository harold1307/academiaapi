import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import type { IParaleloController } from "../Domain/IParaleloController";
import type { IParaleloService } from "../Domain/IParaleloService";
import { ParaleloService } from "./Service";

export class ParaleloController implements IParaleloController {
	private _paraleloService: IParaleloService;

	constructor() {
		this._paraleloService = StartupBuilder.resolve(ParaleloService);
	}

	async paralelosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const body = await req.json();

			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) {
				return {
					jsonBody: "PeticionInvalida",
					status: 400,
				};
			}

			const newParalelo = await this._paraleloService.createParalelo(
				bodyVal.data,
			);

			ctx.log({ newCurso: newParalelo });

			return { jsonBody: { message: "Creacion exitosa." }, status: 201 };
		} catch (error) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return { jsonBody: { message: "Error" }, status: 500 };
		}
	}

	async paralelosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const paralelos = await this._paraleloService.getAllParalelos();

			return {
				jsonBody: { data: paralelos, message: "Solicitud exitosa" },
				status: 200,
			};
		} catch (error) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return { jsonBody: { message: "Error" }, status: 500 };
		}
	}

	async paralelosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const paraleloId = req.params.paraleloId;

			if (!paraleloId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			const paralelo = await this._paraleloService.getParaleloById(paraleloId);

			return {
				jsonBody: { data: paralelo, message: "Solicitud exitosa." },
				status: 200,
			};
		} catch (error: any) {
			ctx.error(error);

			return {
				jsonBody: {
					message: error.message,
				},
				status: 500,
			};
		}
	}

	async paralelosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const paraleloId = req.params.paraleloId;

			if (!paraleloId) {
				return {
					jsonBody: {
						message: "El ID es invalido o no ha sido proporcionado.",
					},
					status: 400,
				};
			}

			await this._paraleloService.deleteParaleloById(paraleloId);

			return {
				jsonBody: { message: "Recurso eliminado con exito." },
				status: 200,
			};
		} catch (error: any) {
			ctx.error(error);

			if (error instanceof SyntaxError) {
				return { jsonBody: { message: "Peticion invalida." }, status: 400 };
			}

			return {
				jsonBody: {
					message: error.message,
				},
				status: 500,
			};
		}
	}
}

const createBodySchema = z.object({
	nombre: z.string(),
	orden: z.number().int(),
});
