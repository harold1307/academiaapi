import type { HttpResponseInit } from "@azure/functions";

type SuccessfulParams = Omit<HttpResponseInit, "jsonBody" | "body"> & {
	/**
	 * Data sended in jsonBody
	 * @default undefined
	 */
	data?: any;
	/**
	 * Message sended in jsonBody
	 * @default "Solicitud exitosa"
	 */
	message?: string;
	/**
	 * Extend the base body (data and message)
	 * @default undefined
	 */
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
	static successful(params?: SuccessfulParams): HttpResponseInit {
		const { data, message, status, extendBody, ...rest } = {
			data: undefined,
			message: "Solicitud exitosa",
			status: 200,
			extendBody: undefined,
			...params,
		};

		return {
			jsonBody: { data, message, ...(extendBody || {}) },
			status,
			...rest,
		};
	}
}
