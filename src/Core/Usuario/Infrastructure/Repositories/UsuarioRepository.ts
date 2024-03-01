import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { IUsuario } from "../../Domain/IUsuario";
import type {
	CreateAdministrativoParams,
	CreateAlumnoParams,
	CreateProfesorParams,
	GetAllUsuariosParams,
	IUsuarioRepository,
	UpdateAdministrativoParams,
	UpdateAlumnoParams,
	UpdateProfesorParams,
} from "../../Domain/IUsuarioRepository";
// import type { ICreateUsuario } from "../../Domain/ICreateUsuario";
import { Constants } from "../../../../Utils/Constants";

const INCLUDE_FIELD = {
	administrativo: {
		include: {
			asesorCrm: true,
			asesorEstudiante: true,
			responsableCrm: true,
			sede: true,
		},
	},
	profesor: {
		include: {
			coordinacion: true,
			programa: true,
		},
	},
	alumno: true,
	grupos: {
		include: {
			grupo: true,
		},
	},
} satisfies Parameters<PrismaClient["usuario"]["create"]>[0]["include"];

@injectable()
export class UsuarioRepository implements IUsuarioRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	getAll(params?: GetAllUsuariosParams): Promise<IUsuario[]> {
		const {
			administrativo_estado,
			profesor_estado,
			alumno_estado,
			grupoId,
			sedeId,
			tipo,
			...plainFilters
		} = params?.filters || {};

		if (tipo && typeof tipo === "string") {
			if (tipo === "ALUMNO") {
				return this._client.usuario.findMany({
					where: params?.filters
						? {
								...plainFilters,
								administrativo: administrativo_estado
									? {
											estado: administrativo_estado,
										}
									: undefined,
								profesor: profesor_estado
									? {
											estado: profesor_estado,
										}
									: undefined,
								alumno: alumno_estado
									? {
											estado: alumno_estado,
										}
									: { isNot: null },
								grupos: grupoId ? { some: { grupoId } } : undefined,

								OR: sedeId
									? [
											{
												administrativo: {
													sedeId,
												},
											},
											{
												profesor: {
													coordinacion: {
														sedeId,
													},
												},
											},
											{
												alumno: {
													inscripciones: {
														some: {
															nivelAcademico: {
																nivelMalla: {
																	malla: {
																		programa: {
																			coordinacion: {
																				sedeId,
																			},
																		},
																	},
																},
															},
														},
													},
												},
											},
										]
									: undefined,
							}
						: undefined,
					include: INCLUDE_FIELD,
				});
			}

			if (tipo === "ADMINISTRATIVO") {
				return this._client.usuario.findMany({
					where: params?.filters
						? {
								...plainFilters,
								administrativo: administrativo_estado
									? {
											estado: administrativo_estado,
										}
									: { isNot: null },
								profesor: profesor_estado
									? {
											estado: profesor_estado,
										}
									: undefined,
								alumno: alumno_estado
									? {
											estado: alumno_estado,
										}
									: undefined,
								grupos: grupoId ? { some: { grupoId } } : undefined,

								OR: sedeId
									? [
											{
												administrativo: {
													sedeId,
												},
											},
											{
												profesor: {
													coordinacion: {
														sedeId,
													},
												},
											},
											{
												alumno: {
													inscripciones: {
														some: {
															nivelAcademico: {
																nivelMalla: {
																	malla: {
																		programa: {
																			coordinacion: {
																				sedeId,
																			},
																		},
																	},
																},
															},
														},
													},
												},
											},
										]
									: undefined,
							}
						: undefined,
					include: INCLUDE_FIELD,
				});
			}

			return this._client.usuario.findMany({
				where: params?.filters
					? {
							...plainFilters,
							administrativo: administrativo_estado
								? {
										estado: administrativo_estado,
									}
								: undefined,
							profesor: profesor_estado
								? {
										estado: profesor_estado,
									}
								: { isNot: null },
							alumno: alumno_estado
								? {
										estado: alumno_estado,
									}
								: undefined,
							grupos: grupoId ? { some: { grupoId } } : undefined,

							OR: sedeId
								? [
										{
											administrativo: {
												sedeId,
											},
										},
										{
											profesor: {
												coordinacion: {
													sedeId,
												},
											},
										},
										{
											alumno: {
												inscripciones: {
													some: {
														nivelAcademico: {
															nivelMalla: {
																malla: {
																	programa: {
																		coordinacion: {
																			sedeId,
																		},
																	},
																},
															},
														},
													},
												},
											},
										},
									]
								: undefined,
						}
					: undefined,
				include: INCLUDE_FIELD,
			});
		}

		return this._client.usuario.findMany({
			where: params?.filters
				? {
						...plainFilters,
						tipo: {
							in: tipo,
						},
						administrativo: administrativo_estado
							? {
									estado: administrativo_estado,
								}
							: undefined,
						profesor: profesor_estado
							? {
									estado: profesor_estado,
								}
							: undefined,
						alumno: alumno_estado
							? {
									estado: alumno_estado,
								}
							: undefined,
						grupos: grupoId ? { some: { grupoId } } : undefined,

						OR: sedeId
							? [
									{
										administrativo: {
											sedeId,
										},
									},
									{
										profesor: {
											coordinacion: {
												sedeId,
											},
										},
									},
									{
										alumno: {
											inscripciones: {
												some: {
													nivelAcademico: {
														nivelMalla: {
															malla: {
																programa: {
																	coordinacion: {
																		sedeId,
																	},
																},
															},
														},
													},
												},
											},
										},
									},
								]
							: undefined,
					}
				: undefined,
			include: INCLUDE_FIELD,
		});
	}
	getById(id: string): Promise<IUsuario | null> {
		return this._client.usuario.findUnique({
			where: {
				id,
			},

			include: INCLUDE_FIELD,
		});
	}
	// deleteById(id: string): Promise<IUsuario>{

	// }

	// create(data: ICreateUsuario): Promise<IUsuario> {

	// }
	// update(params: UpdateUsuarioParams): Promise<IUsuario> {

	// }

	createAdministrativo(params: CreateAdministrativoParams): Promise<IUsuario> {
		if (params.__typename === "NUEVO_USUARIO") {
			const { administrativo, usuarioData } = params;

			return this._client.usuario.create({
				data: {
					...usuarioData,
					administrativo: {
						create: administrativo,
					},
					grupos: {
						create: {
							grupo: {
								connect: {
									nombre: Constants.STATIC_GROUPS.ADMINISTRATIVOS,
								},
							},
						},
					},
				},

				include: {
					administrativo: {
						include: {
							asesorCrm: true,
							asesorEstudiante: true,
							responsableCrm: true,
							sede: true,
						},
					},
					profesor: {
						include: {
							coordinacion: true,
							programa: true,
						},
					},
					alumno: true,
					grupos: {
						include: {
							grupo: true,
						},
					},
				},
			});
		}

		const { administrativo, joinGroup, usuarioId } = params;

		return this._client.usuario.update({
			where: {
				id: usuarioId,
			},
			data: {
				administrativo: {
					create: administrativo,
				},
				grupos: joinGroup
					? {
							create: {
								grupo: {
									connect: {
										nombre: Constants.STATIC_GROUPS.ADMINISTRATIVOS,
									},
								},
							},
						}
					: undefined,
			},

			include: INCLUDE_FIELD,
		});
	}
	createAlumno(params: CreateAlumnoParams): Promise<IUsuario> {
		if (params.__typename === "NUEVO_USUARIO") {
			const { alumno, usuarioData } = params;

			return this._client.usuario.create({
				data: {
					...usuarioData,
					alumno: {
						create: alumno,
					},
					grupos: {
						create: {
							grupo: {
								connect: {
									nombre: Constants.STATIC_GROUPS.ALUMNOS,
								},
							},
						},
					},
				},

				include: {
					administrativo: {
						include: {
							asesorCrm: true,
							asesorEstudiante: true,
							responsableCrm: true,
							sede: true,
						},
					},
					profesor: {
						include: {
							coordinacion: true,
							programa: true,
						},
					},
					alumno: true,
					grupos: {
						include: {
							grupo: true,
						},
					},
				},
			});
		}

		const { alumno, joinGroup, usuarioId } = params;

		return this._client.usuario.update({
			where: {
				id: usuarioId,
			},
			data: {
				alumno: {
					create: alumno,
				},

				grupos: joinGroup
					? {
							create: {
								grupo: {
									connect: {
										nombre: Constants.STATIC_GROUPS.ALUMNOS,
									},
								},
							},
						}
					: undefined,
			},

			include: INCLUDE_FIELD,
		});
	}
	createProfesor(params: CreateProfesorParams): Promise<IUsuario> {
		if (params.__typename === "NUEVO_USUARIO") {
			const { profesor, usuarioData } = params;

			return this._client.usuario.create({
				data: {
					...usuarioData,
					profesor: {
						create: profesor,
					},
					grupos: {
						create: {
							grupo: {
								connect: {
									nombre: Constants.STATIC_GROUPS.PROFESORES,
								},
							},
						},
					},
				},

				include: {
					administrativo: {
						include: {
							asesorCrm: true,
							asesorEstudiante: true,
							responsableCrm: true,
							sede: true,
						},
					},
					profesor: {
						include: {
							coordinacion: true,
							programa: true,
						},
					},
					alumno: true,
					grupos: {
						include: {
							grupo: true,
						},
					},
				},
			});
		}

		const { joinGroup, profesor, usuarioId } = params;

		return this._client.usuario.update({
			where: {
				id: usuarioId,
			},
			data: {
				profesor: {
					create: profesor,
				},
				grupos: joinGroup
					? {
							create: {
								grupo: {
									connect: {
										nombre: Constants.STATIC_GROUPS.PROFESORES,
									},
								},
							},
						}
					: undefined,
			},

			include: INCLUDE_FIELD,
		});
	}

	updateAdministrativo({
		id,
		data,
	}: UpdateAdministrativoParams): Promise<IUsuario> {
		return this._client.usuario.update({
			where: {
				id,
			},
			data: {
				administrativo: {
					update: data,
				},
			},

			include: INCLUDE_FIELD,
		});
	}
	updateAlumno({
		alumnoId,
		usuarioId,
		data,
	}: UpdateAlumnoParams): Promise<IUsuario> {
		return this._client.usuario.update({
			where: { id: usuarioId },
			data: {
				alumno: {
					update: {
						where: {
							id: alumnoId,
						},
						data,
					},
				},
			},

			include: INCLUDE_FIELD,
		});
	}

	updateProfesor({ id, data }: UpdateProfesorParams): Promise<IUsuario> {
		return this._client.usuario.update({
			where: { id },
			data: {
				profesor: {
					update: data,
				},
			},

			include: INCLUDE_FIELD,
		});
	}
}
