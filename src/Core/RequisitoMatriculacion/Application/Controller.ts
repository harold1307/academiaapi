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
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import { TipoDocumentoService } from "../../TipoDocumento/Application/Service";
import type { ITipoDocumentoService } from "../../TipoDocumento/Domain/ITipoDocumentoService";
import type { IRequisitoMatriculacionController } from "../Domain/IRequisitoMatriculacionController";
import type { IRequisitoMatriculacionService } from "../Domain/IRequisitoMatriculacionService";
import type { IUpdateRequisitoMatriculacion } from "../Domain/IUpdateRequisitoMatriculacion";
import { RequisitoMatriculacionService } from "./Service";

export class RequisitoMatriculacionController
	implements IRequisitoMatriculacionController
{
	private _requisitoMatriculacionService: IRequisitoMatriculacionService;
	private _tipoDocumentoService: ITipoDocumentoService;
	private _modalidadService: IModalidadService;
	private _programaService: IProgramaService;
	private _sedeService: ISedeService;

	constructor() {
		this._requisitoMatriculacionService = StartupBuilder.resolve(
			RequisitoMatriculacionService,
		);
		this._tipoDocumentoService = StartupBuilder.resolve(TipoDocumentoService);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._sedeService = StartupBuilder.resolve(SedeService);
	}

	async requisitosMatriculacionGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.getAllRequisitoMatriculacions();

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.getRequisitoMatriculacionById(
					requisitoMatriculacionId,
				);

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const requisito =
				await this._requisitoMatriculacionService.getRequisitoMatriculacionById(
					requisitoMatriculacionId,
				);

			if (!requisito)
				return {
					jsonBody: { message: "El requisito de matriculacion no existe" },
					status: 400,
				};

			const { tipoDocumentoId, sedeId, programaId, modalidadId, ...data } =
				bodyVal.data;

			if (sedeId && sedeId !== requisito.sedeId) {
				const sede = await this._sedeService.getSedeById(sedeId);

				if (!sede)
					return {
						jsonBody: {
							message: "La sede no existe",
						},
						status: 400,
					};
			}

			if (programaId && programaId !== requisito.programaId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};
			}

			if (modalidadId && modalidadId !== requisito.modalidadId) {
				const modalidad =
					await this._modalidadService.getModalidadById(modalidadId);

				if (!modalidad)
					return {
						jsonBody: {
							message: "La modalidad no existe",
						},
						status: 400,
					};
			}

			if (tipoDocumentoId && tipoDocumentoId !== requisito.tipoDocumentoId) {
				const tipoDocumento =
					await this._tipoDocumentoService.getTipoDocumentoById(
						tipoDocumentoId,
					);

				if (!tipoDocumento)
					return {
						jsonBody: {
							message: "El tipo de documento no existe",
						},
						status: 400,
					};
			}

			const requisitoMatriculacion =
				await this._requisitoMatriculacionService.updateRequisitoMatriculacionById(
					{
						id: requisitoMatriculacionId,
						data: { ...data, tipoDocumentoId, sedeId, programaId, modalidadId },
					},
				);

			return CommonResponse.successful({ data: requisitoMatriculacion });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async requisitosMatriculacionDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const requisitoMatriculacionId = req.params.requisitoMatriculacionId;

			if (!requisitoMatriculacionId) return CommonResponse.invalidId();

			await this._requisitoMatriculacionService.deleteRequisitoMatriculacionById(
				requisitoMatriculacionId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateRequisitoMatriculacion>
>({
	obligatorio: z.boolean().optional(),
	transferenciaIES: z.boolean().optional(),
	primeraMatricula: z.boolean().optional(),
	repitenMaterias: z.boolean().optional(),
	descripcion: z.string().nullable().optional(),

	nivel: z.number().nullable().optional(),
	nombre: z.string().optional(),

	programaId: z.string().nullable().optional(),
	sedeId: z.string().optional(),
	modalidadId: z.string().nullable().optional(),
	tipoDocumentoId: z.string().optional(),
});
