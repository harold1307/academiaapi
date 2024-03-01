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
		const periodos = await this._client.periodoLectivo.findMany({
			include: {
				calculoCosto: true,
			},
		});

		return periodos.map(p => ({
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
			include: {
				calculoCosto: true,
			},
		});

		if (!p) return null;

		return {
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
			include: {
				calculoCosto: true,
			},
		});

		return {
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
			include: {
				calculoCosto: true,
			},
		});

		return {
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
			include: {
				calculoCosto: true,
			},
		});

		return {
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
				cronogramasMatriculacion: {
					include: {
						modalidad: true,
						periodo: true,
						programa: true,
						sede: true,
					},
				},
				calculoCosto: true,
			},
		});

		if (!p) return null;

		return {
			...p,
			calculoCosto: {
				...p.calculoCosto,
				planCostos:
					p.calculoCosto.cronogramaFechasOpcionPago !== null &&
					p.calculoCosto.estudiantesEligenOpcionPago !== null,
			},
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
