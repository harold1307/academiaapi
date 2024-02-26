import { z } from "zod";

import { BaseDTOError, BaseValidatorDTO } from "../../../../Utils/Bases";
import type { ZodInferSchema } from "../../../../types";
import type { ICreateAlumno } from "../../Domain/ICreateAlumno";

const schema = z.object<ZodInferSchema<ICreateAlumno>>({
	colegio: z.string().nullable(),
	especialidad: z.string().nullable(),
	fechaInscripcion: z.date(),
	codigoPromocion: z.string().nullable(),
	archivador: z.string().nullable(),
	comoNosConocio: z.enum([
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
	] as const),
	razonesParaInscribirse: z.enum([
		"AMIGOS",
		"CARRERAS",
		"HORARIOS",
		"INSTALACIONES",
		"MENCIONES",
	] as const),
	fechaExamenSNNA: z.date().nullable(),
	puntajeSNNA: z.number().nullable(),
	titulo: z.boolean(),
	papeletaVotacion: z.boolean(),
	copiaLicencia: z.boolean(),
	condicionado: z.boolean(),
	rindioExamenEgresoInstitucion: z.boolean(),
	actaGrado: z.boolean(),
	partidaNacimiento: z.boolean(),
	certificadoAntecedentes: z.boolean(),
	planillaServicioBasico: z.boolean(),
	transferenciaOtraIES: z.boolean(),
	certificadoEstudios: z.boolean(),
	documentosHomologacion: z.boolean(),
	certificadoSanguineo: z.boolean(),
	silabos: z.boolean(),
	cedula: z.boolean(),
	fotos: z.boolean(),
	certificadoSalud: z.boolean(),
	transcript: z.boolean(),
	observaciones: z.string().nullable(),

	centroInformacionId: z.string().uuid(),
	asesorCrmId: z.string().uuid(),
	nivelAcademicoId: z.string().uuid(),
});

class CreateAlumnoDTOError extends BaseDTOError<ICreateAlumno> {
	constructor(error: z.ZodError<ICreateAlumno>) {
		super(error);
		this.name = "CreateAlumnoDTOError";
		this.message = "Error de validacion para crear el usuario alumno";
	}
}

export class CreateAlumnoDTO extends BaseValidatorDTO<
	ICreateAlumno,
	CreateAlumnoDTOError
> {
	constructor(input: unknown) {
		super(schema, CreateAlumnoDTOError, input);
	}
}
