import { HttpRequest, InvocationContext } from "@azure/functions";

import { AsignaturaController } from "../Core/Asignatura/Application/Controller";

describe("sum", () => {
	test("adds 1 + 2 to equal 3", () => {
		expect(1 + 2).toBe(3);
	});
});

describe("Asignatura", () => {
	const controller = new AsignaturaController();

	test("Create", async () => {
		const res = await controller.asignaturasCreate(
			new HttpRequest({
				url: "http://localhost:42069/api/asignaturas",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					string: JSON.stringify({
						nombre: "NUEVA ASIGNATURA",
						codigo: null,
					}),
				},
			}),
			new InvocationContext(),
		);

		console.log(res.jsonBody);

		expect(res.status).toBe(201);
	});

	test("GetAll", async () => {
		const res = await controller.asignaturasGetAll(
			new HttpRequest({
				url: "http://localhost:42069/api/asignaturas",
				method: "GET",
			}),
			new InvocationContext(),
		);

		const jsonRes = res.jsonBody as { data: any; message: string };

		console.log(res.jsonBody);

		expect(res.status).toBe(200);
		expect(jsonRes.data).toBeInstanceOf(Array);
		expect(jsonRes.data.length).toBeGreaterThan(0);
	});
});
