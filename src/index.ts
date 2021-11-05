import Fetcher, { Options } from "./Fetcher";
require('dotenv').config();

const run = async (): Promise<void> => {
  const fetcher = new Fetcher();

  let options: Options = {
    // type: 'movies',
    // type: 'episode',
    type: null,
    output: null,
  }
  let history = await fetcher.fetchHistory(options);
}

run().catch(error => {
  console.error(`run failed! ${error.message}`);
});
