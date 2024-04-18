const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis/index')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const added_todos = await getAsync('added_todos');
    if (added_todos) {
      await setAsync('added_todos', Number(added_todos) + 1)
    } else {
      await setAsync('added_todos', 1)
    }
  } catch (e) {
    console.error('Redis error: ', e)
  }

  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    res.send(todo);
  } catch (e) {
    console.error('MongoDB error: ', e)
    res.status(500).send({ message: 'Error creating Todo', error: e})
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { todo } = req;
  const { text, done } = req.body

  if (text !== undefined) todo.text = text
  if (done !== undefined) todo.done = done

  try {
    const updatedTodo = await todo.save();
    res.send(updatedTodo)
  } catch (error) {
    res.sendStatus(500)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
