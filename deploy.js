require('dotenv-flow').config();

const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const { FTP_SERVER, FTP_USER, FTP_PASSWORD, FTP_PATH } = process.env;
const config = {
  user: FTP_USER,
  // Password optional, prompted if none given
  password: FTP_PASSWORD,
  host: FTP_SERVER,
  port: 21,
  localRoot: __dirname + '/build',
  remoteRoot: FTP_PATH,
  // include: ["*", "**/*"],      // this would upload everything except dot files
  include: ['*'],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: ['.git/**'],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: false
};

console.log('[DEPLOY] Start');
// use with promises
ftpDeploy
  .deploy(config)
  .then((res) => console.log('[DEPLOY] finished:', res))
  .catch((err) => console.log(err));
