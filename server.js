import {buildApp} from "./app.js";

const start = async () => {
    try {
        const server = await buildApp()
        await server.listen({
            port: process.env.PORT || 3000,
            host: "0.0.0.0"
        })
        console.log('🚀 Servidor rodando em http://localhost:3000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start().then()
