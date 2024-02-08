import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateMateriaEnNivelAcademico } from "../Domain/ICreateMateriaEnNivelAcademico";
import type { IMateriaEnNivelAcademico } from "../Domain/IMateriaEnNivelAcademico";
import type {
	IMateriaEnNivelAcademicoRepository,
	UpdateMateriaEnNivelAcademicoParams,
} from "../Domain/IMateriaEnNivelAcademicoRepository";
import type { IMateriaEnNivelAcademicoService } from "../Domain/IMateriaEnNivelAcademicoService";
import { CreateMateriaEnNivelAcademicoDTO } from "../Infrastructure/DTOs/CreateMateriaEnNivelAcademicoDTO";
import { UpdateMateriaEnNivelAcademicoDTO } from "../Infrastructure/DTOs/UpdateMateriaEnNivelAcademicoDTO";

@injectable()
export class MateriaEnNivelAcademicoService
	implements IMateriaEnNivelAcademicoService
{
	constructor(
		@inject(TYPES.MateriaEnNivelAcademicoRepository)
		private _materiaEnNivelAcademicoRepository: IMateriaEnNivelAcademicoRepository,
	) {}

	getAllMateriaEnNivelAcademicos(): Promise<IMateriaEnNivelAcademico[]> {
		return this._materiaEnNivelAcademicoRepository.getAll();
	}

	getMateriaEnNivelAcademicoById(
		id: string,
	): Promise<IMateriaEnNivelAcademico | null> {
		return this._materiaEnNivelAcademicoRepository.getById(id);
	}

	async deleteMateriaEnNivelAcademicoById(
		id: string,
	): Promise<IMateriaEnNivelAcademico> {
		const materia = await this._materiaEnNivelAcademicoRepository.getById(id);

		if (!materia)
			throw new MateriaEnNivelAcademicoServiceError("La materia no existe");

		return this._materiaEnNivelAcademicoRepository.deleteById(id);
	}

	createMateriasEnNivelAcademico(
		data: ICreateMateriaEnNivelAcademico,
	): Promise<number> {
		const dto = new CreateMateriaEnNivelAcademicoDTO(data);

		const {
			asignaturasMalla,
			modeloEvaluativoId,
			modulosMalla,
			nivelAcademicoId,
		} = dto.getData();

		return this._materiaEnNivelAcademicoRepository.transaction(async tx => {
			const nivelAcademico = await tx.nivelAcademico.findUnique({
				where: {
					id: nivelAcademicoId,
				},
				select: {
					fechaInicio: true,
					fechaFin: true,
					nivelMalla: {
						select: {
							malla: {
								select: {
									programa: {
										select: {
											alias: true,
											coordinacion: {
												select: {
													sede: {
														select: {
															alias: true,
														},
													},
												},
											},
										},
									},
								},
							},
							asignaturas: {
								select: {
									id: true,
									identificacion: true,
									validaParaCredito: true,
									validaParaPromedio: true,
								},
							},
						},
					},
				},
			});

			if (!nivelAcademico)
				throw new MateriaEnNivelAcademicoServiceError(
					"El nivel academico no existe",
				);

			const asignaturasEnMalla = await tx.asignaturaEnNivelMalla.findMany({
				where: {
					OR: asignaturasMalla.map(id => ({
						id,
					})),
				},
			});

			const modulosEnMalla = await tx.asignaturaModuloEnMalla.findMany({
				where: {
					OR: modulosMalla.map(id => ({
						id,
					})),
				},
			});

			const newMaterias = await Promise.all([
				...asignaturasEnMalla.map(
					({ validaParaCredito, validaParaPromedio, id }) =>
						tx.materiaEnNivelAcademico.create({
							data: {
								fechaInicio: nivelAcademico.fechaInicio,
								fechaFin: nivelAcademico.fechaFin,
								validaParaCreditos: validaParaCredito,
								validaParaPromedio,
								nivelAcademico: {
									connect: { id: nivelAcademicoId },
								},
								modeloEvaluativo: {
									connect: { id: modeloEvaluativoId },
								},
								asignaturaEnNivelMalla: {
									connect: { id },
								},
							},
							select: {
								id: true,
								asignaturaEnNivelMalla: {
									select: {
										identificacion: true,
									},
								},
								asignaturaModulo: {
									select: {
										identificacion: true,
									},
								},
								numero: true,
							},
						}),
				),
				...modulosEnMalla.map(({ validaParaCredito, validaParaPromedio, id }) =>
					tx.materiaEnNivelAcademico.create({
						data: {
							fechaInicio: nivelAcademico.fechaInicio,
							fechaFin: nivelAcademico.fechaFin,
							validaParaCreditos: validaParaCredito,
							validaParaPromedio,
							nivelAcademico: {
								connect: { id: nivelAcademicoId },
							},
							modeloEvaluativo: {
								connect: { id: modeloEvaluativoId },
							},
							asignaturaModulo: {
								connect: { id },
							},
						},
						select: {
							id: true,
							asignaturaEnNivelMalla: {
								select: {
									identificacion: true,
								},
							},
							asignaturaModulo: {
								select: {
									identificacion: true,
								},
							},
							numero: true,
						},
					}),
				),
			]);

			await Promise.all(
				newMaterias.map(materia =>
					tx.materiaEnNivelAcademico.update({
						where: { id: materia.id },
						data: {
							alias: [
								nivelAcademico.nivelMalla.malla.programa.coordinacion.sede
									.alias,
								nivelAcademico.nivelMalla.malla.programa.alias,
								materia.asignaturaEnNivelMalla ? "AM" : "MM",
								materia.asignaturaEnNivelMalla?.identificacion ||
									materia.asignaturaModulo?.identificacion,
								materia.numero,
							].join("-"),
						},
					}),
				),
			);

			return newMaterias.length;
		});
	}

	async updateMateriaEnNivelAcademicoById({
		id,
		data,
	}: UpdateMateriaEnNivelAcademicoParams): Promise<IMateriaEnNivelAcademico> {
		const dto = new UpdateMateriaEnNivelAcademicoDTO(data);

		const materia = await this._materiaEnNivelAcademicoRepository.getById(id);

		if (!materia)
			throw new MateriaEnNivelAcademicoServiceError("La materia no existe");

		return this._materiaEnNivelAcademicoRepository.update({
			id,
			data: dto.getData(),
		});
	}
}

class MateriaEnNivelAcademicoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "MateriaEnNivelAcademicoServiceError";
	}
}
