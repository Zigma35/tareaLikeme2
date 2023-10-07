const express = require("express");
const morgan = require("morgan-body");
const cors = require("cors");
const { getPosts, 
        insertPost, 
        likePost, 
        deletePost, 
    } = require ("./consultas");
const app = express ();
const PORT = 3000;
morgan(app);
app.use(cors());
app.use(express.json());


app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const post = req.body;
    const restult = await insertPost(post);
    res.json(result);

});

app.put("/posts/like/:id", async (req, res) => {
try {
    const { id } = req.params;
    const result = await likePost(id);
    res.json(result);
} catch (error) {
    res.status(500).send (error);
}

});

app.delete("/posts//:id", async (req, res) => {
try {
    const { id } = req.params;
    const result = await deletePost(id);
    res.json(result);
} catch (error) {
    res.status(500).send (error);
}
});


app.listen(PORT, console.log(`server up en puerto: ${PORT}`));