import Fetcher from "./Fetcher";
require('dotenv').config();

const run = async (): Promise<void> => {
  const fetcher = new Fetcher();

  await fetcher.fetchHistory();
}

run().catch(error => {
  console.error(`run failed! ${error.message}`);
});
