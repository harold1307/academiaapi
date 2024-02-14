import { app } from "@azure/functions";

import { PeriodoLectivoController } from "../../Core/PeriodoLectivo/Application/Controller";

const controller = new PeriodoLectivoController();

app.get("periodosLectivosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.periodosLectivosGetAll(req, ctx),
	route: "periodos-lectivos",
});

app.get("periodosLectivosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.periodosLectivosGetById(req, ctx),
	route: "periodos-lectivos/{periodoLectivoId}",
});

app.post("periodosLectivosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.periodosLectivosCreate(req, ctx),
	route: "periodos-lectivos",
});

app.deleteRequest("periodosLectivosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.periodosLectivosDeleteById(req, ctx),
	route: "periodos-lectivos/{periodoLectivoId}",
});

app.patch("periodosLectivosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.periodosLectivosUpdateById(req, ctx),
	route: "periodos-lectivos/{periodoLectivoId}",
});