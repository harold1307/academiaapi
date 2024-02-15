import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateRequisitoMatriculacion } from "../../Domain/ICreateRequisitoMatriculacion";
import type { IRequisitoMatriculacion } from "../../Domain/IRequisitoMatriculacion";
import type {
	IRequisitoMatriculacionRepository,
	UpdateRequisitoMatriculacionParams,
} from "../../Domain/IRequisitoMatriculacionRepository";

@injectable()
export class RequisitoMatriculacionRepository
	implements IRequisitoMatriculacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IRequisitoMatriculacion[]> {
		const requisitos = await this._client.requisitoMatriculacion.findMany({
			include: {
				nivel: {
					include: {
						malla: {
							select: {
								modalidad: true,
								programa: {
									include: {
										coordinacion: {
											select: {
												sede: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return requisitos.map(
			({
				nivel: {
					malla: {
						modalidad,
						programa: {
							coordinacion: { sede },
							...programa
						},
					},
					...nivel
				},
				...r
			}) => ({
				...r,
				modalidad,
				sede,
				nivel,
				programa,
			}),
		);
	}
	async getById(id: string): Promise<IRequisitoMatriculacion | null> {
		const requisito = await this._client.requisitoMatriculacion.findUnique({
			where: { id },
			include: {
				nivel: {
					include: {
						malla: {
							select: {
								modalidad: true,
								programa: {
									include: {
										coordinacion: {
											select: {
												sede: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!requisito) return null;

		const {
			nivel: {
				malla: {
					modalidad,
					programa: {
						coordinacion: { sede },
						...programa
					},
				},
				...nivel
			},
			...r
		} = requisito;

		return {
			...r,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
	async deleteById(id: string): Promise<IRequisitoMatriculacion> {
		const requisito = await this._client.requisitoMatriculacion.delete({
			where: { id },
			include: {
				nivel: {
					include: {
						malla: {
							select: {
								modalidad: true,
								programa: {
									include: {
										coordinacion: {
											select: {
												sede: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivel: {
				malla: {
					modalidad,
					programa: {
						coordinacion: { sede },
						...programa
					},
				},
				...nivel
			},
			...r
		} = requisito;

		return {
			...r,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}

	async create({
		nivelId,
		periodoId,
		tipoDocumentoId,
		...data
	}: ICreateRequisitoMatriculacion): Promise<IRequisitoMatriculacion> {
		const requisito = await this._client.requisitoMatriculacion.create({
			data: {
				...data,
				nivel: { connect: { id: nivelId } },
				periodo: { connect: { id: periodoId } },
				tipoDocumento: { connect: { id: tipoDocumentoId } },
			},
			include: {
				nivel: {
					include: {
						malla: {
							select: {
								modalidad: true,
								programa: {
									include: {
										coordinacion: {
											select: {
												sede: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivel: {
				malla: {
					modalidad,
					programa: {
						coordinacion: { sede },
						...programa
					},
				},
				...nivel
			},
			...r
		} = requisito;

		return {
			...r,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
	async update({
		id,
		data: { nivelId, tipoDocumentoId, ...data },
	}: UpdateRequisitoMatriculacionParams): Promise<IRequisitoMatriculacion> {
		const requisito = await this._client.requisitoMatriculacion.update({
			where: { id },
			data: {
				...data,
				nivel: nivelId ? { connect: { id: nivelId } } : undefined,
				tipoDocumento: tipoDocumentoId
					? { connect: { id: tipoDocumentoId } }
					: undefined,
			},
			include: {
				nivel: {
					include: {
						malla: {
							select: {
								modalidad: true,
								programa: {
									include: {
										coordinacion: {
											select: {
												sede: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivel: {
				malla: {
					modalidad,
					programa: {
						coordinacion: { sede },
						...programa
					},
				},
				...nivel
			},
			...r
		} = requisito;

		return {
			...r,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
}
