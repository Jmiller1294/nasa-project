const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:62AzPHTEljwMZQsA@nasacluster.zolu6.mongodb.net/nasa?retryWrites=true&w=majority';
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
  console.error(err);
})

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetData();
  await loadLaunchData();
  
  server.listen(PORT, () => {
   console.log(`listening on PORT ${PORT}...`)
  });
}

startServer()
