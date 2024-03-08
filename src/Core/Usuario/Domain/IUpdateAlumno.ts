import type { Alumno } from "@prisma/client";

import type { IUpdateInscripcion } from "../../Inscripcion/Domain/IUpdateInscripcion";

export type IUpdateAlumno = Partial<
	Omit<Alumno, "id" | "createdAt" | "updatedAt" | "usuarioId" | "asesorCrmId"> &
		IUpdateInscripcion
>;
