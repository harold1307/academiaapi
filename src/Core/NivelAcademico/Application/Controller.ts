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
import type { INivelAcademicoController } from "../Domain/INivelAcademicoController";
import type { INivelAcademicoService } from "../Domain/INivelAcademicoService";
import type { IUpdateNivelAcademico } from "../Domain/IUpdateNivelAcademico";
import { NivelAcademicoService } from "./Service";

export class NivelAcademicoController implements INivelAcademicoController {
	private _nivelAcademicoService: INivelAcademicoService;

	constructor() {
		this._nivelAcademicoService = StartupBuilder.resolve(NivelAcademicoService);
	}

	async nivelesAcademicosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelesAcademicos =
				await this._nivelAcademicoService.getAllNivelAcademicos();

			return CommonResponse.successful({ data: nivelesAcademicos });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesAcademicosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelAcademicoId = req.params.nivelAcademicoId;

			if (!nivelAcademicoId) return CommonResponse.invalidId();

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					nivelAcademicoId,
				);

			return CommonResponse.successful({ data: nivelAcademico });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesAcademicosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelAcademicoId = req.params.nivelAcademicoId;

			if (!nivelAcademicoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const nivelAcademico =
				await this._nivelAcademicoService.updateNivelAcademicoById({
					id: nivelAcademicoId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: nivelAcademico });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesAcademicosDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelAcademicoId = req.params.nivelAcademicoId;

			if (!nivelAcademicoId) return CommonResponse.invalidId();

			await this._nivelAcademicoService.deleteNivelAcademicoById(
				nivelAcademicoId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateNivelAcademico>>({
	nombre: z.string().nullable().optional(),
	estado: z.boolean().optional(),
	profesores: z.boolean().optional(),
	horarios: z.boolean().optional(),
	cuposMaterias: z.boolean().optional(),
	planificacionProfesores: z.boolean().optional(),
	matriculacion: z.boolean().optional(),

	fechaInicio: z.date().optional(),
	fechaFin: z.date().optional(),
	inicioAgregaciones: z.date().optional(),
	limiteAgregaciones: z.date().optional(),
	validaRequisitosMalla: z.boolean().optional(),
	validaCumplimientoMaterias: z.boolean().optional(),
	horasMinimasPracticasComunitarias: z.number().nullable().optional(),
	horasMinimasPracticasPreprofesionales: z.number().nullable().optional(),
	estudiantesPuedenSeleccionarMaterias: z.boolean().optional(),
	estudiantesPuedenSeleccionarMateriasOtrosHorarios: z.boolean().optional(),
	estudiantesPuedenSeleccionarMateriasOtrasModalidades: z.boolean().optional(),
	estudiantesRegistranProyectosIntegradores: z.boolean().optional(),
	redireccionAPagos: z.boolean().optional(),
	limiteOrdinaria: z.date().optional(),
	limiteExtraordinaria: z.date().optional(),
	limiteEspecial: z.date().optional(),
	diasVencimientoMatricula: z.number().optional(),
	capacidad: z.number().optional(),
	mensaje: z.string().nullable().optional(),
	terminosCondiciones: z.string().nullable().optional(),

	paraleloId: z.string().optional(),
	modeloEvaluativoId: z.string().uuid().optional(),
});
