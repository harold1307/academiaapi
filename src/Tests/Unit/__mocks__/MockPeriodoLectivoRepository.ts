import { injectable } from "inversify";

import type { ICreatePeriodoLectivo } from "../../../Core/PeriodoLectivo/Domain/ICreatePeriodoLectivo";
import type { IPeriodoLectivo } from "../../../Core/PeriodoLectivo/Domain/IPeriodoLectivo";
import type {
	IPeriodoLectivoRepository,
	UpdatePeriodoLectivoParams,
} from "../../../Core/PeriodoLectivo/Domain/IPeriodoLectivoRepository";

@injectable()
export class MockPeriodoLectivoRepository implements IPeriodoLectivoRepository {
	async create(_: ICreatePeriodoLectivo): Promise<IPeriodoLectivo> {
		return {} as unknown as IPeriodoLectivo;
	}

	async getAll(): Promise<IPeriodoLectivo[]> {
		return [];
	}

	async update(_: UpdatePeriodoLectivoParams): Promise<IPeriodoLectivo> {
		return {} as unknown as IPeriodoLectivo;
	}

	async getById(_: string): Promise<IPeriodoLectivo | null> {
		return {} as unknown as IPeriodoLectivo;
	}

	async deleteById(_: string): Promise<IPeriodoLectivo> {
		return {} as unknown as IPeriodoLectivo;
	}
}
