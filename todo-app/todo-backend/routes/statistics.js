const express = require('express');
const { getAsync } = require('../redis/index')
const router = express.Router();

/* GET usage statistics. */
router.get('/', async (_, res) => {
  const added_todos = await getAsync('added_todos');
  res.json({ added_todos: Number(added_todos) });
})

module.exports = router;
