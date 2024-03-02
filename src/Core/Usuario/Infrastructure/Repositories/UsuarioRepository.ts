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
	UpdateUsuarioParams,
} from "../../Domain/IUsuarioRepository";
// import type { ICreateUsuario } from "../../Domain/ICreateUsuario";
import { Constants } from "../../../../Utils/Constants";
import type { IUsuarioWithInscripciones } from "../../Domain/IUsuarioWithInscripciones";

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
	alumno: {
		include: {
			inscripciones: true,
		},
	},
	grupos: {
		include: {
			grupo: true,
		},
	},
} satisfies Parameters<PrismaClient["usuario"]["create"]>[0]["include"];

const INCLUDE_FIELD_WITH_COMPLETE_INSCRIPCIONES = {
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
	alumno: {
		include: {
			inscripciones: {
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
			},
		},
	},
	grupos: {
		include: {
			grupo: true,
		},
	},
} satisfies Parameters<PrismaClient["usuario"]["create"]>[0]["include"];

type UsuarioORType = Exclude<
	Exclude<
		Parameters<PrismaClient["usuario"]["findMany"]>[0],
		undefined
	>["where"],
	undefined
>["OR"];

@injectable()
export class UsuarioRepository implements IUsuarioRepository {
	constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient) {}

	async getAllWithInscripciones(
		params?: GetAllUsuariosParams | undefined,
	): Promise<IUsuarioWithInscripciones[]> {
		const {
			administrativo_estado,
			profesor_estado,
			alumno_estado,
			grupoId,
			sedeId,
			tipo,
			fullTextSearch,
			...plainFilters
		} = params?.filters || {};

		const searchTexts = fullTextSearch
			?.trim()
			.split(" ")
			.filter(s => !!s);

		const searchOR = [
			{
				nombres: {
					in: searchTexts,
				},
			},
			{
				primerApellido: {
					in: searchTexts,
				},
			},
			{
				segundoApellido: {
					in: searchTexts,
				},
			},
		] satisfies UsuarioORType;
		const sedeOR = [
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
		] satisfies UsuarioORType;

		const where = params?.filters
			? ({
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
						: undefined,
					grupos: grupoId ? { some: { grupoId } } : undefined,

					OR:
						sedeId && searchTexts?.length
							? sedeOR.map(f => ({ ...f, OR: searchOR }))
							: sedeId && !searchTexts?.length
								? sedeOR
								: !sedeId && searchTexts?.length
									? searchOR
									: undefined,
				} satisfies Exclude<
					Parameters<PrismaClient["usuario"]["findMany"]>[0],
					undefined
				>["where"])
			: undefined;

		if (tipo && typeof tipo === "string") {
			if (tipo === "ALUMNO") {
				const usuarios = await this._client.usuario.findMany({
					where: where
						? {
								...where,
								alumno: alumno_estado
									? {
											estado: alumno_estado,
										}
									: { isNot: null },
							}
						: undefined,
					include: INCLUDE_FIELD_WITH_COMPLETE_INSCRIPCIONES,
					orderBy: {
						nombres: "asc",
					},
				});

				return usuarios.map(u => ({
					...u,
					alumno: u.alumno
						? {
								...u.alumno,
								inscripciones: u.alumno.inscripciones.map(
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
								),
							}
						: null,
				}));
			}

			if (tipo === "ADMINISTRATIVO") {
				const usuarios = await this._client.usuario.findMany({
					where: where
						? {
								...where,
								administrativo: administrativo_estado
									? {
											estado: administrativo_estado,
										}
									: { isNot: null },
							}
						: undefined,
					include: INCLUDE_FIELD_WITH_COMPLETE_INSCRIPCIONES,
					orderBy: {
						nombres: "asc",
					},
				});

				return usuarios.map(u => ({
					...u,
					alumno: u.alumno
						? {
								...u.alumno,
								inscripciones: u.alumno.inscripciones.map(
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
								),
							}
						: null,
				}));
			}

			const usuarios = await this._client.usuario.findMany({
				where: where
					? {
							...where,
							profesor: profesor_estado
								? {
										estado: profesor_estado,
									}
								: { isNot: null },
						}
					: undefined,
				include: INCLUDE_FIELD_WITH_COMPLETE_INSCRIPCIONES,
				orderBy: {
					nombres: "asc",
				},
			});

			return usuarios.map(u => ({
				...u,
				alumno: u.alumno
					? {
							...u.alumno,
							inscripciones: u.alumno.inscripciones.map(
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
							),
						}
					: null,
			}));
		}

		const usuarios = await this._client.usuario.findMany({
			where,
			include: INCLUDE_FIELD_WITH_COMPLETE_INSCRIPCIONES,
			orderBy: {
				nombres: "asc",
			},
		});

		return usuarios.map(u => ({
			...u,
			alumno: u.alumno
				? {
						...u.alumno,
						inscripciones: u.alumno.inscripciones.map(
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
						),
					}
				: null,
		}));
	}

	getAll(params?: GetAllUsuariosParams): Promise<IUsuario[]> {
		const {
			administrativo_estado,
			profesor_estado,
			alumno_estado,
			grupoId,
			sedeId,
			tipo,
			fullTextSearch,
			...plainFilters
		} = params?.filters || {};

		const searchTexts = fullTextSearch
			?.trim()
			.split(" ")
			.filter(s => !!s);

		const searchOR = [
			{
				nombres: {
					in: searchTexts,
				},
			},
			{
				primerApellido: {
					in: searchTexts,
				},
			},
			{
				segundoApellido: {
					in: searchTexts,
				},
			},
		] satisfies UsuarioORType;
		const sedeOR = [
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
		] satisfies UsuarioORType;

		const where = params?.filters
			? ({
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
						: undefined,
					grupos: grupoId ? { some: { grupoId } } : undefined,

					OR:
						sedeId && searchTexts?.length
							? sedeOR.map(f => ({ ...f, OR: searchOR }))
							: sedeId && !searchTexts?.length
								? sedeOR
								: !sedeId && searchTexts?.length
									? searchOR
									: undefined,
				} satisfies Exclude<
					Parameters<PrismaClient["usuario"]["findMany"]>[0],
					undefined
				>["where"])
			: undefined;

		if (tipo && typeof tipo === "string") {
			if (tipo === "ALUMNO") {
				return this._client.usuario.findMany({
					where: where
						? {
								...where,
								alumno: alumno_estado
									? {
											estado: alumno_estado,
										}
									: { isNot: null },
							}
						: undefined,
					include: INCLUDE_FIELD,
					orderBy: {
						nombres: "asc",
					},
				});
			}

			if (tipo === "ADMINISTRATIVO") {
				return this._client.usuario.findMany({
					where: where
						? {
								...where,
								administrativo: administrativo_estado
									? {
											estado: administrativo_estado,
										}
									: { isNot: null },
							}
						: undefined,
					include: INCLUDE_FIELD,
					orderBy: {
						nombres: "asc",
					},
				});
			}

			return this._client.usuario.findMany({
				where: where
					? {
							...where,
							profesor: profesor_estado
								? {
										estado: profesor_estado,
									}
								: { isNot: null },
						}
					: undefined,
				include: INCLUDE_FIELD,
				orderBy: {
					nombres: "asc",
				},
			});
		}

		return this._client.usuario.findMany({
			where,
			include: INCLUDE_FIELD,
			orderBy: {
				nombres: "asc",
			},
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

				include: INCLUDE_FIELD,
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
			const {
				alumno: {
					nivelAcademicoId,
					asesorCrmId,
					centroInformacionId,
					...alumno
				},
				usuarioData,
			} = params;

			return this._client.usuario.create({
				data: {
					...usuarioData,
					alumno: {
						create: {
							...alumno,
							asesorCrm: asesorCrmId
								? { connect: { id: asesorCrmId } }
								: undefined,
							centroInformacion: { connect: { id: centroInformacionId } },
							inscripciones: {
								create: {
									nivelAcademico: { connect: { id: nivelAcademicoId } },
								},
							},
						},
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

				include: INCLUDE_FIELD,
			});
		}

		const {
			alumno: { asesorCrmId, nivelAcademicoId, centroInformacionId, ...alumno },
			joinGroup,
			usuarioId,
		} = params;

		return this._client.usuario.update({
			where: {
				id: usuarioId,
			},
			data: {
				alumno: {
					create: {
						...alumno,
						asesorCrm: asesorCrmId
							? { connect: { id: asesorCrmId } }
							: undefined,
						centroInformacion: { connect: { id: centroInformacionId } },
						inscripciones: {
							create: {
								nivelAcademico: { connect: { id: nivelAcademicoId } },
							},
						},
					},
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

				include: INCLUDE_FIELD,
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
		id,
		inscripcionId,
		data: { nivelAcademicoId, matricula, matricularseConLimite, ...data },
	}: UpdateAlumnoParams): Promise<IUsuario> {
		return this._client.usuario.update({
			where: { id },
			data: {
				alumno: {
					update: {
						...data,
						inscripciones: {
							update: {
								where: {
									id: inscripcionId,
								},
								data: {
									matricula,
									matricularseConLimite,
									nivelAcademico: nivelAcademicoId
										? { connect: { id: nivelAcademicoId } }
										: undefined,
								},
							},
						},
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

	update({ id, data }: UpdateUsuarioParams): Promise<IUsuario> {
		return this._client.usuario.update({
			where: { id },
			data,

			include: INCLUDE_FIELD,
		});
	}
}
