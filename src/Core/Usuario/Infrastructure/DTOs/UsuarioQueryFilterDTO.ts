import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUsuarioQueryFilter } from "../../Domain/IUsuarioQueryFilter";

const schema = z
	.object<ZodInferSchema<IUsuarioQueryFilter>>({
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
		tipo: z
			.array(z.enum(["ALUMNO", "PROFESOR", "ADMINISTRATIVO"] as const))
			.or(z.enum(["ALUMNO", "PROFESOR", "ADMINISTRATIVO"] as const))
			.optional(),

		email: z.string().email().nullable().optional(),
		emailVerified: z.date().nullable().optional(),
		image: z.string().nullable().optional(),
		name: z.string().nullable().optional(),

		administrativo_estado: z.boolean().optional(),
		profesor_estado: z.boolean().optional(),
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
