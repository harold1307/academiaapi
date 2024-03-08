import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateUsuario } from "../../Domain/ICreateUsuario";

const schema = z
	.object<ZodInferSchema<ICreateUsuario>>({
		tipo: z.enum(["ADMINISTRATIVO", "PROFESOR", "ALUMNO"] as const),
		cedula: z.string().nullable(),
		pasaporte: z.string().nullable(),
		nombres: z.string().toUpperCase().trim(),
		primerApellido: z.string().toUpperCase().trim(),
		segundoApellido: z.string().toUpperCase().trim().nullable(),
		nacionalidad: z.string().nullable(),
		paisNacimiento: z.string().nullable(),
		provinciaNacimiento: z.string().nullable(),
		cantonNacimiento: z.string().nullable(),
		parroquiaNacimiento: z.string().nullable(),
		fechaNacimiento: z.date(),
		sexo: z.enum(["HOMBRE", "MUJER"] as const),
		genero: z.enum(["FEMENINO", "MASCULINO"] as const).nullable(),
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
			.nullable(),
		estadoCivil: z
			.enum([
				"SOLTERO",
				"CASADO",
				"DIVORCIADO",
				"UNION_LIBRE",
				"UNION_DE_HECHO",
				"VIUDO",
			] as const)
			.nullable(),
		tipoSangre: z.string().nullable(),
		paisResidencia: z.string().nullable(),
		callePrincipal: z.string().nullable(),
		calleSecundaria: z.string().nullable(),
		numeroDomicilio: z.string().nullable(),
		provinciaDondeSufraga: z.string().nullable(),
		telefonoMovil: z.string().nullable(),
		telefonoFijo: z.string().nullable(),
		correoElectronico: z.string().email().nullable(),
		correoInstitucional: z.string().email().nullable(),

		email: z.string().email().nullable(),
		emailVerified: z.date().nullable(),
		image: z.string().nullable(),
		name: z.string().nullable(),
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

class CreateUsuarioDTOError extends BaseDTOError<ICreateUsuario> {
	constructor(error: z.ZodError<ICreateUsuario>) {
		super(error);
		this.name = "CreateUsuarioDTOError";
		this.message = "Error de validacion para crear el usuario";
	}
}

export class CreateUsuarioDTO extends BaseValidatorDTO<
	ICreateUsuario,
	CreateUsuarioDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateUsuarioDTOError, input);
	}
}
