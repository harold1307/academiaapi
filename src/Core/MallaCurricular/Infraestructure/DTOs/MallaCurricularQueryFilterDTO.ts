import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IMallaCurricularQueryFilter } from "../../Domain/IMallaCurricularQueryFilter";

const schema = z
	.object<ZodInferSchema<IMallaCurricularQueryFilter>>({
		estado: z.boolean({ coerce: true }).optional(),

		tipoDuracion: z
			.enum(["ANOS", "CREDITOS", "HORAS", "SEMESTRES"] as const)
			.optional(),

		codigo: z.string().optional(),
		limiteSeleccionMateriaPorAdministrativo: z
			.boolean({ coerce: true })
			.optional(),

		cantidadArrastres: z.number({ coerce: true }).optional(),
		modalidadId: z.string().optional(),
		programaId: z.string().optional(),

		porcentajeMinimoPasarNivel: z.number({ coerce: true }).optional(),

		maximoMateriasAdelantar: z.number({ coerce: true }).optional(),
		automatriculaModulos: z.boolean({ coerce: true }).optional(),
		plantillasSilabo: z.boolean({ coerce: true }).optional(),
		modeloPlanificacion: z.boolean({ coerce: true }).optional(),

		perfilEgreso: z.string().optional(),

		observaciones: z.string().optional(),

		tituloObtenidoId: z.string().uuid().optional(),

		practicaComunitariaRequiereAutorizacion: z
			.boolean({ coerce: true })
			.optional(),
		practicaComunitariaHoras: z.number().optional(),
		practicaComunitariaCreditos: z.number().optional(),
		practicaComunitariaRegistroDesdeNivel: z
			.number()
			.int()

			.optional(),
		practicaComunitariaRegistroPracticasAdelantadas: z
			.boolean()

			.optional(),
		practicaComunitariaRegistroMultiple: z.boolean({ coerce: true }).optional(),

		practicaPreProfesionalRequiereAutorizacion: z
			.boolean()

			.optional(),
		practicaPreProfesionalHoras: z.number().optional(),
		practicaPreProfesionalCreditos: z.number().optional(),
		practicaPreProfesionalRegistroDesdeNivel: z
			.number()
			.int()

			.optional(),
		practicaPreProfesionalRegistroPracticasAdelantadas: z
			.boolean()

			.optional(),
	})
	.optional();

class MallaCurricularQueryFilterDTOError extends BaseDTOError<IMallaCurricularQueryFilter> {
	constructor(error: z.ZodError<IMallaCurricularQueryFilter>) {
		super(error);
		this.name = "MallaCurricularQueryFilterDTOError";
		this.message = "Filtros de malla curricular invalidos";
	}
}

export class MallaCurricularQueryFilterDTO extends BaseValidatorDTO<
	IMallaCurricularQueryFilter,
	MallaCurricularQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, MallaCurricularQueryFilterDTOError, input);
	}
}
