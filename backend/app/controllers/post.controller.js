const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;


// Create and Save a new Post
exports.create = (req, res) => {
  const { title, description, published } = req.body

  pool.query('INSERT INTO posts (title, description, published) VALUES ($1, $2, $3) RETURNING *', [title, description,published ], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Post added with ID: ${results.rows[0].id}`)
  })
};
// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  db.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = parseInt(req.params.id)

  db.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, published } = req.body

  db.query(
    'UPDATE posts SET title = $1, description = $2, published = $3 WHERE id = $4',
    [title, description, published,id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Post modified with ID: ${id}`)
    }
  )
};
// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = parseInt(req.params.id)

  db.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Post deleted with ID: ${id}`)
  })
};
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  db.query('DELETE FROM posts WHERE 1', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Post deleted `)
  })
};
// Find all published Posts
exports.findAllPublished = (req, res) => {
  db.query('SELECT * FROM posts WHERE published = 1 ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};