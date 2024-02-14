import { app } from "@azure/functions";

import { SubPeriodoLectivoController } from "../../Core/SubPeriodoLectivo/Application/Controller";

const controller = new SubPeriodoLectivoController();

app.get("subPeriodosLectivosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.subPeriodosLectivosGetAll(req, ctx),
	route: "sub-periodos-lectivos",
});

app.get("subPeriodosLectivosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.subPeriodosLectivosGetById(req, ctx),
	route: "sub-periodos-lectivos/{subPeriodoLectivoId}",
});

// app.post("subPeriodosLectivosCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.subPeriodosLectivosCreate(req, ctx),
// 	route: "sub-periodos-lectivos",
// });

app.deleteRequest("subPeriodosLectivosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.subPeriodosLectivosDeleteById(req, ctx),
	route: "sub-periodos-lectivos/{subPeriodoLectivoId}",
});

app.patch("subPeriodosLectivosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.subPeriodosLectivosUpdateById(req, ctx),
	route: "sub-periodos-lectivos/{subPeriodoLectivoId}",
});
