import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  migrations: {
    directory: __dirname + '/database/migrations',
  },
  seeds: {  
    directory: __dirname + '/database/seeds',
  },
  useNullAsDefault: true,
};

export default knexConfig;