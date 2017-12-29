import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import schema from './data/schema';
import config from './config/index';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';

const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  schema, 
  pretty: true,
  graphiql: true
}));
graphQLServer.listen(config.graphql.port, () => {
  console.log(chalk.green(`GraphQL Server is now running on http://localhost:${config.graphql.port}`));
})

const compiler = webpack(webpackConfig);
const relayServer = new WebpackDevServer(compiler, {
  contentBase: '../build/',
  proxy: {'/graphql': `http://localhost:${config.graphql.port}`},
  publicPath: '/',
  stats: { colors: true }
});
relayServer.use('/', express.static(path.resolve(__dirname, '../build/client')));
relayServer.listen(config.relay.port, () => {
  console.log(chalk.green(`Relay Server is not running on http://localhost:${config.relay.port}`));
});