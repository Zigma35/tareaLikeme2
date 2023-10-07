const { Pool } = require("pg");

const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    password: "1234",
    port: 5432,
    database: "likeme",
    allowExitOnIdle: true,

});

const getPosts = async() => {
    const result = await pool.query("select * from posts");
    return result.rows;
};

const insertPost = async(post) => {
    const values = Object.values(post);
    const consulta = "insert into posts values (DEFAULT, $1, $2, $3, DEFAULT)"
    const result = await pool.query(consulta, values)
    return result
};

const likePost = async (id) => {
   const result = await pool.query(
    "UPDATE posts SET likes = likes + 1 WHERE id =$1",
   [id]
   );
   return result.rows;
};

const deletePost = async (id) => {
    const { rows } = await pool.query(
     "DELETE FROM posts WHERE id = $1",
    [id]
    );
    return rows;
 };

module.exports = { getPosts, insertPost, likePost, deletePost };