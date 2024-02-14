import type { PrismaClient } from "@prisma/client";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { PeriodoLectivoService } from "../../Core/PeriodoLectivo/Application/Service";
import type { IPeriodoLectivoRepository } from "../../Core/PeriodoLectivo/Domain/IPeriodoLectivoRepository";
import { TYPES } from "../../Main/Inversify/types";
import { prismaMock } from "../singleton";
import { MockPeriodoLectivoRepository } from "./__mocks__/MockPeriodoLectivoRepository";

beforeAll(() => {
	StartupBuilder.rebind<PrismaClient>(TYPES.PrismaClient).toConstantValue(
		prismaMock,
	);
	StartupBuilder.rebind<IPeriodoLectivoRepository>(
		TYPES.PeriodoLectivoRepository,
	)
		.to(MockPeriodoLectivoRepository)
		.inSingletonScope();
});

describe("crear periodo lectivo", () => {
	StartupBuilder.rebind<IPeriodoLectivoRepository>(
		TYPES.PeriodoLectivoRepository,
	)
		.to(MockPeriodoLectivoRepository)
		.inSingletonScope();
	const service = StartupBuilder.resolve(PeriodoLectivoService);

	const minimalData = {
		nombre: "ABRIL - AGOSTO 2024",
		tipo: "GRADO",
		inicio: new Date("2024-04-01"),
		fin: new Date("2024-08-31"),

		limiteMatriculaOrdinaria: null,
		limiteMatriculaExtraordinaria: null,
		limiteMatriculaEspecial: null,
		automatriculaAlumnosFechaExtraordinaria: null,

		estudianteSeleccionaParaleloAutomatricula: null,
		seImpartioNivelacion: true,
		planificacionCargaHoraria: true,

		planificacionProfesoresFormaTotal: null,
		aprobacionPlanificacionProfesores: null,

		legalizacionAutomaticaContraPagos: null,
		numeroSecuencia: null,
		corteId: null,

		cronogramaNotasCoordinacion: true,
		puedenAutomatricularseSegundasOMasMatriculas: true,
		puedenMatricularseArrastre: true,

		numeroMatriculaAutomatico: null,
		numeroMatricularAlLegalizar: null,
	} as const;

	it("debe crear con valores minimos", () => {
		const periodo = service.createPeriodoLectivo(minimalData);

		expect(periodo).resolves.toBeDefined();
	});

	it("debe crear con fechas en matriculas", () => {
		const periodo = service.createPeriodoLectivo({
			...minimalData,
			limiteMatriculaOrdinaria: new Date(),
			limiteMatriculaExtraordinaria: new Date(),
			limiteMatriculaEspecial: new Date(),
			automatriculaAlumnosFechaExtraordinaria: true,
		});

		expect(periodo).resolves.toBeDefined();
	});

	it("debe crear cuando la planificacion de profesores es obligatoria", () => {
		const periodo = service.createPeriodoLectivo({
			...minimalData,
			planificacionProfesoresFormaTotal: true,
			aprobacionPlanificacionProfesores: true,
		});

		expect(periodo).resolves.toBeDefined();

		const periodo2 = service.createPeriodoLectivo({
			...minimalData,
			planificacionProfesoresFormaTotal: false,
			aprobacionPlanificacionProfesores: true,
		});

		expect(periodo2).resolves.toBeDefined();

		const periodo3 = service.createPeriodoLectivo({
			...minimalData,
			planificacionProfesoresFormaTotal: true,
			aprobacionPlanificacionProfesores: false,
		});

		expect(periodo3).resolves.toBeDefined();

		const periodo4 = service.createPeriodoLectivo({
			...minimalData,
			planificacionProfesoresFormaTotal: true,
			aprobacionPlanificacionProfesores: false,
		});

		expect(periodo4).resolves.toBeDefined();
	});

	it("debe crear cuando se quiere numero de matricula", () => {
		const periodo = service.createPeriodoLectivo({
			...minimalData,
			numeroMatriculaAutomatico: true,
			numeroMatricularAlLegalizar: true,
		});

		expect(periodo).resolves.toBeDefined();

		const periodo2 = service.createPeriodoLectivo({
			...minimalData,
			numeroMatriculaAutomatico: false,
			numeroMatricularAlLegalizar: true,
		});

		expect(periodo2).resolves.toBeDefined();

		const periodo3 = service.createPeriodoLectivo({
			...minimalData,
			numeroMatriculaAutomatico: true,
			numeroMatricularAlLegalizar: false,
		});

		expect(periodo3).resolves.toBeDefined();

		const periodo4 = service.createPeriodoLectivo({
			...minimalData,
			numeroMatriculaAutomatico: false,
			numeroMatricularAlLegalizar: false,
		});

		expect(periodo4).resolves.toBeDefined();
	});

	it("no debe crear con campos de fechas en matriculas incompletas", () => {
		const periodo = () =>
			service.createPeriodoLectivo({
				...minimalData,
				limiteMatriculaOrdinaria: null,
				limiteMatriculaExtraordinaria: new Date(),
				limiteMatriculaEspecial: new Date(),
				automatriculaAlumnosFechaExtraordinaria: false,
			});

		expect(periodo).toThrow();

		const periodo2 = () =>
			service.createPeriodoLectivo({
				...minimalData,
				limiteMatriculaOrdinaria: new Date(),
				limiteMatriculaExtraordinaria: null,
				limiteMatriculaEspecial: new Date(),
				automatriculaAlumnosFechaExtraordinaria: true,
			});

		expect(periodo2).toThrow();

		const periodo3 = () =>
			service.createPeriodoLectivo({
				...minimalData,
				limiteMatriculaOrdinaria: new Date(),
				limiteMatriculaExtraordinaria: new Date(),
				limiteMatriculaEspecial: null,
				automatriculaAlumnosFechaExtraordinaria: true,
			});

		expect(periodo3).toThrow();

		const periodo4 = () =>
			service.createPeriodoLectivo({
				...minimalData,
				limiteMatriculaOrdinaria: new Date(),
				limiteMatriculaExtraordinaria: new Date(),
				limiteMatriculaEspecial: new Date(),
				automatriculaAlumnosFechaExtraordinaria: null,
			});

		expect(periodo4).toThrow();
	});

	it("no debe crear con campos de planificacion de profesores obligatoria incompletos", () => {
		const periodo = () =>
			service.createPeriodoLectivo({
				...minimalData,
				planificacionProfesoresFormaTotal: true,
				aprobacionPlanificacionProfesores: null,
			});

		expect(periodo).toThrow();

		const periodo2 = () =>
			service.createPeriodoLectivo({
				...minimalData,
				planificacionProfesoresFormaTotal: false,
				aprobacionPlanificacionProfesores: null,
			});

		expect(periodo2).toThrow();
	});

	it("no debe crear con campos de numero de matricula incompletos", () => {
		const periodo = () =>
			service.createPeriodoLectivo({
				...minimalData,
				numeroMatriculaAutomatico: true,
				numeroMatricularAlLegalizar: null,
			});

		expect(periodo).toThrow();

		const periodo2 = () =>
			service.createPeriodoLectivo({
				...minimalData,
				numeroMatriculaAutomatico: null,
				numeroMatricularAlLegalizar: false,
			});

		expect(periodo2).toThrow();
	});
});
