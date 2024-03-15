import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import type { Dia } from "@prisma/client";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { MateriaEnHorarioService } from "../../MateriaEnHorario/Application/Service";
import type { ICreateMateriaEnHorario } from "../../MateriaEnHorario/Domain/ICreateMateriaEnHorario";
import type { IMateriaEnHorarioService } from "../../MateriaEnHorario/Domain/IMateriaEnHorarioService";
import { MateriaEnNivelAcademicoService } from "../../MateriaEnNivelAcademico/Application/Service";
import type { ICreateMateriaEnNivelAcademico } from "../../MateriaEnNivelAcademico/Domain/ICreateMateriaEnNivelAcademico";
import type { IMateriaEnNivelAcademicoService } from "../../MateriaEnNivelAcademico/Domain/IMateriaEnNivelAcademicoService";
import { TurnoService } from "../../Turno/Application/Service";
import type { ITurnoService } from "../../Turno/Domain/ITurnoService";
import { UbicacionService } from "../../Ubicacion/Application/Service";
import type { IUbicacionService } from "../../Ubicacion/Domain/IUbicacionService";
import type { INivelAcademicoController } from "../Domain/INivelAcademicoController";
import type { INivelAcademicoService } from "../Domain/INivelAcademicoService";
import type { IUpdateNivelAcademico } from "../Domain/IUpdateNivelAcademico";
import { NivelAcademicoService } from "./Service";

export class NivelAcademicoController implements INivelAcademicoController {
	private _nivelAcademicoService: INivelAcademicoService;
	private _materiaEnNivelAcademicoService: IMateriaEnNivelAcademicoService;
	private _materiaEnHorarioService: IMateriaEnHorarioService;
	private _turnoService: ITurnoService;
	private _ubicacionService: IUbicacionService;

	constructor() {
		this._nivelAcademicoService = StartupBuilder.resolve(NivelAcademicoService);
		this._materiaEnNivelAcademicoService = StartupBuilder.resolve(
			MateriaEnNivelAcademicoService,
		);
		this._materiaEnHorarioService = StartupBuilder.resolve(
			MateriaEnHorarioService,
		);
		this._turnoService = StartupBuilder.resolve(TurnoService);
		this._ubicacionService = StartupBuilder.resolve(UbicacionService);
	}

	async nivelesAcademicosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelesAcademicos =
				await this._nivelAcademicoService.getAllNivelesAcademicos({
					filters: Object.fromEntries(req.query.entries()),
				});

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

	async nivelesAcademicosGetByIdWithMaterias(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const nivelAcademicoId = req.params.nivelAcademicoId;

			if (!nivelAcademicoId) return CommonResponse.invalidId();

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoByIdWithMaterias(
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

	async nivelesAcademicosCreateMaterias(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelAcademicoId = req.params.nivelAcademicoId;

			if (!nivelAcademicoId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createMateriasBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					nivelAcademicoId,
				);

			if (!nivelAcademico)
				return {
					jsonBody: { message: "El nivel academico no existe" },
					status: 400,
				};

			if (!nivelAcademico.estado)
				return {
					jsonBody: {
						message:
							"El nivel academico no esta activo, no se pueden crear nuevas materias",
					},
					status: 400,
				};

			const materiasCreadas =
				await this._materiaEnNivelAcademicoService.createMateriasEnNivelAcademico(
					{ ...bodyVal.data, nivelAcademicoId },
				);

			ctx.log({ materiasCreadas });

			return CommonResponse.successful({ data: materiasCreadas, status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async nivelesAcademicosCreateMateriaEnHorario(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const nivelAcademicoId = req.params.nivelAcademicoId;
			const materiaId = req.params.materiaId;

			if (!nivelAcademicoId || !materiaId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createMateriaEnHorarioBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					nivelAcademicoId,
				);

			if (!nivelAcademico)
				return {
					jsonBody: { message: "El nivel academico no existe" },
					status: 400,
				};

			if (!nivelAcademico.horarios)
				return {
					jsonBody: {
						message: "El nivel academico tiene desactivado los horarios",
					},
					status: 400,
				};

			const materia =
				await this._materiaEnNivelAcademicoService.getMateriaEnNivelAcademicoById(
					materiaId,
				);

			if (!materia)
				return { jsonBody: { message: "La materia no existe" }, status: 400 };

			if (materia.nivelAcademicoId !== nivelAcademicoId)
				return {
					jsonBody: { message: "La materia no pertenece al nivel academico" },
					status: 400,
				};

			if (!materia.estado)
				return {
					jsonBody: {
						message: "La materia esta cerrada, no se puede crear en horario",
					},
					status: 400,
				};

			const { turnoId, dia, ubicacionId, fechaInicio, fechaFin } = bodyVal.data;

			const turno = await this._turnoService.getTurnoById(turnoId);

			if (!turno)
				return { jsonBody: { message: "El turno no existe" }, status: 400 };

			if (turno.sesionId !== nivelAcademico.sesionId) {
				return {
					jsonBody: {
						message: "El turno no pertenece a la sesion del nivel academico",
					},
					status: 400,
				};
			}

			if (!turno.sesion[mapLowercasedDays[dia]]) {
				return {
					jsonBody: {
						message: `La sesion del nivel academico no permite registrar materias en el dia ${dia}`,
					},
					status: 400,
				};
			}

			const ubicacion =
				await this._ubicacionService.getUbicacionById(ubicacionId);

			if (!ubicacion)
				return { jsonBody: { message: "La ubicacion no existe" }, status: 400 };

			if (ubicacion.tipo !== "AULA")
				return {
					jsonBody: { message: "La ubicacion no es una aula" },
					status: 400,
				};

			const newMateriaEnHorario =
				await this._materiaEnHorarioService.createMateriaEnHorario({
					turnoId,
					dia,
					nivelAcademicoId,
					materiaId,
					ubicacionId,
					fechaInicio: new Date(fechaInicio),
					fechaFin: new Date(fechaFin),
				});

			ctx.log({ newMateriaEnHorario });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const createMateriaEnHorarioBodySchema = z.object<
	ZodInferSchema<
		Omit<
			ICreateMateriaEnHorario,
			"nivelAcademicoId" | "materiaId" | "fechaInicio" | "fechaFin"
		> & {
			fechaInicio: string;
			fechaFin: string;
		}
	>
>({
	dia: z.enum([
		"LUNES",
		"MARTES",
		"MIERCOLES",
		"JUEVES",
		"VIERNES",
		"SABADO",
		"DOMINGO",
	] as const),
	turnoId: z.string(),
	ubicacionId: z.string(),
	fechaInicio: z.string().datetime(),
	fechaFin: z.string().datetime(),
});

const createMateriasBodySchema = z.object<
	ZodInferSchema<Omit<ICreateMateriaEnNivelAcademico, "nivelAcademicoId">>
>({
	modeloEvaluativoId: z.string(),
	asignaturasMalla: z.array(z.string()),
	modulosMalla: z.array(z.string()),
});

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

export const mapLowercasedDays: Record<Dia, Lowercase<Dia>> = {
	LUNES: "lunes",
	MARTES: "martes",
	MIERCOLES: "miercoles",
	JUEVES: "jueves",
	VIERNES: "viernes",
	SABADO: "sabado",
	DOMINGO: "domingo",
};
