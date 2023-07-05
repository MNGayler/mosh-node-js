const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

// initial testing data
const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "action" },
  { id: 3, name: "drama" },
];

//joi schema
const schema = Joi.object({
    name: Joi.string().min(3).required()
});


// GET all and individual genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  //look up course, if not found 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("the genre with the given id was not found");
  }
  res.send(genre);
});

// post new genre

app.post('/api/genres', (req, res) => {
    //validate the post body using joi - error message if failure
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    //post validated data
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    genres.push(genre);

    //return genre to client
    res.send(genre);    
})

//  update / put a genre

app.put('/api/genres/:id', (req, res) => {
    // check genre id exists - error 404 if not
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre)
      return res.status(404).send("the genre with the given id was not found");
    //validate the new data -return 400 if error
    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    } 
    // update the validated genre
    genre.name = req.body.name;
    // return updated genre
    res.send(genre);

});

// delete a genre
app.delete('/api/genres/:id', (req, res) => {
    // check genre id exists - error 404 if not
    const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre){
        return res.status(404).send("the genre with the given id was not found");
    }
    // delete the genre
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    //return the deleted genre
    res.send(genre);
});











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});
