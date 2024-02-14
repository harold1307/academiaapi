import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICronogramaMatriculacion } from "../../../CronogramaMatriculacion/Domain/ICronogramaMatriculacion";
import type { ICreatePeriodoLectivo } from "../../Domain/ICreatePeriodoLectivo";
import type { IPeriodoLectivo } from "../../Domain/IPeriodoLectivo";
import type {
	IPeriodoLectivoRepository,
	UpdatePeriodoLectivoParams,
} from "../../Domain/IPeriodoLectivoRepository";

@injectable()
export class PeriodoLectivoRepository implements IPeriodoLectivoRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IPeriodoLectivo[]> {
		const periodos = await this._client.periodoLectivo.findMany();

		return periodos.map(p => ({
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		}));
	}
	async getById(id: string): Promise<IPeriodoLectivo | null> {
		const p = await this._client.periodoLectivo.findUnique({
			where: { id },
		});

		if (!p) return null;

		return {
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		};
	}
	async deleteById(id: string): Promise<IPeriodoLectivo> {
		const p = await this._client.periodoLectivo.delete({
			where: { id },
		});

		return {
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		};
	}

	async create({
		corteId,
		...data
	}: ICreatePeriodoLectivo): Promise<IPeriodoLectivo> {
		const p = await this._client.periodoLectivo.create({
			data: {
				...data,
				corte: corteId ? { connect: { id: corteId } } : undefined,
				calculoCosto: {
					create: {
						tipo: "COSTO_POR_NIVEL_Y_MATERIAS",
						costoPorSesion: true,
					},
				},
			},
		});

		return {
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		};
	}
	async update({
		id,
		data: { corteId, ...data },
	}: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo> {
		const p = await this._client.periodoLectivo.update({
			where: { id },
			data: {
				...data,
				corte: corteId ? { connect: { id: corteId } } : undefined,
			},
		});

		return {
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		};
	}

	async getByIdWithCronogramasMatriculacion(id: string): Promise<
		| (IPeriodoLectivo & {
				cronogramasMatriculacion: ICronogramaMatriculacion[];
		  })
		| null
	> {
		const p = await this._client.periodoLectivo.findUnique({
			where: { id },
			include: {
				cronogramasMatriculacion: true,
			},
		});

		if (!p) return null;

		return {
			...p,
			enUso: false,
			fechasEnMatricula: [
				p.limiteMatriculaEspecial,
				p.limiteMatriculaExtraordinaria,
				p.limiteMatriculaOrdinaria,
				p.automatriculaAlumnosFechaExtraordinaria,
			].every(v => v !== null),
			estructuraParalelosAgrupadosPorNivel:
				p.estudianteSeleccionaParaleloAutomatricula !== null,
			planificacionProfesoresObligatoria: [
				p.planificacionProfesoresFormaTotal,
				p.aprobacionPlanificacionProfesores,
			].every(v => v !== null),
			legalizarMatriculas: p.legalizacionAutomaticaContraPagos !== null,
			secuenciaDesdeNumeroEspecifico: p.numeroSecuencia !== null,
			numeroMatricula: [
				p.numeroMatriculaAutomatico,
				p.numeroMatricularAlLegalizar,
			].every(v => v !== null),
		};
	}
}
