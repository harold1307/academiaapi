import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { IUpdateAlumno } from "../../Domain/IUpdateAlumno";

const schema = z.object<ZodInferSchema<IUpdateAlumno>>({
	estado: z.enum(["ACTIVO", "EGRESADO", "RETIRADO"] as const).optional(),
	colegio: z.string().nullable().optional(),
	especialidad: z.string().nullable().optional(),
	fechaInscripcion: z.date().optional(),
	codigoPromocion: z.string().nullable().optional(),
	archivador: z.string().nullable().optional(),
	comoNosConocio: z
		.enum([
			"FACEBOOK",
			"INSTAGRAM",
			"OTROS_MEDIOS",
			"PERIODICO",
			"PUBLICIDAD_FISICA",
			"RADIO",
			"REDES_SOCIALES",
			"TELEVISION",
			"TIKTOK",
			"TWITTER",
			"UN_AMIGO_ESTUDIO_AQUI",
			"UN_FAMILIAR_ESTUDIO_AQUI",
			"VISITAS_A_COLEGIOS",
		] as const)
		.optional(),
	razonesParaInscribirse: z
		.enum([
			"AMIGOS",
			"CARRERAS",
			"HORARIOS",
			"INSTALACIONES",
			"MENCIONES",
		] as const)
		.optional(),
	fechaExamenSNNA: z.date().nullable().optional(),
	puntajeSNNA: z.number().nullable().optional(),
	titulo: z.boolean().optional(),
	papeletaVotacion: z.boolean().optional(),
	copiaLicencia: z.boolean().optional(),
	condicionado: z.boolean().optional(),
	rindioExamenEgresoInstitucion: z.boolean().optional(),
	actaGrado: z.boolean().optional(),
	partidaNacimiento: z.boolean().optional(),
	certificadoAntecedentes: z.boolean().optional(),
	planillaServicioBasico: z.boolean().optional(),
	transferenciaOtraIES: z.boolean().optional(),
	certificadoEstudios: z.boolean().optional(),
	documentosHomologacion: z.boolean().optional(),
	certificadoSanguineo: z.boolean().optional(),
	silabos: z.boolean().optional(),
	cedula: z.boolean().optional(),
	fotos: z.boolean().optional(),
	certificadoSalud: z.boolean().optional(),
	transcript: z.boolean().optional(),
	observaciones: z.string().nullable().optional(),

	centroInformacionId: z.string().uuid().optional(),
	asesorCrmId: z.string().uuid().optional(),
});

class UpdateAlumnoDTOError extends BaseDTOError<IUpdateAlumno> {
	constructor(error: z.ZodError<IUpdateAlumno>) {
		super(error);
		this.name = "UpdateAlumnoDTOError";
		this.message = "Error de validacion para actualizar el usuario alumno";
	}
}

export class UpdateAlumnoDTO extends BaseValidatorDTO<
	IUpdateAlumno,
	UpdateAlumnoDTOError
> {
	constructor(input: unknown) {
		super(schema, UpdateAlumnoDTOError, input);
	}
}
