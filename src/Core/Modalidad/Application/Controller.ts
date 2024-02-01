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
import type { ICreateModalidad } from "../Domain/ICreateModalidad";
import type { IModalidadController } from "../Domain/IModalidadController";
import type { IModalidadService } from "../Domain/IModalidadService";
import type { IUpdateModalidad } from "../Domain/IUpdateModalidad";
import { ModalidadService } from "./Service";

export class ModalidadController implements IModalidadController {
	private _modalidadService: IModalidadService;
	constructor() {
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async modalidadesGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const modalidades = await this._modalidadService.getAllModalidades();

			return CommonResponse.successful({ data: modalidades });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modalidadesGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const modalidadId = req.params.modalidadId;

			if (!modalidadId) return CommonResponse.invalidId();

			const modalidad =
				await this._modalidadService.getModalidadById(modalidadId);

			return CommonResponse.successful({ data: modalidad });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modalidadesCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const newModalidad = await this._modalidadService.createModalidad(
				bodyVal.data,
			);

			ctx.log({ newModalidad });

			return CommonResponse.successful({ status: 201 });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modalidadesUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);
			const modalidadId = req.params.modalidadId;

			if (!modalidadId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const modalidad = await this._modalidadService.updateModalidadById({
				id: modalidadId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: modalidad });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async modalidadesDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url "${req.url}"`);

			const modalidadId = req.params.modalidadId;

			if (!modalidadId) return CommonResponse.invalidId();

			await this._modalidadService.deleteModalidadById(modalidadId);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createBodySchema = z.object<ZodInferSchema<ICreateModalidad>>({
	nombre: z.string(),
	alias: z.string().nullable(),
});

const updateBodySchema = z.object<ZodInferSchema<IUpdateModalidad>>({
	// @ts-expect-error ZodInferSchema not well implemented for nullable and optional field
	alias: z.string().nullable().optional(),
	nombre: z.string().optional(),
});
