import { HttpRequest, InvocationContext } from "@azure/functions";

import type { ICreateMateriaEnNivelAcademico } from "../../Core/MateriaEnNivelAcademico/Domain/ICreateMateriaEnNivelAcademico";
import { NivelAcademicoController } from "../../Core/NivelAcademico/Application/Controller";
import type { ICreateNivelAcademico } from "../../Core/NivelAcademico/Domain/ICreateNivelAcademico";
import { NivelMallaController } from "../../Core/NivelMalla/Application/Controller";
import { Prisma } from "../../Main/Prisma/PrismaClient";

let paraleloId = "";
let mallaId = "";
let sesionId = "";
let modeloEvaluativoId = "";
let nivelMallaId = "";
let sedeAlias = "";
let programaAlias = "";

beforeAll(async () => {
	const sede = await Prisma.sede.create({
		data: {
			pais: "Pais",
			canton: "Canton",
			provincia: "Provincia",
			alias: "MT",
			nombre: "PRINCIPAL",
		},
	});

	const mallaCurricularPromise = Prisma.mallaCurricular.create({
		include: {
			niveles: true,
		},
		data: {
			modalidad: {
				create: {
					nombre: "PRESENCIAL",
				},
			},
			programa: {
				create: {
					alias: "ADM",
					nombre: "ADMINISTRACION",
					coordinacion: {
						create: {
							nombre: "COORDINACION ACADEMICA",
							alias: "COA",
							sede: {
								connect: {
									id: sede.id,
								},
							},
						},
					},
					detalleNivelTitulacion: {
						create: {
							nombre: "NIVEL TECNOLOGO",
							nivelTitulacion: {
								create: {
									nombre: "TECNOLOGO",
								},
							},
						},
					},
				},
			},
			tipoDuracion: "SEMESTRES",
			codigo: null,
			fechaAprobacion: new Date().toISOString(),
			fechaLimiteVigencia: new Date("12-12-2025").toISOString(),
			niveles: {
				create: {
					nivel: 1,
					asignaturas: {
						create: {
							tipoAsignatura: "TEORICA_PRACTICA",
							identificacion: "ADM BASI",
							permiteMatriculacion: true,
							calculoNivel: true,
							validaParaCredito: false,
							validaParaPromedio: false,
							costoEnMatricula: true,
							requeridaParaEgresar: true,
							cantidadMatriculas: 3,
							cantidadMatriculasAutorizadas: 3,
							minimoCreditosRequeridos: null,
							maximaCantidadHorasSemanalas: 0,
							horasColaborativas: 0,
							horasAsistidasDocente: 0,
							horasAutonomas: 0,
							horasPracticas: 0,
							sumaHoras: true,
							creditos: 0,
							horasProyectoIntegrador: 0,
							noValidaAsistencia: false,
							materiaComun: false,
							guiaPracticaMetodologiaObligatoria: false,
							aprobarGuiaPracticaMetodologica: false,
							descripcion: null,
							objetivoGeneral: null,
							resultadosAprendizaje: null,
							aporteAsignaturaAlPerfil: null,
							competenciaGenerica: null,
							objetivosEspecificos: null,
							observaciones: null,
							asignatura: {
								create: {
									nombre: "ADMINISTRACION BASICA",
								},
							},
							areaConocimiento: {
								create: {
									nombre: "NEGOCIOS Y ADMINISTRACION",
								},
							},
							ejeFormativo: {
								create: {
									nombre: "PRINCIPAL",
								},
							},
						},
					},
				},
			},
			cantidadOtrasMateriasMatricula: 2,
			limiteSeleccionMateriaPorAdministrativo: true,
			cantidadArrastres: 2,
			porcentajeMinimoPasarNivel: null,
			maximoMateriasAdelantar: null,
			automatriculaModulos: true,
			plantillasSilabo: false,
			modeloPlanificacion: true,
			perfilEgreso: null,
			observaciones: null,
		},
	});

	const paraleloPromise = Prisma.paralelo.create({
		data: {
			nombre: "K",
			orden: 1,
		},
	});
	const modeloEvaluativoPromise = Prisma.modeloEvaluativo.create({
		data: {
			camposActualizanEstado: true,
			decimalesNotaFinal: 2,
			defineMaximos: true,
			nombre: "MODELO EVALUATIVO 2022",
			notaAprobatoria: 5,
			notaMaxima: 10,
			notaRecuperacion: 4,
			porcentajeAsistenciaAprobatoria: 80,
		},
	});
	const sesionPromise = Prisma.sesion.create({
		data: {
			alias: "ADMI1",
			nombre: "SIMULADOR",
			lunes: true,
			martes: true,
			miercoles: true,
			jueves: true,
			viernes: true,
			sabado: true,
			domingo: true,
			sede: {
				connect: {
					id: sede.id,
				},
			},
		},
	});

	const [malla, paralelo, modeloEvaluativo, sesion, programa] =
		await Prisma.$transaction([
			mallaCurricularPromise,
			paraleloPromise,
			modeloEvaluativoPromise,
			sesionPromise,
			Prisma.programa.findFirst(),
		]);
	console.log({ malla, paralelo, modeloEvaluativo, sesion, programa });
	paraleloId = paralelo.id;
	sesionId = sesion.id;
	modeloEvaluativoId = modeloEvaluativo.id;
	nivelMallaId = malla.niveles.at(0)?.id || "";
	mallaId = malla.id;
	sedeAlias = sede.alias;
	programaAlias = programa!.alias;
});

afterAll(async () => {
	const deleteAsignaturasEnNiveles = Prisma.asignaturaEnNivelMalla.deleteMany();
	const deleteMalla = Prisma.mallaCurricular.deleteMany();
	const deleteNivelesAcademicos = Prisma.nivelAcademico.deleteMany();
	const deleteEjes = Prisma.ejeFormativo.deleteMany();
	const deleteAreas = Prisma.areaConocimiento.deleteMany();
	const deleteAsignaturas = Prisma.asignatura.deleteMany();
	const deleteProgramas = Prisma.programa.deleteMany();
	const deleteDetalles = Prisma.detalleNivelTitulacion.deleteMany();
	const deleteNivelTitulacion = Prisma.nivelTitulacion.deleteMany();
	const deleteCoordinaciones = Prisma.coordinacion.deleteMany();
	const deleteSesiones = Prisma.sesion.deleteMany();
	const deleteSedes = Prisma.sede.deleteMany();
	const deleteModalidades = Prisma.modalidad.deleteMany();
	const deleteParalelos = Prisma.paralelo.deleteMany();
	const deleteModeloEvaluativos = Prisma.modeloEvaluativo.deleteMany();

	await Prisma.$transaction([
		deleteNivelesAcademicos,
		deleteAsignaturasEnNiveles,
		deleteMalla,
		deleteEjes,
		deleteAreas,
		deleteAsignaturas,
		deleteProgramas,
		deleteDetalles,
		deleteNivelTitulacion,
		deleteCoordinaciones,
		deleteSesiones,
		deleteSedes,
		deleteModalidades,
		deleteParalelos,
		deleteModeloEvaluativos,
	]);
});

const commonBody = {
	modeloEvaluativoId,
	paraleloId,
	nombre: "ADMIN EL JORNADA 1",
	fechaInicio: new Date("2024-02-12T05:17:22.176Z"),
	fechaFin: new Date("2024-02-12T10:17:40.842Z"),
	inicioAgregaciones: new Date(),
	limiteAgregaciones: new Date(),
	validaRequisitosMalla: true,
	validaCumplimientoMaterias: false,
	horasMinimasPracticasComunitarias: null,
	horasMinimasPracticasPreprofesionales: null,
	estudiantesPuedenSeleccionarMaterias: true,
	estudiantesPuedenSeleccionarMateriasOtrasModalidades: false,
	estudiantesPuedenSeleccionarMateriasOtrosHorarios: false,
	estudiantesRegistranProyectosIntegradores: false,
	redireccionAPagos: false,
	limiteOrdinaria: new Date(),
	limiteExtraordinaria: new Date(),
	limiteEspecial: new Date(),
	diasVencimientoMatricula: 0,
	capacidad: 0,
	mensaje: null,
	terminosCondiciones: null,
} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">;

describe("Crear nivel academico", () => {
	const _nivelMallaController = new NivelMallaController();

	it("Debe funcionar con una peticion normal", async () => {
		const res = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		console.log({ nivelMallaId, sesionId, paraleloId });

		expect(res.status).toBe(201);
	});

	it("Las materias del nivel academico y las asignaturas en el nivel de malla deben ser cantidades iguales", async () => {
		const [asignaturasEnNivelMalla, materiasEnNivelAcademico] =
			await Prisma.$transaction([
				Prisma.asignaturaEnNivelMalla.count(),
				Prisma.materiaEnNivelAcademico.count(),
			]);

		expect(asignaturasEnNivelMalla).toBe(materiasEnNivelAcademico);
	});

	it("Las materias del nivel academico deben tener valores iniciales dependiendo de su nivel academico", async () => {
		const materias = await Prisma.materiaEnNivelAcademico.findMany({
			include: {
				nivelAcademico: true,
			},
		});

		materias.forEach(m => {
			expect(m.modeloEvaluativoId).toStrictEqual(
				m.nivelAcademico.modeloEvaluativoId,
			);
			expect(m.fechaInicio).toStrictEqual(m.nivelAcademico.fechaInicio);
			expect(m.fechaFin).toStrictEqual(m.nivelAcademico.fechaFin);
		});
	});

	it("Las materias deben tener el alias bien compuesto", async () => {
		const materias = await Prisma.materiaEnNivelAcademico.findMany({
			include: {
				asignaturaEnNivelMalla: true,
				asignaturaModulo: true,
			},
		});

		materias.forEach(m => {
			expect(m.alias).toBe(
				`${sedeAlias}-${programaAlias}-${
					m.asignaturaEnNivelMalla ? "AM" : "MM"
				}-${
					m.asignaturaEnNivelMalla?.identificacion ||
					m.asignaturaModulo?.identificacion
				}-${m.numero}`,
			);
		});
	});

	it("Las materias del nivel academico deben tener campos iguales como valores iniciales a partir de las asignaturas en malla", async () => {
		const [asignaturasEnNivelMalla, materiasEnNivelAcademico] =
			await Prisma.$transaction([
				Prisma.asignaturaEnNivelMalla.findMany(),
				Prisma.materiaEnNivelAcademico.findMany(),
			]);

		materiasEnNivelAcademico.forEach(m => {
			asignaturasEnNivelMalla.forEach(a => {
				if (m.asignaturaEnNivelMallaId === a.id) {
					expect(m.validaParaCreditos).toBe(a.validaParaCredito);
					expect(m.validaParaPromedio).toBe(a.validaParaPromedio);
				}
			});
		});
	});

	it("No debe funcionar si los campos de estudiantes no tienen sentido", async () => {
		const res1 = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
						estudiantesPuedenSeleccionarMaterias: false,
						estudiantesPuedenSeleccionarMateriasOtrasModalidades: true,
						estudiantesPuedenSeleccionarMateriasOtrosHorarios: true,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res1.status).not.toBe(201);

		const res2 = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
						estudiantesPuedenSeleccionarMaterias: false,
						estudiantesPuedenSeleccionarMateriasOtrasModalidades: false,
						estudiantesPuedenSeleccionarMateriasOtrosHorarios: true,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res2.status).not.toBe(201);

		const res3 = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
						estudiantesPuedenSeleccionarMaterias: false,
						estudiantesPuedenSeleccionarMateriasOtrasModalidades: true,
						estudiantesPuedenSeleccionarMateriasOtrosHorarios: false,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res3.status).not.toBe(201);
	});

	it("No debe funcionar si hay duplicados con el mismo nivel de malla, paralelo y sesion", async () => {
		const res = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).not.toBe(201);
	});

	it("No debe crear si la malla del nivel no esta activada", async () => {
		await Prisma.mallaCurricular.update({
			where: {
				id: mallaId,
			},
			data: {
				estado: false,
			},
		});

		const res = await _nivelMallaController.nivelesMallaCreateNivelAcademico(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivelMallaId}/sesiones/${sesionId}`,
				method: "POST",
				params: {
					nivelMallaId,
					sesionId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						paraleloId,
						modeloEvaluativoId,
					} satisfies Omit<ICreateNivelAcademico, "nivelMallaId" | "sesionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).not.toBe(201);
	});
});

describe("Crear asignaturas en el nivel academico", () => {
	let asignaturasEnNivelMallaIds: string[] = [];
	let asignaturasModulosIds: string[] = [];

	beforeAll(async () => {
		const asignaturasNames = [
			"ADMINISTRACION BASICA II",
			"ADMINISTRACION EMPRESARIAL",
			"ADAPTACIÓN AL APORTE DEL CONOCIMIENTO",
		];
		const [, eje, area, , asignaturas, campoFormacion] =
			await Prisma.$transaction([
				Prisma.materiaEnNivelAcademico.deleteMany(),
				Prisma.ejeFormativo.findFirst(),
				Prisma.areaConocimiento.findFirst(),
				Prisma.asignatura.createMany({
					data: asignaturasNames.map(name => ({
						nombre: name,
					})),
				}),
				Prisma.asignatura.findMany({
					where: {
						OR: asignaturasNames.map(name => ({
							nombre: name,
						})),
					},
				}),
				Prisma.campoFormacion.create({
					data: {
						nombre: "BASICO",
					},
				}),
			]);

		await Prisma.asignaturaEnNivelMalla.createMany({
			data: asignaturas.map(a => ({
				ejeFormativoId: eje!.id,
				areaConocimientoId: area!.id,
				campoFormacionId: null,
				nivelMallaId,
				asignaturaId: a.id,

				tipoAsignatura: "TEORICA_PRACTICA",
				identificacion: "ADM BASI",
				permiteMatriculacion: true,
				calculoNivel: true,
				validaParaCredito: false,
				validaParaPromedio: false,
				costoEnMatricula: true,
				requeridaParaEgresar: true,
				cantidadMatriculas: 3,
				cantidadMatriculasAutorizadas: 3,
				minimoCreditosRequeridos: null,
				maximaCantidadHorasSemanalas: 0,
				horasColaborativas: 0,
				horasAsistidasDocente: 0,
				horasAutonomas: 0,
				horasPracticas: 0,
				sumaHoras: true,
				creditos: 0,
				horasProyectoIntegrador: 0,
				noValidaAsistencia: false,
				materiaComun: false,
				guiaPracticaMetodologiaObligatoria: false,
				aprobarGuiaPracticaMetodologica: false,
				descripcion: null,
				objetivoGeneral: null,
				resultadosAprendizaje: null,
				aporteAsignaturaAlPerfil: null,
				competenciaGenerica: null,
				objetivosEspecificos: null,
				observaciones: null,
			})),
		});

		await Prisma.asignaturaModuloEnMalla.createMany({
			data: asignaturas.map(a => ({
				areaConocimientoId: area!.id,
				campoFormacionId: campoFormacion.id,
				mallaId,
				materiaGeneral: true,
				requeridaParaGraduar: true,
				asignaturaId: a.id,

				tipoAsignatura: "TEORICA_PRACTICA",
				identificacion: "ADM BASI",
				permiteMatriculacion: true,
				validaParaCredito: false,
				validaParaPromedio: false,
				costoEnMatricula: true,
				cantidadMatriculas: 3,
				cantidadMatriculasAutorizadas: 3,
				minimoCreditosRequeridos: null,
				maximaCantidadHorasSemanalas: 0,
				horasColaborativas: 0,
				horasAsistidasDocente: 0,
				horasAutonomas: 0,
				horasPracticas: 0,
				sumaHoras: true,
				creditos: 0,
				noValidaAsistencia: false,
				guiaPracticaMetodologiaObligatoria: false,
				aprobarGuiaPracticaMetodologica: false,
				descripcion: null,
				objetivoGeneral: null,
				aporteAsignaturaAlPerfil: null,
				competencia: null,
				objetivosEspecificos: null,
			})),
		});

		const asignaturasEnNivel = await Prisma.asignaturaEnNivelMalla.findMany();
		const asignaturasModulos = await Prisma.asignaturaModuloEnMalla.findMany();

		asignaturasEnNivelMallaIds = asignaturasEnNivel.map(a => a.id);
		asignaturasModulosIds = asignaturasModulos.map(a => a.id);
	});

	const controller = new NivelAcademicoController();

	it("Debe funcionar con una peticion normal", async () => {
		const nivelAcademico = await Prisma.nivelAcademico.findFirst();

		const res = await controller.nivelesAcademicosCreateMaterias(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-academicos/${nivelAcademico?.id}/materias`,
				method: "POST",
				params: {
					nivelAcademicoId: nivelAcademico?.id || "",
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						asignaturasMalla: asignaturasEnNivelMallaIds,
						modeloEvaluativoId,
						modulosMalla: asignaturasModulosIds,
					} satisfies Omit<ICreateMateriaEnNivelAcademico, "nivelAcademicoId">),
				},
			}),
			new InvocationContext(),
		);

		console.log(res.jsonBody);

		expect(res.status).toBe(201);
	});

	it("No debe funcionar si la asignatura en nivel de malla ya existe en el nivel academico", async () => {
		const nivelAcademico = await Prisma.nivelAcademico.findFirst({
			select: {
				id: true,
				modeloEvaluativoId: true,
			},
		});

		const res = await controller.nivelesAcademicosCreateMaterias(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-academicos/${nivelAcademico?.id}/materias`,
				method: "POST",
				params: {
					nivelAcademicoId: nivelAcademico?.id || "",
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						modeloEvaluativoId: nivelAcademico?.modeloEvaluativoId || "",
						asignaturasMalla: asignaturasEnNivelMallaIds,
						modulosMalla: [],
					} satisfies Omit<ICreateMateriaEnNivelAcademico, "nivelAcademicoId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).not.toBe(201);

		const res2 = await controller.nivelesAcademicosCreateMaterias(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-academicos/${nivelAcademico?.id}/materias`,
				method: "POST",
				params: {
					nivelAcademicoId: nivelAcademico?.id || "",
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						modeloEvaluativoId: nivelAcademico?.modeloEvaluativoId || "",
						asignaturasMalla: [],
						modulosMalla: asignaturasModulosIds,
					} satisfies Omit<ICreateMateriaEnNivelAcademico, "nivelAcademicoId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res2.status).not.toBe(201);
	});

	// se repiten tests debido a que aun no estan implementados con la misma logica de creacion
	it("Las materias creadas deben corresponder a la cantidad total de creaciones", async () => {
		const materias = await Prisma.materiaEnNivelAcademico.count();

		expect(materias).toBe(
			asignaturasEnNivelMallaIds.length + asignaturasModulosIds.length,
		);
	});

	it("Las materias del nivel academico deben tener valores iniciales dependiendo de su nivel academico", async () => {
		const materias = await Prisma.materiaEnNivelAcademico.findMany({
			include: {
				nivelAcademico: true,
			},
		});

		materias.forEach(m => {
			expect(m.modeloEvaluativoId).toStrictEqual(
				m.nivelAcademico.modeloEvaluativoId,
			);
			expect(m.fechaInicio).toStrictEqual(m.nivelAcademico.fechaInicio);
			expect(m.fechaFin).toStrictEqual(m.nivelAcademico.fechaFin);
		});
	});

	it("Las materias deben tener el alias bien compuesto", async () => {
		const materias = await Prisma.materiaEnNivelAcademico.findMany({
			include: {
				asignaturaEnNivelMalla: true,
				asignaturaModulo: true,
			},
		});

		materias.forEach(m => {
			expect(m.alias).toBe(
				`${sedeAlias}-${programaAlias}-${
					m.asignaturaEnNivelMalla ? "AM" : "MM"
				}-${
					m.asignaturaEnNivelMalla?.identificacion ||
					m.asignaturaModulo?.identificacion
				}-${m.numero}`,
			);
		});
	});
});
