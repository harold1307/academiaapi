import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { ICreateInscripcion } from "../../Domain/ICreateInscripcion";
import type { IInscripcion } from "../../Domain/IInscripcion";
import type {
	IInscripcionRepository,
	UpdateInscripcionParams,
} from "../../Domain/IInscripcionRepository";

@injectable()
export class InscripcionRepository implements IInscripcionRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAll(): Promise<IInscripcion[]> {
		const inscripciones = await this._client.inscripcion.findMany({
			include: {
				nivelAcademico: {
					include: {
						nivelMalla: {
							select: {
								malla: {
									include: {
										programa: {
											include: {
												coordinacion: {
													include: {
														sede: true,
													},
												},
											},
										},
										modalidad: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return inscripciones.map(
			({
				nivelAcademico: {
					nivelMalla: {
						malla: {
							programa: {
								coordinacion: { sede, ...coordinacion },
								...programa
							},
							modalidad,
							...malla
						},
					},
					...sesion
				},
				...i
			}) => ({
				...i,
				sede,
				coordinacion,
				programa,
				malla,
				sesion,
				modalidad,
			}),
		);
	}
	async getById(id: string): Promise<IInscripcion | null> {
		const inscripcion = await this._client.inscripcion.findUnique({
			where: { id },
			include: {
				nivelAcademico: {
					include: {
						nivelMalla: {
							select: {
								malla: {
									include: {
										programa: {
											include: {
												coordinacion: {
													include: {
														sede: true,
													},
												},
											},
										},
										modalidad: true,
									},
								},
							},
						},
					},
				},
			},
		});

		if (!inscripcion) return null;

		const {
			nivelAcademico: {
				nivelMalla: {
					malla: {
						programa: {
							coordinacion: { sede, ...coordinacion },
							...programa
						},
						modalidad,
						...malla
					},
				},
				...sesion
			},
			...i
		} = inscripcion;

		return {
			...i,
			sede,
			coordinacion,
			programa,
			malla,
			sesion,
			modalidad,
		};
	}
	async deleteById(id: string): Promise<IInscripcion> {
		const inscripcion = await this._client.inscripcion.delete({
			where: { id },
			include: {
				nivelAcademico: {
					include: {
						nivelMalla: {
							select: {
								malla: {
									include: {
										programa: {
											include: {
												coordinacion: {
													include: {
														sede: true,
													},
												},
											},
										},
										modalidad: true,
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivelAcademico: {
				nivelMalla: {
					malla: {
						programa: {
							coordinacion: { sede, ...coordinacion },
							...programa
						},
						modalidad,
						...malla
					},
				},
				...sesion
			},
			...i
		} = inscripcion;

		return {
			...i,
			sede,
			coordinacion,
			programa,
			malla,
			sesion,
			modalidad,
		};
	}

	async create({
		alumnoId,
		nivelAcademicoId,
	}: ICreateInscripcion): Promise<IInscripcion> {
		const inscripcion = await this._client.inscripcion.create({
			data: {
				alumno: { connect: { id: alumnoId } },
				nivelAcademico: { connect: { id: nivelAcademicoId } },
			},
			include: {
				nivelAcademico: {
					include: {
						nivelMalla: {
							select: {
								malla: {
									include: {
										programa: {
											include: {
												coordinacion: {
													include: {
														sede: true,
													},
												},
											},
										},
										modalidad: true,
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivelAcademico: {
				nivelMalla: {
					malla: {
						programa: {
							coordinacion: { sede, ...coordinacion },
							...programa
						},
						modalidad,
						...malla
					},
				},
				...sesion
			},
			...i
		} = inscripcion;

		return {
			...i,
			sede,
			coordinacion,
			programa,
			malla,
			sesion,
			modalidad,
		};
	}
	async update({
		id,
		data: { nivelAcademicoId, ...data },
	}: UpdateInscripcionParams): Promise<IInscripcion> {
		const inscripcion = await this._client.inscripcion.update({
			where: { id },
			data: {
				...data,
				nivelAcademico: {
					connect: {
						id: nivelAcademicoId,
					},
				},
			},
			include: {
				nivelAcademico: {
					include: {
						nivelMalla: {
							select: {
								malla: {
									include: {
										programa: {
											include: {
												coordinacion: {
													include: {
														sede: true,
													},
												},
											},
										},
										modalidad: true,
									},
								},
							},
						},
					},
				},
			},
		});

		const {
			nivelAcademico: {
				nivelMalla: {
					malla: {
						programa: {
							coordinacion: { sede, ...coordinacion },
							...programa
						},
						modalidad,
						...malla
					},
				},
				...sesion
			},
			...i
		} = inscripcion;

		return {
			...i,
			sede,
			coordinacion,
			programa,
			malla,
			sesion,
			modalidad,
		};
	}
}
