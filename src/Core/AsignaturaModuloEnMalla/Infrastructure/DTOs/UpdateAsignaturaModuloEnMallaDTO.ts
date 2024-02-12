import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAsignaturaModuloEnMalla } from "../../Domain/IUpdateAsignaturaModuloEnMalla";

const schema = z.object<ZodInferSchema<IUpdateAsignaturaModuloEnMalla>>({
	tipoAsignatura: z
		.enum(["PRACTICA", "TEORICA", "TEORICA_PRACTICA"] as const)
		.optional(),
	identificacion: z.string().optional(),
	permiteMatriculacion: z.boolean().optional(),
	validaParaCredito: z.boolean().optional(),
	validaParaPromedio: z.boolean().optional(),
	costoEnMatricula: z.boolean().optional(),
	requeridaParaGraduar: z.boolean().optional(),
	cantidadMatriculas: z.number().optional(),

	cantidadMatriculasAutorizadas: z.number().nullable().optional(),

	minimoCreditosRequeridos: z.number().nullable().optional(),
	maximaCantidadHorasSemanalas: z.number().optional(),
	horasColaborativas: z.number().optional(),
	horasAsistidasDocente: z.number().optional(),
	horasAutonomas: z.number().optional(),
	horasPracticas: z.number().optional(),
	sumaHoras: z.boolean().optional(),
	creditos: z.number().optional(),
	noValidaAsistencia: z.boolean().optional(),
	materiaGeneral: z.boolean().optional(),
	guiaPracticaMetodologiaObligatoria: z.boolean().optional(),
	aprobarGuiaPracticaMetodologica: z.boolean().optional(),

	competencia: z.string().nullable().optional(),

	objetivosEspecificos: z.string().nullable().optional(),

	descripcion: z.string().nullable().optional(),

	resultados: z.string().nullable().optional(),

	aporteAsignaturaAlPerfil: z.string().nullable().optional(),

	objetivoGeneral: z.string().nullable().optional(),

	areaConocimientoId: z.string().uuid().optional(),
	campoFormacionId: z.string().uuid().optional(),
});

class UpdateAsignaturaModuloEnMallaDTOError extends BaseDTOError<IUpdateAsignaturaModuloEnMalla> {
	constructor(error: z.ZodError<IUpdateAsignaturaModuloEnMalla>) {
		super(error);
		this.name = "UpdateAsignaturaModuloEnMallaDTOError";
		this.message =
			"Error de validacion para actualizar el AsignaturaModuloEnMalla";
	}
}

export class UpdateAsignaturaModuloEnMallaDTO extends BaseValidatorDTO<
	IUpdateAsignaturaModuloEnMalla,
	UpdateAsignaturaModuloEnMallaDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAsignaturaModuloEnMallaDTOError, input);
	}
}
