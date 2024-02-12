import { injectable } from "inversify";

import type { IAsignaturaEnNivelMalla } from "../../../Core/AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMalla";
import type {
	IAsignaturaEnNivelMallaRepository,
	UpdateAsignaturaEnNivelMallaParams,
} from "../../../Core/AsignaturaEnNivelMalla/Domain/IAsignaturaEnNivelMallaRepository";
import type { ICreateAsignaturaEnNivelMalla } from "../../../Core/AsignaturaEnNivelMalla/Domain/ICreateAsignaturaEnNivelMalla";

@injectable()
export class MockAsignaturaEnNivelMallaRepository
	implements IAsignaturaEnNivelMallaRepository
{
	async create(
		_: ICreateAsignaturaEnNivelMalla,
	): Promise<IAsignaturaEnNivelMalla> {
		return {} as unknown as IAsignaturaEnNivelMalla;
	}

	async getAll(): Promise<IAsignaturaEnNivelMalla[]> {
		return [];
	}

	async update(
		_: UpdateAsignaturaEnNivelMallaParams,
	): Promise<IAsignaturaEnNivelMalla> {
		return {} as unknown as IAsignaturaEnNivelMalla;
	}

	async getById(_: string): Promise<IAsignaturaEnNivelMalla | null> {
		return {} as unknown as IAsignaturaEnNivelMalla;
	}

	async deleteById(_: string): Promise<IAsignaturaEnNivelMalla> {
		return {} as unknown as IAsignaturaEnNivelMalla;
	}
}
