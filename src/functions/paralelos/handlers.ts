import { app } from "@azure/functions";
import { ParaleloController } from "../../Core/Paralelo/Application/Controller";

const controller = new ParaleloController();

app.get("paralelosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.paralelosGetAll(req, ctx),
	route: "paralelos",
});

app.get("paralelosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.paralelosGetById(req, ctx),
	route: "paralelos/{paraleloId}",
});

app.post("paralelosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.paralelosCreate(req, ctx),
	route: "paralelos",
});

app.deleteRequest("paralelosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.paralelosDeleteById(req, ctx),
	route: "paralelos/{paraleloId}",
});

// app.patch("paralelosUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.paralelosUpdateById(req, ctx),
// 	route: "paralelos/{paraleloId}",
// });
