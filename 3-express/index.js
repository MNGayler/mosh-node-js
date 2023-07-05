
const Joi = require('joi');
const express = require("express");
const app = express();


app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

// console.log(process.env.PORT);
app.get("/", (req, res) => {
  res.send("hello world!!!!");
});

app.get("/api/courses", (req, res) => {
  res.send([courses]);
});


const schema = Joi.object({
    name: Joi.string().min(3).required()
});

app.post("/api/courses", (req, res) => {

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with the given id was not found");
  res.send(course);
});

//put

app.put('/api/courses/:id', (req, res) => {
    //look up course
    //if course not found 404
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      return res.status(404).send("the course with the given id was not found");

    //validate
    // if invalid return 400 error
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    //update course

    course.name = req.body.name;

    //return update course to client
    res.send(course);
});


//delete

app.delete('/api/courses/:id', (req, res) => {
    //look up course
    //Not existing return 404
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      return res.status(404).send("the course with the given id was not found");

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return same course
    res.send(course);

});






// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
