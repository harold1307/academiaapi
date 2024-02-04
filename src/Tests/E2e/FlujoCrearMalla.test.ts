import { HttpRequest, InvocationContext } from "@azure/functions";

import { CoordinacionController } from "../../Core/Coordinacion/Application/Controller";
import type { ICoordinacion } from "../../Core/Coordinacion/Domain/ICoordinacion";
import type { ICreateCoordinacion } from "../../Core/Coordinacion/Domain/ICreateCoordinacion";
import { DetalleNivelTitulacionController } from "../../Core/DetalleNivelTitulacion/Application/Controller";
import type { ICreateDetalleNivelTitulacion } from "../../Core/DetalleNivelTitulacion/Domain/ICreateDetalleNivelTitulacion";
import type { IDetalleNivelTitulacion } from "../../Core/DetalleNivelTitulacion/Domain/IDetalleNivelTitulacion";
import { MallaCurricularController } from "../../Core/MallaCurricular/Application/Controller";
import type { ICreateMallaCurricular } from "../../Core/MallaCurricular/Domain/ICreateMallaCurricular";
import type { IMallaCurricular } from "../../Core/MallaCurricular/Domain/IMallaCurricular";
import { ModalidadController } from "../../Core/Modalidad/Application/Controller";
import type { ICreateModalidad } from "../../Core/Modalidad/Domain/ICreateModalidad";
import type { IModalidad } from "../../Core/Modalidad/Domain/IModalidad";
import { NivelTitulacionController } from "../../Core/NivelTitulacion/Application/Controller";
import type { ICreateNivelTitulacion } from "../../Core/NivelTitulacion/Domain/ICreateNivelTitulacion";
import type { INivelTitulacion } from "../../Core/NivelTitulacion/Domain/INivelTitulacion";
import type { ICreatePracticaComunitariaEnMalla } from "../../Core/PracticaComunitariaEnMalla/Domain/ICreatePracticaComunitariaEnMalla";
import type { ICreatePracticaPreProfesionalEnMalla } from "../../Core/PracticaPreProfesionalEnMalla/Domain/ICreatePracticaPreProfesionalEnMalla";
import { ProgramaController } from "../../Core/Programa/Application/Controller";
import type { ICreatePrograma } from "../../Core/Programa/Domain/ICreatePrograma";
import type { IPrograma } from "../../Core/Programa/Domain/IPrograma";
import { SedeController } from "../../Core/Sede/Application/Controller";
import type { ICreateSede } from "../../Core/Sede/Domain/ICreateSede";
import type { ISede } from "../../Core/Sede/Domain/ISede";
import { TituloObtenidoController } from "../../Core/TituloObtenido/Application/Controller";
import type { ICreateTituloObtenido } from "../../Core/TituloObtenido/Domain/ICreateTituloObtenido";
import type { ITituloObtenido } from "../../Core/TituloObtenido/Domain/ITituloObtenido";
import { Prisma } from "../../Main/Prisma/PrismaClient";

afterAll(async () => {
	const deleteMalla = Prisma.mallaCurricular.deleteMany();
	const deleteTitulosObtenidos = Prisma.tituloObtenido.deleteMany();
	const deleteModalidad = Prisma.modalidad.deleteMany();
	const deleteProgramas = Prisma.programa.deleteMany();
	const deleteDetalleNivelesTitulacion =
		Prisma.detalleNivelTitulacion.deleteMany();
	const deleteNivelesTitulacion = Prisma.nivelTitulacion.deleteMany();
	const deleteCoordinaciones = Prisma.coordinacion.deleteMany();
	const deleteSedes = Prisma.sede.deleteMany();

	await Prisma.$transaction([
		deleteMalla,
		deleteTitulosObtenidos,
		deleteModalidad,
		deleteProgramas,
		deleteDetalleNivelesTitulacion,
		deleteNivelesTitulacion,
		deleteCoordinaciones,
		deleteSedes,
	]);

	await Prisma.$disconnect();
});

describe("Flujo de creacion de mallas", () => {
	const sedeController = new SedeController();
	const coordinacionController = new CoordinacionController();
	const nivelTitulacionController = new NivelTitulacionController();
	const detalleNivelTitulacionController =
		new DetalleNivelTitulacionController();
	const programasController = new ProgramaController();
	const modalidadController = new ModalidadController();
	const mallaController = new MallaCurricularController();
	const tituloObtenidoController = new TituloObtenidoController();

	test("Crear sede", async () => {
		const res = await sedeController.sedesCreate(
			new HttpRequest({
				url: "http://localhost:42069/api/sedes",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "PRINCIPAL",
						provincia: "TUNGURAHUA",
						canton: "AMBATO",
						pais: "ECUADOR",
						codigo: "MT",
					} satisfies ICreateSede),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear coodinacion", async () => {
		const sedeRes = await sedeController.sedesGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/sedes",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(sedeRes.status).toBe(200);

		const sedeResBody = sedeRes.jsonBody as {
			data: ISede[];
			message: string;
		};

		expect(sedeResBody.data).toBeDefined();
		expect(sedeResBody.data).toBeInstanceOf(Array);
		expect(sedeResBody.data.length).toBe(1);

		const sede = sedeResBody.data.find(s => s.nombre === "PRINCIPAL");

		expect(sede).toBeDefined();

		if (!sede) throw new Error("Sede no encontrada");

		expect(sede.nombre).toBe("PRINCIPAL");
		expect(sede.enUso).toBe(false);

		const createCoordinacionRes = await sedeController.sedesCreateCoordinacion(
			new HttpRequest({
				url: `http://localhost:42069/api/sedes/${sede.id}/coordinaciones`,
				method: "POST",
				params: {
					sedeId: sede.id,
				},
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "COORDINACION ACADEMICA",
						alias: "COA",
					} satisfies Omit<ICreateCoordinacion, "sedeId">),
				},
			}),
			new InvocationContext(),
		);

		expect(createCoordinacionRes.status).toBe(201);
	});

	test("Crear nivel de titulacion", async () => {
		const res = await nivelTitulacionController.nivelesTitulacionCreate(
			new HttpRequest({
				url: "http://localhost:42069/api/niveles-titulacion",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "TECNOLOGO",
					} satisfies ICreateNivelTitulacion),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear detalle de nivel de titulacion", async () => {
		const nivelesRes = await nivelTitulacionController.nivelesTitulacionGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/niveles-titulacion",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(nivelesRes.status).toBe(200);

		const nivelesResBody = nivelesRes.jsonBody as {
			data: INivelTitulacion[];
			message: string;
		};

		expect(nivelesResBody.data).toBeDefined();
		expect(nivelesResBody.data).toBeInstanceOf(Array);
		expect(nivelesResBody.data.length).toBe(1);

		const nivel = nivelesResBody.data.find(n => n.nombre === "TECNOLOGO");

		expect(nivel).toBeDefined();

		const res = await nivelTitulacionController.nivelesTitulacionCreateDetalle(
			new HttpRequest({
				url: `http://localhost:42069/api/niveles-titulacion/${nivel?.id}/detalles`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "NIVEL TECNOLOGO",
					} satisfies Omit<ICreateDetalleNivelTitulacion, "nivelTitulacionId">),
				},
				params: {
					nivelTitulacionId: nivel?.id || "",
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear programa", async () => {
		const detalleNivelRes =
			await detalleNivelTitulacionController.detallesNivelTitulacionGetAll(
				new HttpRequest({
					url: "http://localhost:42069/api/detalles-nivel-titulacion",
					method: "GET",
				}),
				new InvocationContext(),
			);

		expect(detalleNivelRes.status).toBe(200);

		const detalleNivelResBody = detalleNivelRes.jsonBody as {
			data: IDetalleNivelTitulacion[];
			message: string;
		};

		expect(detalleNivelResBody.data).toBeDefined();
		expect(detalleNivelResBody.data).toBeInstanceOf(Array);
		expect(detalleNivelResBody.data.length).toBe(1);

		const detalleNivel = detalleNivelResBody.data.find(
			d => d.nombre === "NIVEL TECNOLOGO",
		);

		expect(detalleNivel).toBeDefined();

		expect(detalleNivel?.nombre).toBe("NIVEL TECNOLOGO");
		expect(detalleNivel?.enUso).toBe(false);

		const coordinacionRes = await coordinacionController.coordinacionesGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/coordinaciones",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(coordinacionRes.status).toBe(200);

		const coordinacionResBody = coordinacionRes.jsonBody as {
			data: ICoordinacion[];
			message: string;
		};

		expect(coordinacionResBody.data).toBeDefined();
		expect(coordinacionResBody.data).toBeInstanceOf(Array);
		expect(coordinacionResBody.data.length).toBe(1);

		const coordinacion = coordinacionResBody.data.find(
			c => c.nombre === "COORDINACION ACADEMICA",
		);

		expect(coordinacion).toBeDefined();

		expect(coordinacion?.nombre).toBe("COORDINACION ACADEMICA");
		expect(coordinacion?.enUso).toBe(false);

		const res = await coordinacionController.coordinacionesCreatePrograma(
			new HttpRequest({
				url: `http://localhost:42069/api/coordinaciones/${coordinacion?.id}/programas`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					coordinacionId: coordinacion?.id || "",
				},
				body: {
					string: JSON.stringify({
						nombre: "ADMINISTRACION",
						alias: "ADM",
						mencion: null,
						detalleNivelTitulacionId: detalleNivel?.id || "",
					} satisfies Omit<ICreatePrograma, "coordinacionId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear modalidad", async () => {
		const res = await modalidadController.modalidadesCreate(
			new HttpRequest({
				url: "http://localhost:42069/api/modalidades",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "EN LINEA",
						alias: "EL",
					} satisfies ICreateModalidad),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear titulo obtenido", async () => {
		const programaRes = await programasController.programasGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/programas",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(programaRes.status).toBe(200);

		const programaResBody = programaRes.jsonBody as {
			data: IPrograma[];
			message: string;
		};

		expect(programaResBody.data).toBeDefined();
		expect(programaResBody.data).toBeInstanceOf(Array);
		expect(programaResBody.data.length).toBe(1);

		const programa = programaResBody.data.find(
			p => p.nombre === "ADMINISTRACION",
		);

		expect(programa).toBeDefined();
		expect(programa?.nombre).toBe("ADMINISTRACION");

		const res = await programasController.programasCreateTituloObtenido(
			new HttpRequest({
				url: `http://localhost:42069/api/programas/${programa?.id}`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					programaId: programa?.id || "",
				},
				body: {
					string: JSON.stringify({
						nombre: "TECNÓLOGO SUPERIOR EN ADMINISTRACIÓN",
					} satisfies Omit<ICreateTituloObtenido, "programaId">),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Crear malla", async () => {
		const programaRes = await programasController.programasGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/programas",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(programaRes.status).toBe(200);

		const programaResBody = programaRes.jsonBody as {
			data: IPrograma[];
			message: string;
		};

		expect(programaResBody.data).toBeDefined();
		expect(programaResBody.data).toBeInstanceOf(Array);
		expect(programaResBody.data.length).toBe(1);

		const programa = programaResBody.data.find(
			p => p.nombre === "ADMINISTRACION",
		);

		expect(programa).toBeDefined();

		const modalidadRes = await modalidadController.modalidadesGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/modalidades",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(modalidadRes.status).toBe(200);

		const modalidadResBody = modalidadRes.jsonBody as {
			data: IModalidad[];
			message: string;
		};

		expect(modalidadResBody.data).toBeDefined();
		expect(modalidadResBody.data).toBeInstanceOf(Array);
		expect(modalidadResBody.data.length).toBe(1);

		const modalidad = modalidadResBody.data.find(m => m.nombre === "EN LINEA");

		expect(modalidad).toBeDefined();
		expect(modalidad?.nombre).toBe("EN LINEA");

		const tituloObtenidoRes =
			await tituloObtenidoController.titulosObtenidosGetAll(
				new HttpRequest({
					url: "http://localhost:42069/api/titulos-obtenidos",
					method: "GET",
				}),
				new InvocationContext(),
			);

		expect(tituloObtenidoRes.status).toBe(200);

		const tituloObtenidoResBody = tituloObtenidoRes.jsonBody as {
			data: ITituloObtenido[];
			message: string;
		};

		expect(tituloObtenidoResBody.data).toBeDefined();
		expect(tituloObtenidoResBody.data).toBeInstanceOf(Array);
		expect(tituloObtenidoResBody.data.length).toBe(1);

		const tituloObtenido = tituloObtenidoResBody.data.find(
			t => t.nombre === "TECNÓLOGO SUPERIOR EN ADMINISTRACIÓN",
		);

		expect(tituloObtenido).toBeDefined();
		expect(tituloObtenido?.nombre).toBe("TECNÓLOGO SUPERIOR EN ADMINISTRACIÓN");

		const res = await programasController.programasCreateMalla(
			new HttpRequest({
				url: `http://localhost:42069/api/programas/${programa?.id}`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					programaId: programa?.id || "",
				},
				body: {
					string: JSON.stringify({
						modalidadId: modalidad?.id || "",
						tipoDuracion: "SEMESTRES",
						tituloObtenidoId: tituloObtenido?.id || "",
						codigo: null,
						fechaAprobacion: new Date().toISOString(),
						fechaLimiteVigencia: new Date("12-12-2025").toISOString(),
						niveles: 5,
						cantidadOtrasMateriasMatricula: 2,
						limiteSeleccionMateriaPorAdministrativo: true,
						cantidadArrastres: 2,
						porcentajeMinimoPasarNivel: null,
						practicasPreProfesionales: {
							requiereAutorizacion: false,
							horas: 240,
							creditos: 0,
							registroDesdeNivel: 3,
							registroPracticasAdelantadas: false,
						},
						practicasComunitarias: {
							requiereAutorizacion: false,
							horas: 160,
							creditos: 0,
							registroDesdeNivel: 2,
							registroPracticasAdelantadas: false,
							registroMultiple: true,
						},
						maximoMateriasAdelantar: null,
						automatriculaModulos: true,
						plantillasSilabo: false,
						modeloPlanificacion: true,
						perfilEgreso: null,
						observaciones: null,
					} satisfies Omit<
						ICreateMallaCurricular,
						"fechaAprobacion" | "fechaLimiteVigencia" | "programaId"
					> & {
						fechaAprobacion: string;
						fechaLimiteVigencia: string;
						practicasPreProfesionales:
							| (Omit<
									ICreatePracticaPreProfesionalEnMalla,
									"mallaCurricularId"
							  > & {
									registroDesdeNivel: number | null;
							  })
							| null;
						practicasComunitarias:
							| (Omit<
									ICreatePracticaComunitariaEnMalla,
									"mallaCurricularId"
							  > & {
									registroDesdeNivel: number | null;
							  })
							| null;
					}),
				},
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(201);
	});

	test("Comprobar existencia de malla", async () => {
		const res = await mallaController.mallasCurricularesGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/mallas-curriculares",
				method: "GET",
			}),
			new InvocationContext(),
		);

		expect(res.status).toBe(200);

		const resBody = res.jsonBody as {
			data: IMallaCurricular[];
			message: string;
		};

		expect(resBody.data).toBeDefined();
		expect(resBody.data).toBeInstanceOf(Array);
		expect(resBody.data.length).toBe(1);

		const malla = resBody.data.at(0);

		expect(malla).toBeDefined();

		expect(malla?.practicaComunitaria).not.toBeUndefined();
		expect(malla?.practicaComunitaria).not.toBeNull();
		expect(
			malla?.practicaComunitaria?.registroDesdeNivelId,
		).not.toBeUndefined();
		expect(malla?.practicaComunitaria?.registroDesdeNivelId).not.toBeNull();
		expect(malla?.practicaComunitaria?.mallaCurricularId).toBe(malla?.id);

		expect(malla?.practicaPreProfesional).not.toBeUndefined();
		expect(malla?.practicaPreProfesional).not.toBeNull();
		expect(
			malla?.practicaPreProfesional?.registroDesdeNivelId,
		).not.toBeUndefined();
		expect(malla?.practicaPreProfesional?.registroDesdeNivelId).not.toBeNull();
		expect(malla?.practicaPreProfesional?.mallaCurricularId).toBe(malla?.id);

		expect(malla?.tituloObtenido?.id).not.toBeUndefined();
		expect(malla?.tituloObtenido?.id).not.toBeNull();

		expect(malla?.niveles).toBeInstanceOf(Array);
		expect(malla?.niveles.length).toBe(5);
	});
});
