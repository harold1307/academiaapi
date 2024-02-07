import { HttpRequest, InvocationContext } from "@azure/functions";
import type {
	AreaConocimiento,
	Asignatura,
	CampoFormacion,
	EjeFormativo,
	MallaCurricular,
	NivelMalla,
} from "@prisma/client";
import * as crypto from "crypto";

import type { ICreateAsignaturaEnNivelMalla } from "../../Core/AsignaturaEnNivelMalla/Domain/ICreateAsignaturaEnNivelMalla";
import { NivelMallaController } from "../../Core/NivelMalla/Application/Controller";
import { Prisma } from "../../Main/Prisma/PrismaClient";

let malla: MallaCurricular & { niveles: NivelMalla[] };
let ejeFormativo: EjeFormativo;
let asignatura: Asignatura;
let campoFormacion: CampoFormacion;
let areaConocimiento: AreaConocimiento;
let nivel: NivelMalla;

jest.setTimeout(5 * 60 * 1000);

beforeAll(async () => {
	// creando malla
	const mallaPromise = Prisma.mallaCurricular.create({
		data: {
			tipoDuracion: "SEMESTRES",
			codigo: null,
			fechaAprobacion: new Date().toISOString(),
			fechaLimiteVigencia: new Date("12-12-2025").toISOString(),
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
			niveles: {
				createMany: {
					data: Array(3)
						.fill(0)
						.map((_, i) => ({
							nivel: i + 1,
						})),
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
								create: {
									nombre: "PRINCIPAL",
									canton: "canton",
									codigo: "PR",
									pais: "Pais",
									provincia: "Provincia",
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
			modalidad: {
				create: {
					nombre: "PRESENCIAL",
				},
			},
		},
		include: {
			niveles: true,
		},
	});

	// creando eje formativo
	const ejeFormativoPromise = Prisma.ejeFormativo.create({
		data: {
			nombre: "BASICA",
		},
	});

	// creando asignatura
	const asignaturaPromise = Prisma.asignatura.create({
		data: {
			nombre: "ADMINISTRACION BASICA I",
			codigo: "ADMB1",
		},
	});

	// creando campo formacion
	const campoFormacionPromise = Prisma.campoFormacion.create({
		data: {
			nombre: "ADAPTACION E INNOVACION TECNOLOGICA",
		},
	});

	// creando area conocimiento
	const areaConocimientoPromise = Prisma.areaConocimiento.create({
		data: {
			nombre: "NEGOCIOS Y ADMINISTRACION",
		},
	});

	const [mallaRes, ejeRes, asignaturaRes, campoRes, areaRes] =
		await Prisma.$transaction([
			mallaPromise,
			ejeFormativoPromise,
			asignaturaPromise,
			campoFormacionPromise,
			areaConocimientoPromise,
		]);

	malla = mallaRes;
	ejeFormativo = ejeRes;
	asignatura = asignaturaRes;
	campoFormacion = campoRes;
	areaConocimiento = areaRes;
	nivel = mallaRes.niveles.at(0)!;
});

afterAll(async () => {
	const deleteAsignaturaNivelesMalla =
		Prisma.asignaturaEnNivelMalla.deleteMany();
	const deleteNivelesMalla = Prisma.nivelMalla.deleteMany();
	const deleteMallas = Prisma.mallaCurricular.deleteMany();
	const deleteModalidad = Prisma.modalidad.deleteMany();
	const deleteProgramas = Prisma.programa.deleteMany();
	const deleteDetalleNivelesTitulacion =
		Prisma.detalleNivelTitulacion.deleteMany();
	const deleteNivelesTitulacion = Prisma.nivelTitulacion.deleteMany();
	const deleteCoordinaciones = Prisma.coordinacion.deleteMany();
	const deleteSedes = Prisma.sede.deleteMany();
	const deleteEjeFormativo = Prisma.ejeFormativo.deleteMany();
	const deleteAsignatura = Prisma.asignatura.deleteMany();
	const deleteCampoFormacion = Prisma.campoFormacion.deleteMany();
	const deleteAreaConocimiento = Prisma.areaConocimiento.deleteMany();

	await Prisma.$transaction([
		deleteAsignaturaNivelesMalla,
		deleteNivelesMalla,
		deleteMallas,
		deleteModalidad,
		deleteProgramas,
		deleteDetalleNivelesTitulacion,
		deleteNivelesTitulacion,
		deleteCoordinaciones,
		deleteSedes,
		deleteEjeFormativo,
		deleteAsignatura,
		deleteCampoFormacion,
		deleteAreaConocimiento,
	]);

	await Prisma.$disconnect();
});

describe("Crear asignatura en nivel de malla", () => {
	const commonBody = {
		ejeFormativoId: ejeFormativo?.id || "",
		asignaturaId: asignatura?.id || "",
		areaConocimientoId: areaConocimiento?.id || "",
		campoFormacionId: campoFormacion?.id || "",
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
	} satisfies Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">;

	beforeEach(() => {
		commonBody.ejeFormativoId = ejeFormativo.id;
		commonBody.asignaturaId = asignatura.id;
		commonBody.areaConocimientoId = areaConocimiento.id;
		commonBody.campoFormacionId = campoFormacion.id;
		nivel = malla.niveles.at(0)!;
	});

	const _nivelesController = new NivelMallaController();

	it("Debe crear con valores completos", async () => {
		const res = await _nivelesController.nivelesMallaCreateAsignatura(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivel.id}/asignaturas`,
				method: "POST",
				params: {
					nivelMallaId: nivel.id,
					asignaturaId: commonBody.asignaturaId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
					} satisfies Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	it("No debe crear sin asignatura o nivel", async () => {
		const res = await _nivelesController.nivelesMallaCreateAsignatura(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/null/asignaturas`,
				method: "POST",
				params: {
					nivelMallaId: "null",
					asignaturaId: commonBody.asignaturaId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						asignaturaId: crypto.randomUUID(),
					} satisfies Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).not.toBe(201);
	});

	it("Debe crear sin campo de formacion", async () => {
		const res = await _nivelesController.nivelesMallaCreateAsignatura(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivel.id}/asignaturas`,
				method: "POST",
				params: {
					nivelMallaId: nivel.id,
					asignaturaId: commonBody.asignaturaId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						campoFormacionId: null,
					} satisfies Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	it("No debe crear si no se respeta coherencia de campos de practica metodologica", async () => {
		const res = await _nivelesController.nivelesMallaCreateAsignatura(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-malla/${nivel.id}/asignaturas`,
				method: "POST",
				params: {
					nivelMallaId: nivel.id,
					asignaturaId: commonBody.asignaturaId,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						...commonBody,
						guiaPracticaMetodologiaObligatoria: false,
						aprobarGuiaPracticaMetodologica: true,
					} satisfies Omit<ICreateAsignaturaEnNivelMalla, "nivelMallaId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).not.toBe(201);
	});
});
