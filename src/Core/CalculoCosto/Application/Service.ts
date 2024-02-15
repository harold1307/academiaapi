import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICalculoCosto } from "../Domain/ICalculoCosto";
import type {
	ICalculoCostoRepository,
	UpdateCalculoCostoParams,
} from "../Domain/ICalculoCostoRepository";
import type { ICalculoCostoService } from "../Domain/ICalculoCostoService";
import { CreateCalculoCostoDTO } from "../Infrastructure/DTOs/CreateCalculoCostoDTO";
import { UpdateCalculoCostoDTO } from "../Infrastructure/DTOs/UpdateCalculoCostoDTO";
// import type { ICreateCalculoCosto } from "../Domain/ICreateCalculoCosto"

@injectable()
export class CalculoCostoService implements ICalculoCostoService {
	constructor(
		@inject(TYPES.CalculoCostoRepository)
		private _calculoCostoRepository: ICalculoCostoRepository,
	) {}

	// getAllCalculoCostos(): Promise<ICalculoCosto[]> {
	//   return this._calculoCostoRepository.getAll()
	// }

	getCalculoCostoById(id: string): Promise<ICalculoCosto | null> {
		return this._calculoCostoRepository.getById(id);
	}

	// deleteCalculoCostoById(id: string): Promise<ICalculoCosto> {

	// }

	// createCalculoCosto(data: ICreateCalculoCosto): Promise<ICalculoCosto> {}
	async updateCalculoCostoById({
		id,
		data,
	}: UpdateCalculoCostoParams): Promise<ICalculoCosto> {
		const dto = new UpdateCalculoCostoDTO(data);

		const calculo = await this._calculoCostoRepository.getById(id);

		if (!calculo)
			throw new CalculoCostoServiceError("El calculo de costo no existe");

		try {
			new CreateCalculoCostoDTO({
				...calculo,
				...Object.fromEntries(
					Object.entries(dto.getData()).filter(([, v]) => v !== undefined),
				),
			});
		} catch (error) {
			throw new CalculoCostoServiceError(
				"El calculo de costo a actualizar es invalido",
			);
		}

		return this._calculoCostoRepository.update({ id, data: dto.getData() });
	}
}

class CalculoCostoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CalculoCostoServiceError";
	}
}
