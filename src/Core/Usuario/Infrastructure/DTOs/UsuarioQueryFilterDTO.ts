import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUsuarioQueryFilter } from "../../Domain/IUsuarioQueryFilter";

const schema = z
	.object<ZodInferSchema<IUsuarioQueryFilter>>({
		cedula: z.string().optional(),
		pasaporte: z.string().optional(),
		nombres: z.string().toUpperCase().optional(),
		primerApellido: z.string().toUpperCase().optional(),
		segundoApellido: z.string().toUpperCase().optional(),
		nacionalidad: z.string().optional(),
		paisNacimiento: z.string().optional(),
		provinciaNacimiento: z.string().optional(),
		cantonNacimiento: z.string().optional(),
		parroquiaNacimiento: z.string().optional(),
		fechaNacimiento: z.date().optional(),
		sexo: z.enum(["HOMBRE", "MUJER"] as const).optional(),
		genero: z.enum(["FEMENINO", "MASCULINO"] as const).optional(),
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
			.optional(),
		tipoSangre: z.string().optional(),
		paisResidencia: z.string().optional(),
		callePrincipal: z.string().optional(),
		calleSecundaria: z.string().optional(),
		numeroDomicilio: z.string().optional(),
		provinciaDondeSufraga: z.string().optional(),
		telefonoMovil: z.string().optional(),
		telefonoFijo: z.string().optional(),
		correoElectronico: z.string().email().optional(),
		correoInstitucional: z.string().email().optional(),
		tipo: z
			.array(z.enum(["ALUMNO", "PROFESOR", "ADMINISTRATIVO"] as const))
			.or(z.enum(["ALUMNO", "PROFESOR", "ADMINISTRATIVO"] as const))
			.optional(),

		email: z.string().email().optional(),
		emailVerified: z.date().optional(),
		image: z.string().optional(),
		name: z.string().optional(),

		administrativo_estado: z.boolean({ coerce: true }).optional(),
		profesor_estado: z.boolean({ coerce: true }).optional(),
		alumno_estado: z
			.enum(["ACTIVO", "EGRESADO", "RETIRADO"] as const)
			.optional(),
		grupoId: z.string().uuid().optional(),
		sedeId: z.string().uuid().optional(),
		fullTextSearch: z.string().optional(),
	})
	.optional();

class UsuarioQueryFilterDTOError extends BaseDTOError<IUsuarioQueryFilter> {
	constructor(error: z.ZodError<IUsuarioQueryFilter>) {
		super(error);
		this.name = "UsuarioQueryFilterDTOError";
		this.message = "Filtros de usuario invalidos";
	}
}

export class UsuarioQueryFilterDTO extends BaseValidatorDTO<
	IUsuarioQueryFilter,
	UsuarioQueryFilterDTOError
> {
	constructor(input: unknown) {
		super(schema, UsuarioQueryFilterDTOError, input);
	}
}
