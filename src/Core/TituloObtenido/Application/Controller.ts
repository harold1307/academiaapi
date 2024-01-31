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
import type { ITituloObtenidoController } from "../Domain/ITituloObtenidoController";
import type { ITituloObtenidoService } from "../Domain/ITituloObtenidoService";
import type { IUpdateTituloObtenido } from "../Domain/IUpdateTituloObtenido";
import { TituloObtenidoService } from "./Service";

export class TituloObtenidoController implements ITituloObtenidoController {
	private _tituloObtenidoService: ITituloObtenidoService;

	constructor() {
		this._tituloObtenidoService = StartupBuilder.resolve(TituloObtenidoService);
	}

	async titulosObtenidosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tituloObtenido =
				await this._tituloObtenidoService.getAllTitulosObtenidos();

			return CommonResponse.successful({ data: tituloObtenido });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async titulosObtenidosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tituloObtenidoId = req.params.tituloObtenidoId;

			if (!tituloObtenidoId) return CommonResponse.invalidId();

			const titulosObtenidos =
				await this._tituloObtenidoService.getTituloObtenidoById(
					tituloObtenidoId,
				);

			return CommonResponse.successful({ data: titulosObtenidos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async titulosObtenidosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const tituloObtenidoId = req.params.tituloObtenidoId;

			if (!tituloObtenidoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const tituloObtenido =
				await this._tituloObtenidoService.updateTituloObtenidoById({
					id: tituloObtenidoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: tituloObtenido });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async titulosObtenidosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tituloObtenidoId = req.params.tituloObtenidoId;

			if (!tituloObtenidoId) return CommonResponse.invalidId();

			await this._tituloObtenidoService.deleteTituloObtenidoById(
				tituloObtenidoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateTituloObtenido>>({
	nombre: z.string().optional(),
});
