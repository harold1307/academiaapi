import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import type { IMateriaEnNivelAcademicoController } from "../Domain/IMateriaEnNivelAcademicoController";
import type { IMateriaEnNivelAcademicoService } from "../Domain/IMateriaEnNivelAcademicoService";
import { MateriaEnNivelAcademicoService } from "./Service";
import { CommonResponse } from "../../../Utils/CommonResponse";
import type { IUpdateMateriaEnNivelAcademico } from "../Domain/IUpdateMateriaEnNivelAcademico";

export class MateriaEnNivelAcademicoController
	implements IMateriaEnNivelAcademicoController
{
	private _materiaEnNivelAcademicoService: IMateriaEnNivelAcademicoService;

	constructor() {
		this._materiaEnNivelAcademicoService = StartupBuilder.resolve(
			MateriaEnNivelAcademicoService,
		);
	}

	async materiasEnNivelesAcademicosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const materiaEnNivelAcademico =
				await this._materiaEnNivelAcademicoService.getAllMateriaEnNivelAcademicos();

			return CommonResponse.successful({ data: materiaEnNivelAcademico });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnNivelesAcademicosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const materiaEnNivelAcademicoId = req.params.materiaEnNivelAcademicoId;

			if (!materiaEnNivelAcademicoId) return CommonResponse.invalidId();

			const materiaEnNivelAcademico =
				await this._materiaEnNivelAcademicoService.getMateriaEnNivelAcademicoById(
					materiaEnNivelAcademicoId,
				);

			return CommonResponse.successful({ data: materiaEnNivelAcademico });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnNivelesAcademicosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const materiaEnNivelAcademicoId = req.params.materiaEnNivelAcademicoId;

			if (!materiaEnNivelAcademicoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { fechaFin, fechaInicio, ...data } = bodyVal.data;

			const materiaEnNivelAcademico =
				await this._materiaEnNivelAcademicoService.updateMateriaEnNivelAcademicoById(
					{
						id: materiaEnNivelAcademicoId,
						data: {
							...data,
							fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
							fechaFin: fechaFin ? new Date(fechaFin) : undefined,
						},
					},
				);

			return CommonResponse.successful({ data: materiaEnNivelAcademico });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnNivelesAcademicosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const materiaEnNivelAcademicoId = req.params.materiaEnNivelAcademicoId;

			if (!materiaEnNivelAcademicoId) return CommonResponse.invalidId();

			await this._materiaEnNivelAcademicoService.deleteMateriaEnNivelAcademicoById(
				materiaEnNivelAcademicoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateMateriaEnNivelAcademico, "fechaInicio" | "fechaFin"> & {
			fechaInicio?: string;
			fechaFin?: string;
		}
	>
>({
	estado: z.boolean().optional(),
	alias: z.string().nullable().optional(),
	fechaInicio: z.string().datetime().optional(),
	fechaFin: z.string().datetime().optional(),
	materiaExterna: z.boolean().optional(),
	validaParaCreditos: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	practicasPermitidas: z.boolean().optional(),
	sumaHorasProfesor: z.boolean().optional(),
});
