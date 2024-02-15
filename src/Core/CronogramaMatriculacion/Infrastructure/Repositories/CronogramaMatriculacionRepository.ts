import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateCronogramaMatriculacion } from "../../Domain/ICreateCronogramaMatriculacion";
import type { ICronogramaMatriculacion } from "../../Domain/ICronogramaMatriculacion";
import type {
	ICronogramaMatriculacionRepository,
	UpdateCronogramaMatriculacionParams,
} from "../../Domain/ICronogramaMatriculacionRepository";

@injectable()
export class CronogramaMatriculacionRepository
	implements ICronogramaMatriculacionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<ICronogramaMatriculacion[]> {
		const cronogramas = await this._client.cronogramaMatriculacion.findMany({
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

		return cronogramas.map(
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
				...c
			}) => ({
				...c,
				modalidad,
				sede,
				nivel,
				programa,
			}),
		);
	}
	async getById(id: string): Promise<ICronogramaMatriculacion | null> {
		const cronograma = await this._client.cronogramaMatriculacion.findUnique({
			where: {
				id,
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

		if (!cronograma) return null;

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
			...c
		} = cronograma;

		return {
			...c,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
	async deleteById(id: string): Promise<ICronogramaMatriculacion> {
		const cronograma = await this._client.cronogramaMatriculacion.delete({
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
			...c
		} = cronograma;

		return {
			...c,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}

	async create({
		nivelId,
		periodoId,
		...data
	}: ICreateCronogramaMatriculacion): Promise<ICronogramaMatriculacion> {
		const cronograma = await this._client.cronogramaMatriculacion.create({
			data: {
				...data,
				nivel: { connect: { id: nivelId } },
				periodo: { connect: { id: periodoId } },
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
			...c
		} = cronograma;

		return {
			...c,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
	async update({
		id,
		data,
	}: UpdateCronogramaMatriculacionParams): Promise<ICronogramaMatriculacion> {
		const cronograma = await this._client.cronogramaMatriculacion.update({
			where: { id },
			data,
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
			...c
		} = cronograma;

		return {
			...c,
			modalidad,
			sede,
			nivel,
			programa,
		};
	}
}
