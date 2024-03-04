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
import { MallaCurricularService } from "../../MallaCurricular/Application/Service";
import type { IMallaCurricularService } from "../../MallaCurricular/Domain/IMallaCurricularService";
import { ModalidadService } from "../../Modalidad/Application/Service";
import type { IModalidadService } from "../../Modalidad/Domain/IModalidadService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import type { IProgramaEnCursoEscuelaController } from "../Domain/IProgramaEnCursoEscuelaController";
import type { IProgramaEnCursoEscuelaService } from "../Domain/IProgramaEnCursoEscuelaService";
import type { IUpdateProgramaEnCursoEscuela } from "../Domain/IUpdateProgramaEnCursoEscuela";
import { ProgramaEnCursoEscuelaService } from "./Service";

export class ProgramaEnCursoEscuelaController
	implements IProgramaEnCursoEscuelaController
{
	private _programaEnCursoEscuelaService: IProgramaEnCursoEscuelaService;
	private _programaService: IProgramaService;
	private _mallaCurricularService: IMallaCurricularService;
	private _modalidadService: IModalidadService;

	constructor() {
		this._programaEnCursoEscuelaService = StartupBuilder.resolve(
			ProgramaEnCursoEscuelaService,
		);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async programasEnCursosEscuelaGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaEnCursoEscuelaId = req.params.programaEnCursoEscuelaId;

			if (!programaEnCursoEscuelaId) return CommonResponse.invalidId();

			const programaEnCursoEscuela =
				await this._programaEnCursoEscuelaService.getProgramaEnCursoEscuelaById(
					programaEnCursoEscuelaId,
				);

			return CommonResponse.successful({ data: programaEnCursoEscuela });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasEnCursosEscuelaDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaEnCursoEscuelaId = req.params.programaEnCursoEscuelaId;

			if (!programaEnCursoEscuelaId) return CommonResponse.invalidId();

			await this._programaEnCursoEscuelaService.deleteProgramaEnCursoEscuelaById(
				programaEnCursoEscuelaId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasEnCursosEscuelaUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaEnCursoEscuelaId = req.params.programaEnCursoEscuelaId;

			if (!programaEnCursoEscuelaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { data } = bodyVal;

			const programaEnCursoEscuela =
				await this._programaEnCursoEscuelaService.getProgramaEnCursoEscuelaById(
					programaEnCursoEscuelaId,
				);

			if (!programaEnCursoEscuela)
				return {
					jsonBody: {
						message: "El programa en variante de curso no existe",
					},
					status: 400,
				};

			if (programaEnCursoEscuela.programaId === data.programaId) {
				data.programaId = undefined;
			}

			if (programaEnCursoEscuela.mallaId === data.mallaId) {
				data.mallaId = undefined;
			}

			if (programaEnCursoEscuela.modalidadId === data.modalidadId) {
				data.modalidadId = undefined;
			}

			if (data.programaId) {
				const programa = await this._programaService.getProgramaById(
					data.programaId,
				);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};
			}

			if (data.modalidadId) {
				const modalidad = await this._modalidadService.getModalidadById(
					data.modalidadId,
				);

				if (!modalidad)
					return {
						jsonBody: { message: "La modalidad no existe" },
						status: 400,
					};
			}

			if (data.mallaId) {
				const malla = await this._mallaCurricularService.getMallaCurricularById(
					data.mallaId,
				);

				if (!malla)
					return { jsonBody: { message: "La malla no existe" }, status: 400 };

				if (malla.programaId !== data.programaId)
					return {
						jsonBody: { message: "La malla no pertenece al programa" },
						status: 400,
					};

				if (data.modalidadId && malla.modalidadId !== data.modalidadId)
					return {
						jsonBody: { message: "La malla no pertenece a la modalidad" },
						status: 400,
					};
			}

			const updatedProgramaEnCursoEscuela =
				await this._programaEnCursoEscuelaService.updateProgramaEnCursoEscuelaById(
					{
						id: programaEnCursoEscuelaId,
						data: bodyVal.data,
					},
				);

			return CommonResponse.successful({ data: updatedProgramaEnCursoEscuela });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateProgramaEnCursoEscuela>
>({
	mallaId: z.string().nullable().optional(),
	programaId: z.string().optional(),
	modalidadId: z.string().nullable().optional(),
	registroExterno: z.boolean().optional(),
	nivelDesde: z.number().nullable().optional(),
	nivelHasta: z.number().nullable().optional(),
});
