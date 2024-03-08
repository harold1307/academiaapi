import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
import { TipoUsuario } from "@prisma/client";
import { z } from "zod";
import { StartupBuilder } from "../../../Main/Inversify/Inversify.config";

import { CommonResponse } from "../../../Utils/CommonResponse";
import { Constants } from "../../../Utils/Constants";
import { ErrorHandler } from "../../../Utils/ErrorHandler";
import type { ZodInferSchema } from "../../../types";
import { AsesorCrmService } from "../../AsesorCrm/Application/Service";
import type { IAsesorCrmService } from "../../AsesorCrm/Domain/IAsesorCrmService";
import { AsesorCrmEnCentroInformacionService } from "../../AsesorCrmEnCentroInformacion/Application/Service";
import type { IAsesorCrmEnCentroInformacionService } from "../../AsesorCrmEnCentroInformacion/Domain/IAsesorCrmEnCentroInformacionService";
import type { ICreateAsesorCrmEnCentroInformacion } from "../../AsesorCrmEnCentroInformacion/Domain/ICreateAsesorCrmEnCentroInformacion";
import { AsesorEstudianteService } from "../../AsesorEstudiante/Application/Service";
import type { IAsesorEstudianteService } from "../../AsesorEstudiante/Domain/IAsesorEstudianteService";
import type { ICreateAsesorEstudiante } from "../../AsesorEstudiante/Domain/ICreateAsesorEstudiante";
import { CentroInformacionService } from "../../CentroInformacion/Application/Service";
import type { ICentroInformacionService } from "../../CentroInformacion/Domain/ICentroInformacionService";
import { CoordinacionService } from "../../Coordinacion/Application/Service";
import type { ICoordinacionService } from "../../Coordinacion/Domain/ICoordinacionService";
import { GrupoService } from "../../Grupo/Application/Service";
import type { IGrupoService } from "../../Grupo/Domain/IGrupoService";
import { InscripcionService } from "../../Inscripcion/Application/Service";
import type { ICreateInscripcion } from "../../Inscripcion/Domain/ICreateInscripcion";
import type { IInscripcionService } from "../../Inscripcion/Domain/IInscripcionService";
import { NivelAcademicoService } from "../../NivelAcademico/Application/Service";
import type { INivelAcademicoService } from "../../NivelAcademico/Domain/INivelAcademicoService";
import { NivelMallaService } from "../../NivelMalla/Application/Service";
import type { INivelMallaService } from "../../NivelMalla/Domain/INivelMallaService";
import { ProgramaService } from "../../Programa/Application/Service";
import type { IProgramaService } from "../../Programa/Domain/IProgramaService";
import { ResponsableAsesorEstudianteService } from "../../ResponsableAsesorEstudiante/Application/Service";
import type { ICreateResponsableAsesorEstudiante } from "../../ResponsableAsesorEstudiante/Domain/ICreateResponsableAsesorEstudiante";
import type { IResponsableAsesorEstudianteService } from "../../ResponsableAsesorEstudiante/Domain/IResponsableAsesorEstudianteService";
import { ResponsableCrmService } from "../../ResponsableCrm/Application/Service";
import type { IResponsableCrmService } from "../../ResponsableCrm/Domain/IResponsableCrmService";
import { SedeService } from "../../Sede/Application/Service";
import type { ISedeService } from "../../Sede/Domain/ISedeService";
import { UsuarioEnGrupoService } from "../../UsuarioEnGrupo/Application/Service";
import type { IUsuarioEnGrupoService } from "../../UsuarioEnGrupo/Domain/IUsuarioEnGrupoService";
import type { ICreateAdministrativo } from "../Domain/ICreateAdministrativo";
import type { ICreateAlumno } from "../Domain/ICreateAlumno";
import type { ICreateProfesor } from "../Domain/ICreateProfesor";
import type { ICreateUsuario } from "../Domain/ICreateUsuario";
import type { IUpdateAdministrativo } from "../Domain/IUpdateAdministrativo";
import type { IUpdateAlumno } from "../Domain/IUpdateAlumno";
import type { IUpdateProfesor } from "../Domain/IUpdateProfesor";
import type { IUpdateUsuario } from "../Domain/IUpdateUsuario";
import type { IUsuarioController } from "../Domain/IUsuarioController";
import type { IUsuarioService } from "../Domain/IUsuarioService";
import { UsuarioService } from "./Service";

export class UsuarioController implements IUsuarioController {
	private _usuarioService: IUsuarioService;
	private _inscripcionService: IInscripcionService;
	private _nivelAcademicoService: INivelAcademicoService;
	private _usuarioEnGrupoService: IUsuarioEnGrupoService;
	private _grupoService: IGrupoService;
	private _nivelMallaService: INivelMallaService;
	private _programaService: IProgramaService;
	private _coordinacionService: ICoordinacionService;
	private _centroInformacionService: ICentroInformacionService;
	private _sedeService: ISedeService;
	private _asesorCrmService: IAsesorCrmService;
	private _asesorCrmEnCentroInformacionService: IAsesorCrmEnCentroInformacionService;
	private _responsableCrmService: IResponsableCrmService;
	private _asesorEstudianteService: IAsesorEstudianteService;
	private _responsableAsesorEstudianteService: IResponsableAsesorEstudianteService;

	constructor() {
		this._usuarioService = StartupBuilder.resolve(UsuarioService);
		this._inscripcionService = StartupBuilder.resolve(InscripcionService);
		this._nivelAcademicoService = StartupBuilder.resolve(NivelAcademicoService);
		this._usuarioEnGrupoService = StartupBuilder.resolve(UsuarioEnGrupoService);
		this._grupoService = StartupBuilder.resolve(GrupoService);
		this._nivelMallaService = StartupBuilder.resolve(NivelMallaService);
		this._programaService = StartupBuilder.resolve(ProgramaService);
		this._coordinacionService = StartupBuilder.resolve(CoordinacionService);
		this._centroInformacionService = StartupBuilder.resolve(
			CentroInformacionService,
		);
		this._sedeService = StartupBuilder.resolve(SedeService);
		this._asesorCrmService = StartupBuilder.resolve(AsesorCrmService);
		this._asesorCrmEnCentroInformacionService = StartupBuilder.resolve(
			AsesorCrmEnCentroInformacionService,
		);
		this._responsableCrmService = StartupBuilder.resolve(ResponsableCrmService);
		this._asesorEstudianteService = StartupBuilder.resolve(
			AsesorEstudianteService,
		);
		this._responsableAsesorEstudianteService = StartupBuilder.resolve(
			ResponsableAsesorEstudianteService,
		);
	}

	async usuariosGetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const tipoQuery = req.query.getAll("tipo");

			const usuarios = await this._usuarioService.getAllUsuarios({
				filters: {
					...Object.fromEntries(req.query.entries()),
					tipo:
						tipoQuery.length > 0
							? tipoQuery.length === 1
								? tipoQuery[0]
								: tipoQuery
							: undefined,
				},
				withInscripciones: !!req.query.get("withInscripciones"),
			});

			return CommonResponse.successful({ data: usuarios });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosGetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			return CommonResponse.successful({ data: usuario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosUpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const usuario = await this._usuarioService.updateUsuarioById({
				id: usuarioId,
				data: bodyVal.data,
			});

			return CommonResponse.successful({ data: usuario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosAppendToGroup(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;
			const grupoId = req.params.grupoId;

			if (!usuarioId || !grupoId) return CommonResponse.invalidId();

			const grupo = await this._grupoService.getGrupoById(grupoId);

			if (!grupo)
				return {
					jsonBody: {
						message: "El grupo no existe",
					},
					status: 400,
				};

			if (Object.keys(Constants.STATIC_GROUPS).includes(grupo.nombre)) {
				return {
					jsonBody: {
						message: "Este grupo no puede ser asignado manualmente",
					},
					status: 400,
				};
			}

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (usuario.grupos.some(g => g.grupoId === grupoId)) {
				return {
					jsonBody: {
						message: "El usuario ya existe en el grupo",
					},
					status: 400,
				};
			}

			const newUsuarioEnGrupo =
				await this._usuarioEnGrupoService.createUsuarioEnGrupo({
					grupoId,
					usuarioId,
				});

			ctx.log({ newUsuarioEnGrupo });

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
	async usuariosRemoveFromGroup(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;
			const grupoId = req.params.grupoId;

			if (!usuarioId || !grupoId) return CommonResponse.invalidId();

			const grupo = await this._grupoService.getGrupoById(grupoId);

			if (!grupo)
				return {
					jsonBody: {
						message: "El grupo no existe",
					},
					status: 400,
				};

			if (Object.keys(Constants.STATIC_GROUPS).includes(grupo.nombre)) {
				return {
					jsonBody: {
						message: "Este grupo no puede ser removido manualmente",
					},
					status: 400,
				};
			}

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.grupos.some(g => g.grupoId === grupoId)) {
				return {
					jsonBody: {
						message: "El usuario no existe en el grupo",
					},
					status: 400,
				};
			}

			await this._usuarioEnGrupoService.deleteUsuarioEnGrupoById({
				grupoId,
				usuarioId,
			});

			return CommonResponse.successful();
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateAdministrativo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAdministrativoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { sedeId } = bodyVal.data;

			const sede = await this._sedeService.getSedeById(sedeId);

			if (!sede)
				return {
					jsonBody: {
						message: "La sede no existe",
					},
					status: 400,
				};

			const newUsuario =
				await this._usuarioService.createAdministrativoByUsuarioId({
					__typename: "USUARIO_EXISTENTE",
					usuarioId,
					data: {
						sedeId,
					},
				});

			ctx.log({ newUsuario });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateAlumno(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAlumnoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				nivelAcademicoId,
				centroInformacionId,
				fechaExamenSNNA,
				fechaInscripcion,
				...data
			} = bodyVal.data;

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					nivelAcademicoId,
				);

			if (!nivelAcademico)
				return {
					jsonBody: {
						message: "El nivel academico no existe",
					},
					status: 400,
				};

			const centro =
				await this._centroInformacionService.getCentroInformacionById(
					centroInformacionId,
				);

			if (!centro)
				return {
					jsonBody: {
						message: "El centro de informacion no existe",
					},
					status: 400,
				};

			const newUsuario = await this._usuarioService.createAlumnoByUsuarioId({
				__typename: "USUARIO_EXISTENTE",
				usuarioId,
				data: {
					...data,
					centroInformacionId,
					nivelAcademicoId,
					fechaExamenSNNA: fechaExamenSNNA ? new Date(fechaExamenSNNA) : null,
					fechaInscripcion: new Date(fechaInscripcion),
				},
			});

			ctx.log({ newUsuario });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateProfesor(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createProfesorBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { coordinacionId, programaId, ...data } = bodyVal.data;

			const coordinacion =
				await this._coordinacionService.getCoordinacionById(coordinacionId);

			if (!coordinacion)
				return {
					jsonBody: {
						message: "La coordinacion no existe",
					},
					status: 400,
				};

			if (programaId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};

				if (programa.coordinacionId !== coordinacionId)
					return {
						jsonBody: {
							message: "El programa no corresponde a la coordinacion indicada",
						},
						status: 400,
					};
			}

			const newUsuario = await this._usuarioService.createProfesorByUsuarioId({
				__typename: "USUARIO_EXISTENTE",
				usuarioId,
				data: {
					...data,
					programaId,
					coordinacionId,
				},
			});

			ctx.log({ newUsuario });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreate(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const body = await req.json();
			const bodyVal = createBodySchema.safeParse(body);

			if (!bodyVal.success)
				return CommonResponse.invalidBody(ctx, bodyVal.error.issues);

			const data = bodyVal.data;

			if (data.tipo === "ADMINISTRATIVO") {
				const { sedeId, fechaNacimiento, emailVerified, ...usuarioData } = data;

				const sede = await this._sedeService.getSedeById(sedeId);

				if (!sede)
					return {
						jsonBody: {
							message: "La sede no existe",
						},
						status: 400,
					};

				const newUsuario =
					await this._usuarioService.createAdministrativoByUsuarioId({
						__typename: "NUEVO_USUARIO",
						usuarioData: {
							...usuarioData,
							fechaNacimiento: new Date(fechaNacimiento),
							emailVerified: emailVerified ? new Date(emailVerified) : null,
						},
						data: {
							sedeId,
						},
					});

				ctx.log("Nuevo usuario administrativo");
				ctx.log({ newUsuario });

				return CommonResponse.successful({ status: 201 });
			}

			if (data.tipo === "PROFESOR") {
				const {
					categoria,
					coordinacionId,
					programaId,
					tiempoDedicacion,
					fechaNacimiento,
					emailVerified,
					...usuarioData
				} = data;

				const coordinacion =
					await this._coordinacionService.getCoordinacionById(coordinacionId);

				if (!coordinacion)
					return {
						jsonBody: {
							message: "La coordinacion no existe",
						},
						status: 400,
					};

				if (programaId) {
					const programa =
						await this._programaService.getProgramaById(programaId);

					if (!programa)
						return {
							jsonBody: {
								message: "El programa no existe",
							},
							status: 400,
						};

					if (programa.coordinacionId !== coordinacionId)
						return {
							jsonBody: {
								message:
									"El programa no corresponde a la coordinacion indicada",
							},
							status: 400,
						};
				}

				const newUsuario = await this._usuarioService.createProfesorByUsuarioId(
					{
						__typename: "NUEVO_USUARIO",
						usuarioData: {
							...usuarioData,
							fechaNacimiento: new Date(fechaNacimiento),
							emailVerified: emailVerified ? new Date(emailVerified) : null,
						},
						data: {
							categoria,
							coordinacionId,
							programaId,
							tiempoDedicacion,
						},
					},
				);

				ctx.log("Nuevo usuario profesor");
				ctx.log({ newUsuario });

				return CommonResponse.successful({ status: 201 });
			}

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					data.nivelAcademicoId,
				);

			if (!nivelAcademico)
				return {
					jsonBody: {
						message: "El nivel academico no existe",
					},
					status: 400,
				};

			const centro =
				await this._centroInformacionService.getCentroInformacionById(
					data.centroInformacionId,
				);

			if (!centro)
				return {
					jsonBody: {
						message: "El centro de informacion no existe",
					},
					status: 400,
				};

			const newUsuario = await this._usuarioService.createAlumnoByUsuarioId({
				__typename: "NUEVO_USUARIO",
				usuarioData: {
					...data,
					fechaNacimiento: new Date(data.fechaNacimiento),
					emailVerified: data.emailVerified
						? new Date(data.emailVerified)
						: null,
				},
				data: {
					...data,
					cedula: data.alumnoCedula,
					fechaExamenSNNA: data.fechaExamenSNNA
						? new Date(data.fechaExamenSNNA)
						: null,
					fechaInscripcion: new Date(data.fechaInscripcion),
				},
			});

			ctx.log("Nuevo usuario alumno");
			ctx.log({ newUsuario });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateInscripcion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createInscripcionBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { nivelAcademicoId } = bodyVal.data;

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.alumno)
				return {
					jsonBody: {
						message: "El usuario no tiene acceso de alumno",
					},
					status: 400,
				};

			const nivelAcademico =
				await this._nivelAcademicoService.getNivelAcademicoById(
					nivelAcademicoId,
				);

			if (!nivelAcademico)
				return {
					jsonBody: {
						message: "El nivel academico no existe",
					},
					status: 400,
				};

			const newInscripcion = await this._inscripcionService.createInscripcion({
				alumnoId: usuario.alumno.id,
				nivelAcademicoId,
			});

			ctx.log({ newInscripcion });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosUpdateAdministrativo(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateAdministrativoBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const usuario =
				await this._usuarioService.updateAdministrativoByUsuarioId({
					id: usuarioId,
					data: bodyVal.data,
				});

			return CommonResponse.successful({ data: usuario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosUpdateProfesor(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);
			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateProfesorBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const {
				programaId: programaIdFromData,
				coordinacionId: coordinacionIdFromData,
				...data
			} = bodyVal.data;

			let programaId = programaIdFromData;
			let coordinacionId = coordinacionIdFromData;

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.profesor)
				return {
					jsonBody: {
						message: "El usuario no tiene acceso de profesor",
					},
					status: 400,
				};

			if (programaId && programaId === usuario.profesor.programaId) {
				programaId = undefined;
			}

			if (
				coordinacionId &&
				coordinacionId === usuario.profesor.coordinacionId
			) {
				coordinacionId = undefined;
			}

			if (programaId && coordinacionId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};

				if (coordinacionId !== programa.coordinacionId)
					return {
						jsonBody: {
							message: "El programa no corresponde a la coordinacion ingresada",
						},
						status: 400,
					};
			}

			if (programaId && !coordinacionId) {
				const programa =
					await this._programaService.getProgramaById(programaId);

				if (!programa)
					return {
						jsonBody: {
							message: "El programa no existe",
						},
						status: 400,
					};

				if (programa.coordinacionId !== usuario.profesor.coordinacionId)
					return {
						jsonBody: {
							message: "El programa no corresponde a la coordinacion existente",
						},
						status: 400,
					};
			}

			if (!programaId && coordinacionId && usuario.profesor.programa) {
				const coordinacion =
					await this._coordinacionService.getCoordinacionById(coordinacionId);

				if (!coordinacion)
					return {
						jsonBody: {
							message: "La coordinacion no existe",
						},
						status: 400,
					};

				if (coordinacionId !== usuario.profesor.programa.coordinacionId)
					return {
						jsonBody: {
							message: "La coordinacion no pertenece al programa existente",
						},
						status: 400,
					};
			}

			const updatedUsuario =
				await this._usuarioService.updateProfesorByUsuarioId({
					id: usuarioId,
					data: {
						...data,
						coordinacionId,
						programaId,
					},
				});

			return CommonResponse.successful({ data: updatedUsuario });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosUpdateAlumnoWithInscripcion(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;
			const inscripcionId = req.params.inscripcionId;

			if (!usuarioId || !inscripcionId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = updateAlumnoWithInscripcionBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const { nivelAcademicoId: _, ...data } = bodyVal.data;
			let nivelAcademicoId = _;

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.alumno)
				return {
					jsonBody: {
						message: "El usuario no tiene acceso de alumno",
					},
					status: 400,
				};

			const inscripcion =
				await this._inscripcionService.getInscripcionById(inscripcionId);

			if (!inscripcion)
				return {
					jsonBody: {
						message: "La inscripcion no existe",
					},
					status: 400,
				};

			if (
				nivelAcademicoId &&
				nivelAcademicoId === inscripcion.nivelAcademicoId
			) {
				nivelAcademicoId = undefined;
			}

			if (
				nivelAcademicoId &&
				nivelAcademicoId !== inscripcion.nivelAcademicoId
			) {
				const nivelAcademico =
					await this._nivelAcademicoService.getNivelAcademicoById(
						nivelAcademicoId,
					);

				if (!nivelAcademico)
					return {
						jsonBody: {
							message: "El nivel academico no existe de la inscripcion",
						},
						status: 400,
					};

				const nivelMalla = await this._nivelMallaService.getNivelMallaById(
					nivelAcademico.nivelMallaId,
				);

				if (!nivelMalla)
					return {
						jsonBody: {
							message: "El nivel en malla del nivel academico no existe",
						},
						status: 400,
					};

				if (nivelMalla.mallaId !== inscripcion.malla.id)
					return {
						jsonBody: {
							message:
								"La malla de la inscripcion no coincide con la malla de la sesion ingresada, no se puede cambiar de malla a los alumnos inscritos",
						},
						status: 400,
					};
			}

			const updatedAlumno = await this._usuarioService.updateAlumnoByUsuarioId({
				id: usuarioId,
				inscripcionId,
				data: {
					...data,
					nivelAcademicoId,
				},
			});

			return CommonResponse.successful({ data: updatedAlumno });
		} catch (error) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateAsesorCrm(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAsesorCrmBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.administrativo)
				return {
					jsonBody: {
						message:
							"El usuario no tiene acceso de administrativo, no se puede ser un asesor de CRM",
					},
					status: 400,
				};

			if (usuario.administrativo.asesorCrm)
				return {
					jsonBody: {
						message: "El usuario ya es un asesor de CRM",
					},
					status: 400,
				};

			const newAsesorCrm = await this._asesorCrmService.createAsesorCrm({
				administrativoId: usuario.administrativo.id,
			});

			const writtenCentros =
				await this._asesorCrmEnCentroInformacionService.createAsesorCrmEnCentroInformacion(
					{
						asesorCrmId: newAsesorCrm.id,
						centroInformacionIds: bodyVal.data.centroInformacionIds,
					},
				);

			ctx.log({ newAsesorCrm, writtenCentros });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateResponsableCrm(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.administrativo)
				return {
					jsonBody: {
						message:
							"El usuario no tiene acceso de administrativo, no se puede ser un responsable de CRM",
					},
					status: 400,
				};

			if (usuario.administrativo.responsableCrm)
				return {
					jsonBody: {
						message: "El usuario ya es un responsable de CRM",
					},
					status: 400,
				};

			const newresponsableCrm =
				await this._responsableCrmService.createResponsableCrm({
					administrativoId: usuario.administrativo.id,
				});

			ctx.log({ newresponsableCrm });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateAsesorEstudiante(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal = createAsesorEstudianteBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.administrativo)
				return {
					jsonBody: {
						message:
							"El usuario no tiene acceso de administrativo, no se puede ser un asesor de estudiante",
					},
					status: 400,
				};

			if (usuario.administrativo.asesorEstudiante)
				return {
					jsonBody: {
						message: "El usuario ya es un asesor de estudiante",
					},
					status: 400,
				};

			const newasesorEstudiante =
				await this._asesorEstudianteService.createAsesorEstudiante({
					...bodyVal.data,
					administrativoId: usuario.administrativo.id,
				});

			ctx.log({ newasesorEstudiante });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}

	async usuariosCreateResponsableAsesorEstudiante(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit> {
		try {
			ctx.log(`Http function processed request for url '${req.url}'`);

			const usuarioId = req.params.usuarioId;

			if (!usuarioId) return CommonResponse.invalidId();

			const body = await req.json();
			const bodyVal =
				createResponsableAsesorEstudianteBodySchema.safeParse(body);

			if (!bodyVal.success) return CommonResponse.invalidBody();

			const usuario = await this._usuarioService.getUsuarioById(usuarioId);

			if (!usuario)
				return {
					jsonBody: {
						message: "El usuario no existe",
					},
					status: 400,
				};

			if (!usuario.administrativo)
				return {
					jsonBody: {
						message:
							"El usuario no tiene acceso de administrativo, no se puede ser un responsable de asesor de estudiante",
					},
					status: 400,
				};

			if (usuario.administrativo.responsableAsesorEstudiante)
				return {
					jsonBody: {
						message: "El usuario ya es un responsable de asesor de estudiante",
					},
					status: 400,
				};

			const newasesorEstudiante =
				await this._responsableAsesorEstudianteService.createResponsableAsesorEstudiante(
					{
						...bodyVal.data,
						administrativoId: usuario.administrativo.id,
					},
				);

			ctx.log({ newasesorEstudiante });

			return CommonResponse.successful({ status: 201 });
		} catch (error: any) {
			return ErrorHandler.handle({ ctx, error });
		}
	}
}

const updateBodySchema = z.object<ZodInferSchema<IUpdateUsuario>>({
	estado: z.boolean().optional(),
	cedula: z.string().nullable().optional(),
	pasaporte: z.string().nullable().optional(),
	nombres: z.string().toUpperCase().optional(),
	primerApellido: z.string().toUpperCase().optional(),
	segundoApellido: z.string().toUpperCase().nullable().optional(),
	nacionalidad: z.string().nullable().optional(),
	paisNacimiento: z.string().nullable().optional(),
	provinciaNacimiento: z.string().nullable().optional(),
	cantonNacimiento: z.string().nullable().optional(),
	parroquiaNacimiento: z.string().nullable().optional(),
	fechaNacimiento: z.date().optional(),
	sexo: z.enum(["HOMBRE", "MUJER"] as const).optional(),
	genero: z
		.enum(["FEMENINO", "MASCULINO"] as const)
		.nullable()
		.optional(),
	etnia: z
		.enum([
			"AFROECUATORIANO",
			"BLANCO",
			"INDIGENA",
			"MESTIZO",
			"MONTUVIO",
			"MULATO",
			"NEGRO",
			"OTRO",
		] as const)
		.nullable()
		.optional(),
	estadoCivil: z
		.enum([
			"SOLTERO",
			"CASADO",
			"DIVORCIADO",
			"UNION_LIBRE",
			"UNION_DE_HECHO",
			"VIUDO",
		] as const)
		.nullable()
		.optional(),
	tipoSangre: z.string().nullable().optional(),
	paisResidencia: z.string().nullable().optional(),
	callePrincipal: z.string().nullable().optional(),
	calleSecundaria: z.string().nullable().optional(),
	numeroDomicilio: z.string().nullable().optional(),
	provinciaDondeSufraga: z.string().nullable().optional(),
	telefonoMovil: z.string().nullable().optional(),
	telefonoFijo: z.string().nullable().optional(),
	correoElectronico: z.string().email().nullable().optional(),
	correoInstitucional: z.string().email().nullable().optional(),

	email: z.string().email().nullable().optional(),
	emailVerified: z.date().nullable().optional(),
	image: z.string().nullable().optional(),
	name: z.string().nullable().optional(),
});

const createAdministrativoBodySchema = z.object<
	ZodInferSchema<ICreateAdministrativo>
>({
	sedeId: z.string(),
});

const createAlumnoBodySchema = z.object<
	ZodInferSchema<
		Omit<ICreateAlumno, "fechaInscripcion" | "fechaExamenSNNA"> & {
			fechaInscripcion: string;
			fechaExamenSNNA: string | null;
		}
	>
>({
	colegio: z.string().nullable(),
	especialidad: z.string().nullable(),
	fechaInscripcion: z.string().datetime(),
	codigoPromocion: z.string().nullable(),
	archivador: z.string().nullable(),
	comoNosConocio: z.enum([
		"FACEBOOK",
		"INSTAGRAM",
		"OTROS_MEDIOS",
		"PERIODICO",
		"PUBLICIDAD_FISICA",
		"RADIO",
		"REDES_SOCIALES",
		"TELEVISION",
		"TIKTOK",
		"TWITTER",
		"UN_AMIGO_ESTUDIO_AQUI",
		"UN_FAMILIAR_ESTUDIO_AQUI",
		"VISITAS_A_COLEGIOS",
	] as const),
	razonesParaInscribirse: z.enum([
		"AMIGOS",
		"CARRERAS",
		"HORARIOS",
		"INSTALACIONES",
		"MENCIONES",
	] as const),
	fechaExamenSNNA: z.string().datetime().nullable(),
	puntajeSNNA: z.number().nullable(),
	titulo: z.boolean(),
	papeletaVotacion: z.boolean(),
	copiaLicencia: z.boolean(),
	condicionado: z.boolean(),
	rindioExamenEgresoInstitucion: z.boolean(),
	actaGrado: z.boolean(),
	partidaNacimiento: z.boolean(),
	certificadoAntecedentes: z.boolean(),
	planillaServicioBasico: z.boolean(),
	transferenciaOtraIES: z.boolean(),
	certificadoEstudios: z.boolean(),
	documentosHomologacion: z.boolean(),
	certificadoSanguineo: z.boolean(),
	silabos: z.boolean(),
	cedula: z.boolean(),
	fotos: z.boolean(),
	certificadoSalud: z.boolean(),
	transcript: z.boolean(),
	observaciones: z.string().nullable(),

	centroInformacionId: z.string(),
	asesorCrmId: z.string().nullable(),
	nivelAcademicoId: z.string(),
});

const createProfesorBodySchema = z.object<ZodInferSchema<ICreateProfesor>>({
	tiempoDedicacion: z.enum([
		"TIEMPO_COMPLETO",
		"TIEMPO_PARCIAL",
		"MEDIO_TIEMPO",
	] as const),
	categoria: z.enum([
		"HONORARIO",
		"INVITADO",
		"OCASIONAL",
		"TITULAR_AGREGADO",
		"TITULAR_AUXILIAR",
		"TITULAR_PRINCIPAL",
	] as const),

	coordinacionId: z.string(),
	programaId: z.string().nullable(),
});

type CreateUsuarioAlumnoBody = Omit<
	ICreateUsuario,
	"tipo" | "fechaNacimiento" | "emailVerified"
> & {
	fechaNacimiento: string;
	emailVerified: string | null;
} & {
	tipo: typeof TipoUsuario.ALUMNO;
} & Omit<ICreateAlumno, "cedula" | "fechaInscripcion" | "fechaExamenSNNA"> & {
		alumnoCedula: boolean;
		fechaInscripcion: string;
		fechaExamenSNNA: string | null;
	};
type CreateUsuarioAdministrativoBody = Omit<
	ICreateUsuario,
	"tipo" | "fechaNacimiento" | "emailVerified"
> & {
	fechaNacimiento: string;
	emailVerified: string | null;
} & {
	tipo: typeof TipoUsuario.ADMINISTRATIVO;
} & ICreateAdministrativo;
type CreateUsuarioProfesorBody = Omit<
	ICreateUsuario,
	"tipo" | "fechaNacimiento" | "emailVerified"
> & {
	fechaNacimiento: string;
	emailVerified: string | null;
} & {
	tipo: typeof TipoUsuario.PROFESOR;
} & ICreateProfesor;

// type CreateBody =
// 	| CreateUsuarioAlumnoBody
// 	| CreateUsuarioAdministrativoBody
// 	| CreateUsuarioProfesorBody;

const createUsuarioSchema = z.object<
	ZodInferSchema<
		Omit<ICreateUsuario, "tipo" | "fechaNacimiento" | "emailVerified"> & {
			fechaNacimiento: string;
			emailVerified: string | null;
		}
	>
>({
	cedula: z.string().nullable(),
	pasaporte: z.string().nullable(),
	nombres: z.string().toUpperCase(),
	primerApellido: z.string().toUpperCase(),
	segundoApellido: z.string().toUpperCase().nullable(),
	nacionalidad: z.string().nullable(),
	paisNacimiento: z.string().nullable(),
	provinciaNacimiento: z.string().nullable(),
	cantonNacimiento: z.string().nullable(),
	parroquiaNacimiento: z.string().nullable(),
	fechaNacimiento: z.string().datetime(),
	sexo: z.enum(["HOMBRE", "MUJER"] as const),
	genero: z.enum(["FEMENINO", "MASCULINO"] as const).nullable(),
	etnia: z
		.enum([
			"AFROECUATORIANO",
			"BLANCO",
			"INDIGENA",
			"MESTIZO",
			"MONTUVIO",
			"MULATO",
			"NEGRO",
			"OTRO",
		] as const)
		.nullable(),
	estadoCivil: z
		.enum([
			"SOLTERO",
			"CASADO",
			"DIVORCIADO",
			"UNION_LIBRE",
			"UNION_DE_HECHO",
			"VIUDO",
		] as const)
		.nullable(),
	tipoSangre: z.string().nullable(),
	paisResidencia: z.string().nullable(),
	callePrincipal: z.string().nullable(),
	calleSecundaria: z.string().nullable(),
	numeroDomicilio: z.string().nullable(),
	provinciaDondeSufraga: z.string().nullable(),
	telefonoMovil: z.string().nullable(),
	telefonoFijo: z.string().nullable(),
	correoElectronico: z.string().email().nullable(),
	correoInstitucional: z.string().email().nullable(),

	email: z.string().email().nullable(),
	emailVerified: z.string().datetime().nullable(),
	image: z.string().nullable(),
	name: z.string().nullable(),
});

const createBodySchema = z.discriminatedUnion("tipo", [
	createUsuarioSchema.merge(
		createAlumnoBodySchema.omit({ cedula: true }).extend({
			tipo: z.literal(TipoUsuario.ALUMNO),
			alumnoCedula: z.boolean(),
		}),
	) satisfies z.ZodSchema<CreateUsuarioAlumnoBody>,
	createUsuarioSchema.merge(
		createAdministrativoBodySchema.extend({
			tipo: z.literal(TipoUsuario.ADMINISTRATIVO),
		}),
	) satisfies z.ZodSchema<CreateUsuarioAdministrativoBody>,
	createUsuarioSchema.merge(
		createProfesorBodySchema.extend({
			tipo: z.literal(TipoUsuario.PROFESOR),
		}),
	) satisfies z.ZodSchema<CreateUsuarioProfesorBody>,
]);

const createInscripcionBodySchema = z.object<
	ZodInferSchema<Omit<ICreateInscripcion, "alumnoId">>
>({
	nivelAcademicoId: z.string(),
});

const updateAdministrativoBodySchema = z.object<
	ZodInferSchema<IUpdateAdministrativo>
>({
	estado: z.boolean().optional(),
	parametrosInstitucion: z.boolean().optional(),
	talentoHumano: z.boolean().optional(),
	personalAdministrativo: z.boolean().optional(),
	profesores: z.boolean().optional(),
	periodosLectivos: z.boolean().optional(),
	asignaturas: z.boolean().optional(),
	modelosEvaluativos: z.boolean().optional(),
	crmPreinscritos: z.boolean().optional(),
	sedeId: z.string().uuid().optional(),
});

const updateProfesorBodySchema = z.object<ZodInferSchema<IUpdateProfesor>>({
	estado: z.boolean().optional(),
	tiempoDedicacion: z
		.enum(["TIEMPO_COMPLETO", "TIEMPO_PARCIAL", "MEDIO_TIEMPO"] as const)
		.optional(),
	categoria: z
		.enum([
			"HONORARIO",
			"INVITADO",
			"OCASIONAL",
			"TITULAR_AGREGADO",
			"TITULAR_AUXILIAR",
			"TITULAR_PRINCIPAL",
		] as const)
		.optional(),

	coordinacionId: z.string().uuid().optional(),
	programaId: z.string().uuid().nullable().optional(),
});

const updateAlumnoWithInscripcionBodySchema = z.object<
	ZodInferSchema<IUpdateAlumno>
>({
	estado: z.enum(["ACTIVO", "EGRESADO", "RETIRADO"] as const).optional(),
	colegio: z.string().nullable().optional(),
	especialidad: z.string().nullable().optional(),
	fechaInscripcion: z.date().optional(),
	codigoPromocion: z.string().nullable().optional(),
	archivador: z.string().nullable().optional(),
	comoNosConocio: z
		.enum([
			"FACEBOOK",
			"INSTAGRAM",
			"OTROS_MEDIOS",
			"PERIODICO",
			"PUBLICIDAD_FISICA",
			"RADIO",
			"REDES_SOCIALES",
			"TELEVISION",
			"TIKTOK",
			"TWITTER",
			"UN_AMIGO_ESTUDIO_AQUI",
			"UN_FAMILIAR_ESTUDIO_AQUI",
			"VISITAS_A_COLEGIOS",
		] as const)
		.optional(),
	razonesParaInscribirse: z
		.enum([
			"AMIGOS",
			"CARRERAS",
			"HORARIOS",
			"INSTALACIONES",
			"MENCIONES",
		] as const)
		.optional(),
	fechaExamenSNNA: z.date().nullable().optional(),
	puntajeSNNA: z.number().nullable().optional(),
	titulo: z.boolean().optional(),
	papeletaVotacion: z.boolean().optional(),
	copiaLicencia: z.boolean().optional(),
	condicionado: z.boolean().optional(),
	rindioExamenEgresoInstitucion: z.boolean().optional(),
	actaGrado: z.boolean().optional(),
	partidaNacimiento: z.boolean().optional(),
	certificadoAntecedentes: z.boolean().optional(),
	planillaServicioBasico: z.boolean().optional(),
	transferenciaOtraIES: z.boolean().optional(),
	certificadoEstudios: z.boolean().optional(),
	documentosHomologacion: z.boolean().optional(),
	certificadoSanguineo: z.boolean().optional(),
	silabos: z.boolean().optional(),
	cedula: z.boolean().optional(),
	fotos: z.boolean().optional(),
	certificadoSalud: z.boolean().optional(),
	transcript: z.boolean().optional(),
	observaciones: z.string().nullable().optional(),

	centroInformacionId: z.string().uuid().optional(),

	nivelAcademicoId: z.string().uuid().optional(),
	matricula: z.boolean().optional(),
	matricularseConLimite: z.boolean().optional(),
});

const createAsesorCrmBodySchema = z.object<
	ZodInferSchema<Omit<ICreateAsesorCrmEnCentroInformacion, "asesorCrmId">>
>({
	centroInformacionIds: z.array(z.string()),
});

const createAsesorEstudianteBodySchema = z.object<
	ZodInferSchema<Omit<ICreateAsesorEstudiante, "administrativoId">>
>({
	seguimientoBienestar: z.boolean(),
	seguimientoExpediente: z.boolean(),
});

const createResponsableAsesorEstudianteBodySchema = z.object<
	ZodInferSchema<Omit<ICreateResponsableAsesorEstudiante, "administrativoId">>
>({
	seguimientoBienestar: z.boolean(),
	seguimientoExpediente: z.boolean(),
});
