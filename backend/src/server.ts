import app from './app';

const port = process.env.SERVER_PORT;

app
  .listen(port, () => {
    console.log(`server running on port : ${port}`);
  })
  .on('error', (e) => console.error(e));