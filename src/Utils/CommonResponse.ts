import type { HttpResponseInit } from "@azure/functions";

type SuccessfulParams = Omit<HttpResponseInit, "jsonBody" | "body"> & {
	data?: any;
	message?: string;
	extendBody?: Record<string, any>;
};

export class CommonResponse {
	static invalidId() {
		return {
			jsonBody: {
				message: "El ID es invalido o no ha sido proporcionado",
			},
			status: 400,
		} as const;
	}

	static invalidBody() {
		return {
			jsonBody: { message: "Error en la peticion, el body es invalido" },
			status: 400,
		} as const;
	}

	/**
	 * @default params {data = undefined, message = "Solicitud exitosa", status = 200, extendBody = undefined }
	 */
	static successful({
		data = undefined,
		message = "Solicitud exitosa",
		status = 200,
		extendBody = undefined,
		...rest
	}: SuccessfulParams): HttpResponseInit {
		return {
			jsonBody: { data, message, ...(extendBody || {}) },
			status,
			...rest,
		};
	}
}
