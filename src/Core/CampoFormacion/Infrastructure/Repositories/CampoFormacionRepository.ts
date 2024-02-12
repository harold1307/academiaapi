import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICampoFormacion } from "../../Domain/ICampoFormacion";
import type {
	ICampoFormacionRepository,
	UpdateCampoFormacionParams,
} from "../../Domain/ICampoFormacionRepository";
import type { ICreateCampoFormacion } from "../../Domain/ICreateCampoFormacion";

@injectable()
export class CampoFormacionRepository implements ICampoFormacionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICampoFormacion[]> {
		const campos = await this._client.campoFormacion.findMany({
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		return campos.map(
			({ asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest }) => ({
				...rest,
				enUso:
					asignaturasEnNivelMalla.length > 0 ||
					asignaturasModuloEnMalla.length > 0,
			}),
		);
	}

	async getById(id: string): Promise<ICampoFormacion | null> {
		const campo = await this._client.campoFormacion.findUnique({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		if (!campo) return null;

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } =
			campo;

		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}

	async deleteById(id: string): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.delete({
			where: { id },
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } =
			campo;
		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}

	async create(data: ICreateCampoFormacion): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.create({ data });

		return {
			...campo,
			enUso: false,
		};
	}

	async update({
		id,
		data,
	}: UpdateCampoFormacionParams): Promise<ICampoFormacion> {
		const campo = await this._client.campoFormacion.update({
			where: { id },
			data,
			include: {
				asignaturasEnNivelMalla: {
					take: 1,
				},
				asignaturasModuloEnMalla: {
					take: 1,
				},
			},
		});

		const { asignaturasEnNivelMalla, asignaturasModuloEnMalla, ...rest } =
			campo;

		return {
			...rest,
			enUso:
				asignaturasEnNivelMalla.length > 0 ||
				asignaturasModuloEnMalla.length > 0,
		};
	}
}
