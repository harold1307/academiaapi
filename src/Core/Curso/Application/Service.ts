import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { IAsignaturaRepository } from "../../Asignatura/Domain/IAsignaturaRepository";
import type { IAsignaturaEnVarianteCurso } from "../Domain/IAsignaturaEnVarianteCurso";
import type { IAsignaturaEnVarianteCursoRepository } from "../Domain/IAsignaturaEnVarianteCursoRepository";
import type { ICurso } from "../Domain/ICurso";
import type { ICursoRepository } from "../Domain/ICursoRepository";
import type {
	ICreateAsignaturaEnVarianteCursoParams,
	ICursoService,
} from "../Domain/ICursoService";
import { type ICursoWithVariantes } from "../Domain/ICursoWithVariantes";
import type { IVarianteCursoRepository } from "../Domain/IVarianteCursoRepository";
import type { IVarianteCursoWithAsignaturas } from "../Domain/IVarianteCursoWithAsignaturas";
import type { IVarianteCursoWithCurso } from "../Domain/IVarianteCursoWithCurso";
import { CreateAsignaturaEnVarianteCurso } from "../Infrastructure/DTOs/CreateAsignaturaEnVarianteCurso";
import { CreateCursoDTO } from "../Infrastructure/DTOs/CreateCursoDTO";
import { CreateVarianteCursoDTO } from "../Infrastructure/DTOs/CreateVarianteCursoDTO";
import { UpdateCursoDTO } from "../Infrastructure/DTOs/UpdateCursoDTO";

@injectable()
export class CursoService implements ICursoService {
	constructor(
		@inject(TYPES.CursoRepository) private _cursoRepository: ICursoRepository,
		@inject(TYPES.AsignaturaRepository)
		private _asignaturaRepository: IAsignaturaRepository,
		@inject(TYPES.VarianteCursoRepository)
		private _varianteCursoRepository: IVarianteCursoRepository,
		@inject(TYPES.AsignaturaEnVarianteCursoRepository)
		private _asignaturaEnVarianteCursoRepository: IAsignaturaEnVarianteCursoRepository,
	) {}

	async createCurso(data: any): Promise<ICurso> {
		const curso = new CreateCursoDTO(data);

		const validation = curso.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError("Esquema para crear curso invalido.");
		}

		return this._cursoRepository.create(validation.data);
	}

	async getAllCursos(): Promise<ICurso[]> {
		return this._cursoRepository.getAll();
	}

	async getCursoById(id: string) {
		return this._cursoRepository.getById(id);
	}

	async deleteCursoById(id: string): Promise<ICurso> {
		return this._cursoRepository.deleteById(id);
	}

	async updateCursoById(params: { id: string; curso: any }): Promise<ICurso> {
		const dto = new UpdateCursoDTO(params.curso);

		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para actualizar curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError("Esquema para actualizar curso invalido.");
		}

		return this._cursoRepository.update({
			id: params.id,
			curso: validation.data,
		});
	}

	async createVarianteCurso(
		cursoId: string,
		data: unknown,
	): Promise<IVarianteCursoWithCurso> {
		const dto = new CreateVarianteCursoDTO(data);

		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear variante de curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError(
				"Esquema para crear variante de curso invalido.",
			);
		}

		return this._cursoRepository.createVarianteCurso(cursoId, validation.data);
	}

	getCursoWithAllVarianteCursos(
		cursoId: string,
	): Promise<ICursoWithVariantes | null> {
		return this._cursoRepository.getAllVarianteCursoFromCursoId(cursoId);
	}

	async createAsignaturaEnVarianteCurso({
		asignaturaId,
		varianteCursoId,
		data,
	}: ICreateAsignaturaEnVarianteCursoParams): Promise<IAsignaturaEnVarianteCurso> {
		const asignatura = await this._asignaturaRepository.getById(asignaturaId);

		if (!asignatura) throw new CursoServiceError("La asignatura no existe");

		const varianteCurso =
			await this._varianteCursoRepository.getById(varianteCursoId);

		if (!varianteCurso)
			throw new CursoServiceError("La variante de curso no existe");

		const dto = new CreateAsignaturaEnVarianteCurso({
			...data,
			varianteCursoId,
			asignaturaId,
		});
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear variante de curso",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CursoServiceError(
				"Esquema para crear variante de curso invalido.",
			);
		}

		return this._asignaturaEnVarianteCursoRepository.create(validation.data);
	}

	getVarianteCursoWithAsignaturasById(
		id: string,
	): Promise<IVarianteCursoWithAsignaturas | null> {
		return this._varianteCursoRepository.withAsignaturasGetById(id);
	}
}

class CursoServiceError extends Error {
	constructor(message: string) {
		super();

		this.message = message;
	}
}
