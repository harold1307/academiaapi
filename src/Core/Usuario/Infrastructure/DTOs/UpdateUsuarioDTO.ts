import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateUsuario } from "../../Domain/IUpdateUsuario";

const schema = z
	.object<ZodInferSchema<IUpdateUsuario>>({
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
	})
	.superRefine(({ correoInstitucional }, ctx) => {
		if (correoInstitucional) {
			const domain = correoInstitucional.split("@")[1];

			if (domain !== "iste.edu.ec") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"El correo institucional es incorrecto, debe ser de la universidad ISTE",
					path: ["correoInstitucional"],
				});
			}
		}
	});

class UpdateUsuarioDTOError extends BaseDTOError<IUpdateUsuario> {
	constructor(error: z.ZodError<IUpdateUsuario>) {
		super(error);
		this.name = "UpdateUsuarioDTOError";
		this.message = "Error de validacion para actualizar el usuario";
	}
}

export class UpdateUsuarioDTO extends BaseValidatorDTO<
	IUpdateUsuario,
	UpdateUsuarioDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateUsuarioDTOError, input);
	}
}
