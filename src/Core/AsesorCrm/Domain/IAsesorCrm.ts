import type { Administrativo, AsesorCrm } from "@prisma/client";

import type { IAsesorCrmEnCentroInformacion } from "../../AsesorCrmEnCentroInformacion/Domain/IAsesorCrmEnCentroInformacion";
import type { ICentroInformacion } from "../../CentroInformacion/Domain/ICentroInformacion";
import type { IUsuario } from "../../Usuario/Domain/IUsuario";

export type IAsesorCrm = AsesorCrm & {
	administrativo: Administrativo & {
		usuario: Omit<
			IUsuario,
			"administrativo" | "profesor" | "alumno" | "grupos"
		>;
	};
	centrosInformacion: (IAsesorCrmEnCentroInformacion & {
		centroInformacion: Omit<ICentroInformacion, "enUso">;
	})[];
};
