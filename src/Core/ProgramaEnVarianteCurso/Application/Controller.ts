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
import type { IProgramaEnVarianteCursoController } from "../Domain/IProgramaEnVarianteCursoController";
import type { IProgramaEnVarianteCursoService } from "../Domain/IProgramaEnVarianteCursoService";
import type { IUpdateProgramaEnVarianteCurso } from "../Domain/IUpdateProgramaEnVarianteCurso";
import { ProgramaEnVarianteCursoService } from "./Service";

export class ProgramaEnVarianteCursoController
	implements IProgramaEnVarianteCursoController
{
	private _programaEnVarianteCursoService: IProgramaEnVarianteCursoService;
	private _programaService: IProgramaService;
	private _mallaCurricularService: IMallaCurricularService;
	private _modalidadService: IModalidadService;

	constructor() {
		this._programaEnVarianteCursoService = StartupBuilder.resolve(
			ProgramaEnVarianteCursoService,
		);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._mallaCurricularService = StartupBuilder.resolve(
			MallaCurricularService,
		);
		this._modalidadService = StartupBuilder.resolve(ModalidadService);
	}

	async programasEnVariantesCursoGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaEnVarianteCursoId = req.params.programaEnVarianteCursoId;

			if (!programaEnVarianteCursoId) return CommonResponse.invalidId();

			const programaEnVarianteCurso =
				await this._programaEnVarianteCursoService.getProgramaEnVarianteCursoById(
					programaEnVarianteCursoId,
				);

			return CommonResponse.successful({ data: programaEnVarianteCurso });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasEnVariantesCursoDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const programaEnVarianteCursoId = req.params.programaEnVarianteCursoId;

			if (!programaEnVarianteCursoId) return CommonResponse.invalidId();

			await this._programaEnVarianteCursoService.deleteProgramaEnVarianteCursoById(
				programaEnVarianteCursoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async programasEnVariantesCursoUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const programaEnVarianteCursoId = req.params.programaEnVarianteCursoId;

			if (!programaEnVarianteCursoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { data } = bodyVal;

			const programaEnVarianteCurso =
				await this._programaEnVarianteCursoService.getProgramaEnVarianteCursoById(
					programaEnVarianteCursoId,
				);

			if (!programaEnVarianteCurso)
				return {
					jsonBody: {
						message: "El programa en variante de curso no existe",
					},
					status: 400,
				};

			if (programaEnVarianteCurso.programaId === data.programaId) {
				data.programaId = undefined;
			}

			if (programaEnVarianteCurso.mallaId === data.mallaId) {
				data.mallaId = undefined;
			}

			if (programaEnVarianteCurso.modalidadId === data.modalidadId) {
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

			const updatedProgramaEnVarianteCurso =
				await this._programaEnVarianteCursoService.updateProgramaEnVarianteCursoById(
					{
						id: programaEnVarianteCursoId,
						data,
					},
				);

			return CommonResponse.successful({
				data: updatedProgramaEnVarianteCurso,
			});
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<IUpdateProgramaEnVarianteCurso>
>({
	mallaId: z.string().nullable().optional(),
	modalidadId: z.string().nullable().optional(),
	programaId: z.string().optional(),
	registroExterno: z.boolean().optional(),
});
