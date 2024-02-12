import type { MateriaEnHorario } from "@prisma/client";
import type { INivelAcademico } from "../../NivelAcademico/Domain/INivelAcademico";
import type { ITurno } from "../../Turno/Domain/ITurno";
import type { IUbicacion } from "../../Ubicacion/Domain/IUbicacion";

export type IMateriaEnHorario = MateriaEnHorario & {
	ubicacion: IUbicacion;
	turno: ITurno;
	nivelAcademico: INivelAcademico;
};
