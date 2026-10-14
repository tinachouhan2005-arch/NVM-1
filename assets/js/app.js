const cl = console.log;

let post=[  

  {
    "userId": "1",
    "id": "2",
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": "1",
    "id": "3",
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": "1",
    "id": "4",
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": "1",
    "id": "5",
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  }

]

const express = require('express');


const app = express();

app.use(express.json());

app.get("/api/posts",(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message:'Posts fetched successfully',
            data:post
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:'Network Error',
            error:err.message
        })

    }
})

//Single object 

app.get("/api/posts/:id",(req,res)=>{
    try{
        let postId = req.params.id;
        let singlepost = post.find(t => t.id === postId)
        if(!singlepost){
            return res.status(404).json({
                success:false,
                message:`Post with id ${postId} not found`
            })
        }
        res.status(200).json({
            success:true,
            data:singlepost,
            message:`Post with id ${postId} is fetch successfully`
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Network Error',
            error:err.message
        })
    }
})

app.post("/api/posts",(req,res)=>{
    let body = req.body;

    if(!body.title|| !body.body){
        return res.status(400).json({
            success:false,
            message:`Title and Body required fields!!`
        })
    }

    let newPost={
        title:body.title,
        body:body.body,
        id:Date.now().toString(),
        createdAt:Date.now(),
        updatedAt:null
    }
    post.unshift(newPost)
    try{
        res.status(201).json({
            success:true,
            message:`The new post ${newPost.title} is created successfully`,
            data:post
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Network Error',
            error:err.message
        })
    }
})

app.patch("/api/posts/:id",(req,res)=>{
    try{
        let updateId = req.params.id;
        let getIndex = post.findIndex(t => t.id === updateId)

        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:'The post data is not found'
            })
        }

        let obj = post.find(t => t.id === updateId)

        let updateObj={
            ...obj,
            ...req.body,
            id:obj.id
        }
        post[getIndex]=updateObj


        res.status(200).json({
            success:true,
            message:'Post Updated successfully',
            data:updateObj
        })
    }catch(err){
       res.status(500).json({
            success:false,
            message:'Network Error',
            error:err.message
        }) 
    }
})

app.delete("/api/posts/:id",(req,res)=>{
    try{
        let removeId = req.params.id;
        let getIndex = post.findIndex(t => t.id === removeId);

        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:`The blog with id ${removeId} is not found`
            })
        }
        let deletePost = post.splice(getIndex,1)

        res.status(200).json({
            success:true,
            message:'Post Deleted successfully',
            data:deletePost
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Network Error',
            error:err.message
        })
    }
})



app.listen(3000, ()=>{
     cl('server is listening on port 3000')
})


