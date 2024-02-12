import type {
	Asignatura,
	AsignaturaEnVarianteCurso,
	PrismaClient,
} from "@prisma/client";
import * as crypto from "crypto";
import { StartupBuilder } from "../../Main/Inversify/Inversify.config";

import { AsignaturaEnVarianteCursoService } from "../../Core/AsignaturaEnVarianteCurso/Application/Service";
import type { IAsignaturaEnVarianteCursoRepository } from "../../Core/AsignaturaEnVarianteCurso/Domain/IAsignaturaEnVarianteCursoRepository";
import { TYPES } from "../../Main/Inversify/types";
import { prismaMock } from "../singleton";
import { MockAsignaturaEnVarianteCursoRepository } from "./__mocks__/AsignaturaEnVarianteCursoRepository";

beforeEach(() => {
	StartupBuilder.rebind<PrismaClient>(TYPES.PrismaClient).toConstantValue(
		prismaMock,
	);
});

describe("crear asignatura en variante curso", () => {
	StartupBuilder.rebind<IAsignaturaEnVarianteCursoRepository>(
		TYPES.AsignaturaEnVarianteCursoRepository,
	)
		.to(MockAsignaturaEnVarianteCursoRepository)
		.inSingletonScope();

	const service = StartupBuilder.resolve(AsignaturaEnVarianteCursoService);

	const baseAsignatura = {
		validaPromedio: true,
		validaCredito: true,
		horasAsistidasDocente: 20,
		horasAutonomas: 10,
		horasColaborativas: 15,
		horasPracticas: 5,
		sumaHoras: true,
		requeridoAprobar: true,
		creditos: 5,
	};

	const mock = {
		...baseAsignatura,
		asignatura: {
			id: "123",
		},
	};

	prismaMock.asignaturaEnVarianteCurso.create.mockResolvedValue(
		mock as unknown as AsignaturaEnVarianteCurso & {
			asignaturas: Asignatura[];
		},
	);

	const randomUuid = crypto.randomUUID();

	it("debe resolver si la asignatura no se califica", () => {
		const res1 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				asistenciaAprobar: 10,
				modeloEvaluativoId: null,
				cantidadDecimales: null,
				notaMaxima: null,
				notaMinima: null,
			},
		});

		expect(res1).resolves.not.toThrow();
	});

	it("debe resolver si la asignatura se califica sin modelo evaluativo", () => {
		const res2 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: 10,
				cantidadDecimales: 2,
				notaMaxima: 10,
				notaMinima: 5,
			},
		});

		expect(res2).resolves.not.toThrow();
	});

	it("debe resolver si la asignatura se califica con modelo evaluativo", () => {
		const res3 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: randomUuid,
				asistenciaAprobar: null,
				cantidadDecimales: null,
				notaMaxima: null,
				notaMinima: null,
			},
		});

		expect(res3).resolves.not.toThrow();
	});

	it("debe fallar por calificar con modelo evaluativo", () => {
		const res1 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: randomUuid,
				asistenciaAprobar: 10,
				cantidadDecimales: null,
				notaMaxima: null,
				notaMinima: null,
			},
		});

		expect(res1).rejects.toThrow();

		const res2 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: randomUuid,
				asistenciaAprobar: 10,
				cantidadDecimales: 2,
				notaMaxima: 10,
				notaMinima: 5,
			},
		});

		expect(res2).rejects.toThrow();

		const res3 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: randomUuid,
				asistenciaAprobar: null,
				cantidadDecimales: null,
				notaMaxima: 10,
				notaMinima: 5,
			},
		});

		expect(res3).rejects.toThrow();

		const res4 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: randomUuid,
				asistenciaAprobar: 5,
				cantidadDecimales: null,
				notaMaxima: null,
				notaMinima: null,
			},
		});

		expect(res4).rejects.toThrow();
	});

	it("debe fallar por notas equivocas", () => {
		const res1 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: 10,
				cantidadDecimales: 2,
				notaMaxima: 10,
				notaMinima: 15,
			},
		});

		expect(res1).rejects.toThrow();
	});

	it("debe fallar por calificar sin modelo evaluativo y no indicar todos los campos", () => {
		const res1 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: null,
				cantidadDecimales: 2,
				notaMaxima: 10,
				notaMinima: 5,
			},
		});

		expect(res1).rejects.toThrow();

		const res2 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: 10,
				cantidadDecimales: null,
				notaMaxima: 10,
				notaMinima: 5,
			},
		});

		expect(res2).rejects.toThrow();

		const res3 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: 10,
				cantidadDecimales: 2,
				notaMaxima: null,
				notaMinima: 5,
			},
		});
		expect(res3).rejects.toThrow();
		const res4 = service.createAsignaturaEnVarianteCurso({
			asignaturaId: randomUuid,
			varianteCursoId: randomUuid,
			data: {
				...baseAsignatura,
				modeloEvaluativoId: null,
				asistenciaAprobar: 10,
				cantidadDecimales: 2,
				notaMaxima: 10,
				notaMinima: null,
			},
		});
		expect(res4).rejects.toThrow();
	});
});
