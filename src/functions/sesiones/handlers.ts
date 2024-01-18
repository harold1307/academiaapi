import { app } from "@azure/functions";
import { SesionController } from "../../Core/Sesion/Application/Controller";

const controller = new SesionController();

app.get("sesionesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sesionesGetAll(req, ctx),
	route: "sesiones",
});

app.get("sesionesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sesionesGetById(req, ctx),
	route: "sesiones/{sesionId}",
});

app.post("sesionesCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sesionesCreate(req, ctx),
	route: "sesiones",
});

app.deleteRequest("sesionesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sesionesDeleteById(req, ctx),
	route: "sesiones/{sesionId}",
});

// app.patch("sesionesUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.sesionesUpdateById(req, ctx),
// 	route: "sesiones/{sesionId}",
// });
