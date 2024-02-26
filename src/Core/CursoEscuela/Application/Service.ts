import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICreateCursoEscuela } from "../Domain/ICreateCursoEscuela";
import type { ICursoEscuela } from "../Domain/ICursoEscuela";
import type {
	ICursoEscuelaRepository,
	UpdateCursoEscuelaParams,
} from "../Domain/ICursoEscuelaRepository";
import type {
	CreateCursoEscuelaByPlantillaTransactionParams,
	ICursoEscuelaService,
} from "../Domain/ICursoEscuelaService";
import { CreateCursoEscuelaDTO } from "../Infrastructure/DTOs/CreateCursoEscuelaDTO";

@injectable()
export class CursoEscuelaService implements ICursoEscuelaService {
	constructor(
		@inject(TYPES.CursoEscuelaRepository)
		private _cursoEscuelaRepository: ICursoEscuelaRepository,
	) {}

	getAllCursoEscuelas(): Promise<ICursoEscuela[]> {
		return this._cursoEscuelaRepository.getAll();
	}

	getCursoEscuelaById(id: string): Promise<ICursoEscuela | null> {
		return this._cursoEscuelaRepository.getById(id);
	}

	createCursoEscuela(data: ICreateCursoEscuela): Promise<ICursoEscuela> {
		const dto = new CreateCursoEscuelaDTO(data);

		return this._cursoEscuelaRepository.create(dto.getData());
	}

	deleteCursoEscuelaById(id: string): Promise<ICursoEscuela> {
		return this._cursoEscuelaRepository.deleteById(id);
	}

	async updateCursoEscuelaById({
		id,
		data,
	}: UpdateCursoEscuelaParams): Promise<ICursoEscuela> {
		const dto = new CreateCursoEscuelaDTO(data);

		const cursoEscuela = await this._cursoEscuelaRepository.getById(id);

		if (!cursoEscuela)
			throw new CursoEscuelaServiceError("El curso escuela no existe");

		if (cursoEscuela.enUso)
			throw new CursoEscuelaServiceError(
				"El curso escuela esta en uso, no se puede actualizar",
			);

		return this._cursoEscuelaRepository.update({ id, data: dto.getData() });
	}

	createCursoEscuelaByPlantillaTransaction({
		cursoEscuela: cursoEscuelaData,
		cursoPlantillaId,
	}: CreateCursoEscuelaByPlantillaTransactionParams): Promise<ICursoEscuela> {
		const dto = new CreateCursoEscuelaDTO({
			...cursoEscuelaData,
			plantillaId: cursoPlantillaId,
		});

		const { plantillaId, paraleloId, sesionId, periodoId, ...restData } =
			dto.getData();

		if (!plantillaId)
			throw new CursoEscuelaServiceError(
				"ID de la plantilla de curso invalido",
			);

		return this._cursoEscuelaRepository.transaction(async tx => {
			const asignaturasEnPlantilla =
				await tx.asignaturaEnVarianteCurso.findMany({
					where: { varianteCursoId: plantillaId },
				});

			const newCursoEscuela = await tx.cursoEscuela.create({
				data: {
					...restData,
					paralelo: {
						connect: {
							id: paraleloId,
						},
					},
					plantilla: {
						connect: {
							id: plantillaId,
						},
					},
					sesion: {
						connect: {
							id: sesionId,
						},
					},
					periodo: {
						connect: {
							id: periodoId,
						},
					},
					asignaturas: {
						createMany: {
							data: asignaturasEnPlantilla.map(({ id: _, ...data }) => ({
								...data,
							})),
						},
					},
				},
			});

			return { ...newCursoEscuela, enUso: false };
		});
	}
}

class CursoEscuelaServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CursoEscuelaServiceError";
	}
}
