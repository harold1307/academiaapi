import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateNivelAcademico } from "../Domain/ICreateNivelAcademico";
import type { INivelAcademico } from "../Domain/INivelAcademico";
import type {
	INivelAcademicoRepository,
	UpdateNivelAcademicoParams,
} from "../Domain/INivelAcademicoRepository";
import type {
	GetAllNivelesAcademicosParams,
	INivelAcademicoService,
} from "../Domain/INivelAcademicoService";
import type { INivelAcademicoWithMaterias } from "../Domain/INivelAcademicoWithMaterias";
import { CreateNivelAcademicoDTO } from "../Infrastructure/DTOs/CreateNivelAcademicoDTO";
import { NivelAcademicoQueryFilterDTO } from "../Infrastructure/DTOs/NivelAcademicoQueryFilterDTO";
import { UpdateNivelAcademicoDTO } from "../Infrastructure/DTOs/UpdateNivelAcademicoDTO";

@injectable()
export class NivelAcademicoService implements INivelAcademicoService {
	constructor(
		@inject(TYPES.NivelAcademicoRepository)
		private _nivelAcademicoRepository: INivelAcademicoRepository,
	) {}

	getAllNivelesAcademicos(
		params?: GetAllNivelesAcademicosParams,
	): Promise<INivelAcademico[]> {
		const { filters } = params || {};

		const filterDTO = new NivelAcademicoQueryFilterDTO(filters);

		return this._nivelAcademicoRepository.getAll({
			filters: filterDTO.getData(),
		});
	}

	getNivelAcademicoById(id: string): Promise<INivelAcademico | null> {
		return this._nivelAcademicoRepository.getById(id);
	}

	getNivelAcademicoByIdWithMaterias(
		id: string,
	): Promise<INivelAcademicoWithMaterias | null> {
		return this._nivelAcademicoRepository.getByIdWithMaterias(id);
	}

	async deleteNivelAcademicoById(id: string): Promise<INivelAcademico> {
		const nivel = await this._nivelAcademicoRepository.getById(id);

		if (!nivel)
			throw new NivelAcademicoServiceError("El nivel academico no existe");

		return this._nivelAcademicoRepository.deleteById(id);
	}

	createNivelAcademico(data: ICreateNivelAcademico): Promise<INivelAcademico> {
		const dto = new CreateNivelAcademicoDTO(data);

		const valid = dto.getData();

		return this._nivelAcademicoRepository.transaction(async tx => {
			const nivelMalla = await tx.nivelMalla.findUnique({
				where: {
					id: valid.nivelMallaId,
				},
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
			});

			if (!nivelMalla)
				throw new NivelAcademicoServiceError("El nivel academico no existe");

			const newNivelAcademico = await tx.nivelAcademico.create({
				data: valid,
				include: {
					sesion: {
						include: {
							turnos: true,
							sede: true,
						},
					},
					nivelMalla: true,
				},
			});

			// creando las materias del nivel academico, por defecto crea las asignatura en el nivel de la malla seleccionado
			await tx.materiaEnNivelAcademico.createMany({
				data: nivelMalla.asignaturas.map(
					({ validaParaCredito, validaParaPromedio, id }) => ({
						validaParaCreditos: validaParaCredito,
						validaParaPromedio,
						asignaturaEnNivelMallaId: id,
						nivelAcademicoId: newNivelAcademico.id,
						modeloEvaluativoId: newNivelAcademico.modeloEvaluativoId,
						fechaInicio: valid.fechaInicio,
						fechaFin: valid.fechaFin,
					}),
				),
			});

			const materias = await tx.materiaEnNivelAcademico.findMany({
				where: {
					nivelAcademicoId: newNivelAcademico.id,
				},
				select: {
					id: true,
					asignaturaEnNivelMalla: {
						select: {
							identificacion: true,
						},
					},
					numero: true,
				},
			});

			// actualizando el alias por defecto
			await Promise.all(
				materias.map(materia =>
					tx.materiaEnNivelAcademico.update({
						where: {
							id: materia.id,
						},
						data: {
							alias: [
								nivelMalla.malla.programa.coordinacion.sede.alias,
								nivelMalla.malla.programa.alias,
								"AM",
								materia.asignaturaEnNivelMalla?.identificacion,
								materia.numero,
							].join("-"),
						},
					}),
				),
			);

			return {
				...newNivelAcademico,
				sesion: {
					...newNivelAcademico.sesion,
					sede: {
						...newNivelAcademico.sesion.sede,
						enUso: true,
					},
					turnos: newNivelAcademico.sesion.turnos.map(t => ({
						...t,
						enUso: true,
					})),
					enUso: true,
				},
			};
		});
	}

	async updateNivelAcademicoById({
		id,
		data,
	}: UpdateNivelAcademicoParams): Promise<INivelAcademico> {
		const dto = new UpdateNivelAcademicoDTO(data);

		const nivel = await this._nivelAcademicoRepository.getById(id);

		if (!nivel)
			throw new NivelAcademicoServiceError("El nivel academico no existe");

		return this._nivelAcademicoRepository.update({ id, data: dto.getData() });
	}
}

class NivelAcademicoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "NivelAcademicoServiceError";
	}
}
