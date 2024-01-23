import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { ICampoModeloEvaluativo } from "../Domain/ICampoModeloEvaluativo";
import type {
	ICampoModeloEvaluativoRepository,
	IUpdateCampoModeloEvaluativoParams,
} from "../Domain/ICampoModeloEvaluativoRepository";
import type { ICampoModeloEvaluativoService } from "../Domain/ICampoModeloEvaluativoService";
import type { ICreateCampoModeloEvaluativo } from "../Domain/ICreateCampoModeloEvaluativo";
import { CreateCampoModeloEvaluativoDTO } from "../Infrastructure/DTOs/CreateCampoModeloEvaluativoDTO";
import { UpdateCampoModeloEvaluativoDTO } from "../Infrastructure/DTOs/UpdateCampoModeloEvaluativoDTO";

@injectable()
export class CampoModeloEvaluativoService
	implements ICampoModeloEvaluativoService
{
	constructor(
		@inject(TYPES.CampoModeloEvaluativoRepository)
		private _campoModeloEvaluativoRepository: ICampoModeloEvaluativoRepository,
	) {}

	getAllCamposModelosEvaluativos(): Promise<ICampoModeloEvaluativo[]> {
		return this._campoModeloEvaluativoRepository.getAll();
	}

	getCampoModeloEvaluativoById(
		id: string,
	): Promise<ICampoModeloEvaluativo | null> {
		return this._campoModeloEvaluativoRepository.getById(id);
	}

	deleteCampoModeloEvaluativoById(id: string): Promise<ICampoModeloEvaluativo> {
		return this._campoModeloEvaluativoRepository.deleteById(id);
	}

	createCampoModeloEvaluativo(
		data: ICreateCampoModeloEvaluativo,
	): Promise<ICampoModeloEvaluativo> {
		const dto = new CreateCampoModeloEvaluativoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear campo de modelo evaluativo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CampoModeloEvaluativoServiceError(
				"Esquema para crear campo de modelo evaluativo invalido",
			);
		}

		if (validation.data.defineMaximos && validation.data.campoDependiente) {
			throw new CampoModeloEvaluativoServiceError(
				"No se puede definir maximos y campo dependiente al mismo tiempo",
			);
		}

		return this._campoModeloEvaluativoRepository.create(validation.data);
	}
	updateCampoModeloEvaluativoById({
		id,
		data,
	}: IUpdateCampoModeloEvaluativoParams): Promise<ICampoModeloEvaluativo> {
		const dto = new UpdateCampoModeloEvaluativoDTO(data);
		const validation = dto.validate();

		if (!validation.success) {
			console.error(
				"Error de validacion para crear campo de modelo evaluativo",
				JSON.stringify(validation.error, null, 2),
			);
			throw new CampoModeloEvaluativoServiceError(
				"Esquema para crear campo de modelo evaluativo invalido",
			);
		}

		if (validation.data.defineMaximos && validation.data.campoDependiente) {
			throw new CampoModeloEvaluativoServiceError(
				"No se puede definir maximos y campo dependiente al mismo tiempo",
			);
		}

		return this._campoModeloEvaluativoRepository.update({
			id,
			data: validation.data,
		});
	}
}

class CampoModeloEvaluativoServiceError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "CampoModeloEvaluativoServiceError";
	}
}
