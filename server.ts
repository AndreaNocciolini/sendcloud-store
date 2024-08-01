import Fastify from 'fastify';
import routes from './src/routes/orders/routes';
import * as dotenv from 'dotenv';

dotenv.config();


const fastify = Fastify({
    logger: true
})

fastify.register(routes)

const start = async () => {
    try {
        fastify.listen({ port: Number(process.env.PORT) || 8080, host: '0.0.0.0' }, function (err, address) {
            if (err) {
                fastify.log.error(err)
                process.exit(1)
            }
            fastify.log.info(`server listening on ${address}`)
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};

start();