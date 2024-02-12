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
import { MateriaEnNivelAcademicoService } from "../../MateriaEnNivelAcademico/Application/Service";
import type { IMateriaEnNivelAcademicoService } from "../../MateriaEnNivelAcademico/Domain/IMateriaEnNivelAcademicoService";
import { mapLowercasedDays } from "../../NivelAcademico/Application/Controller";
import { UbicacionService } from "../../Ubicacion/Application/Service";
import type { IUbicacionService } from "../../Ubicacion/Domain/IUbicacionService";
import type { IMateriaEnHorarioController } from "../Domain/IMateriaEnHorarioController";
import type { IMateriaEnHorarioService } from "../Domain/IMateriaEnHorarioService";
import type { IUpdateMateriaEnHorario } from "../Domain/IUpdateMateriaEnHorario";
import { MateriaEnHorarioService } from "./Service";

export class MateriaEnHorarioController implements IMateriaEnHorarioController {
	private _materiaEnHorarioService: IMateriaEnHorarioService;
	private _materiaEnNivelAcademico: IMateriaEnNivelAcademicoService;
	private _ubicacionService: IUbicacionService;

	constructor() {
		this._materiaEnHorarioService = StartupBuilder.resolve(
			MateriaEnHorarioService,
		);
		this._materiaEnNivelAcademico = StartupBuilder.resolve(
			MateriaEnNivelAcademicoService,
		);
		this._ubicacionService = StartupBuilder.resolve(UbicacionService);
	}

	async materiasEnHorarioGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const materiasEnHorario =
				await this._materiaEnHorarioService.getAllMateriaEnHorarios();

			return CommonResponse.successful({ data: materiasEnHorario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnHorarioGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const materiaEnHorarioId = req.params.materiaEnHorarioId;

			if (!materiaEnHorarioId) return CommonResponse.invalidId();

			const materiaEnHorario =
				await this._materiaEnHorarioService.getMateriaEnHorarioById(
					materiaEnHorarioId,
				);

			return CommonResponse.successful({ data: materiaEnHorario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnHorarioUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const materiaEnHorarioId = req.params.materiaEnHorarioId;

			if (!materiaEnHorarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { turnoId, dia, ubicacionId } = bodyVal.data;

			const materiaEnHorario =
				await this._materiaEnHorarioService.getMateriaEnHorarioById(
					materiaEnHorarioId,
				);

			if (!materiaEnHorario)
				return {
					jsonBody: { message: "La materia en horario no existe" },
					status: 400,
				};

			if (ubicacionId && ubicacionId !== materiaEnHorario.ubicacionId) {
				const ubicacion =
					await this._ubicacionService.getUbicacionById(ubicacionId);

				if (!ubicacion)
					return {
						jsonBody: { message: "La ubicacion no existe" },
						status: 400,
					};

				if (ubicacion.tipo !== "AULA")
					return {
						jsonBody: { message: "La ubicacion no es una aula" },
						status: 400,
					};
			}

			const materiaEnNivelAcademico =
				await this._materiaEnNivelAcademico.getMateriaEnNivelAcademicoById(
					materiaEnHorario.materiaId,
				);

			if (!materiaEnNivelAcademico)
				return {
					jsonBody: { message: "La materia en nivel academico no existe" },
					status: 400,
				};

			if (!materiaEnHorario.nivelAcademico.horarios)
				return {
					jsonBody: {
						message: "El nivel academico tiene desactivado los horarios",
					},
					status: 400,
				};

			if (turnoId && turnoId !== materiaEnHorario.turnoId) {
				if (
					materiaEnHorario.turno.sesionId !==
					materiaEnHorario.nivelAcademico.sesionId
				)
					return {
						jsonBody: {
							message: "El turno no pertenece a la sesion del nivel academico",
						},
						status: 400,
					};

				if (
					!materiaEnHorario.turno.sesion[
						mapLowercasedDays[dia || materiaEnHorario.dia]
					]
				)
					return {
						jsonBody: {
							message: `La sesion del nivel academico no permite registrar materias en el dia ${dia}`,
						},
						status: 400,
					};
			}

			if (dia && dia !== materiaEnHorario.dia) {
				if (!materiaEnHorario.turno.sesion[mapLowercasedDays[dia]])
					return {
						jsonBody: {
							message: `La sesion del nivel academico no permite registrar materias en el dia ${dia}`,
						},
						status: 400,
					};
			}

			if (!materiaEnNivelAcademico.estado)
				return {
					jsonBody: {
						message:
							"La materia en nivel academico esta cerrada, no se puede actualizar",
					},
				};

			const updatedMateriaEnHorario =
				await this._materiaEnHorarioService.updateMateriaEnHorarioById({
					id: materiaEnHorarioId,
					data: { turnoId, dia, ubicacionId },
				});

			return CommonResponse.successful({ data: updatedMateriaEnHorario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async materiasEnHorarioDeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const materiaEnHorarioId = req.params.materiaEnHorarioId;

			if (!materiaEnHorarioId) return CommonResponse.invalidId();

			const materiaEnHorario =
				await this._materiaEnHorarioService.getMateriaEnHorarioById(
					materiaEnHorarioId,
				);

			if (!materiaEnHorario)
				return {
					jsonBody: { message: "La materia en horario no existe" },
					status: 400,
				};

			const materiaEnNivelAcademico =
				await this._materiaEnNivelAcademico.getMateriaEnNivelAcademicoById(
					materiaEnHorario.materiaId,
				);

			if (!materiaEnNivelAcademico)
				return {
					jsonBody: { message: "La materia en nivel academico no existe" },
					status: 400,
				};

			if (!materiaEnNivelAcademico.estado)
				return {
					jsonBody: {
						message:
							"La materia en nivel academico esta cerrada, no se puede eliminar",
					},
				};

			await this._materiaEnHorarioService.deleteMateriaEnHorarioById(
				materiaEnHorarioId,
			);

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<
	ZodInferSchema<
		Omit<IUpdateMateriaEnHorario, "fechaInicio" | "fechaFin"> & {
			fechaInicio?: string;
			fechaFin?: string;
		}
	>
>({
	dia: z
		.enum([
			"LUNES",
			"MARTES",
			"MIERCOLES",
			"JUEVES",
			"VIERNES",
			"SABADO",
			"DOMINGO",
		] as const)
		.optional(),
	turnoId: z.string().optional(),
	ubicacionId: z.string().optional(),
	fechaInicio: z.string().uuid().optional(),
	fechaFin: z.string().uuid().optional(),
});
