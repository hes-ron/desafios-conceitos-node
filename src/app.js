const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  var likes = 0;

  const repository = { id: uuid(), title, url, techs, likes}

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ error: "Esse repositório não existe!" })
  }

  const projectToUpdate = {
    id,
    title,
    url,
    techs
  }

  repositories[repoIndex] = projectToUpdate;

  return response.json(projectToUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
