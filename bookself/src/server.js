const Hapi = require('@hapi/hapi');
const { PanicHandler } = require('./middleware/panic');
const routes = require('./routes');
const { BookHandler } = require('./handler');
const { BookService } = require('./books');
const { BookValidator } = require('./validator');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host:
      process.env.NODE_ENV === 'production' ? process.env.HOST : '127.0.0.1',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // panic handler
  server.ext('onPreResponse', PanicHandler);

  await server.register([
    {
      plugin: {
        name: 'book',
        version: '1.0.0',
        register: async (server) => {
          const bookHandler = new BookHandler(new BookService(), BookValidator);
          server.route(routes(bookHandler));
        },
      },
    },
  ]);

  await server.start();
  console.log(`server start at ${server.info.uri}`);
};

init();
