import app from './App'

let port: number = 3000;

// Levanta servidor node
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server is listening on ${port}`);
});

process.on('SIGINT', function() {
  process.exit();
});