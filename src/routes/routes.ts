import { fastify } from "..";
import { walker } from "../../utils/walker";

export async function routes() {
    fastify.post("/addService", function (request, reply) {
        reply.send({ hello: "world" });
    });

    fastify.post("/removeService", function (request, reply) {
        reply.send({ hello: "world" });
    });

    fastify.post("/updateService", function (request, reply) {
        reply.send({ hello: "world" });
    });

    fastify.post("/triggerService", function (request, reply) {
        // Trigger the service
        walker();
        reply.send({ hello: "world" });
    });
}
