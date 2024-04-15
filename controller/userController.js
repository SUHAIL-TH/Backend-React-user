


    const postlogin=(req,res)=>{
        try {
            console.log(req.body);
                console.log("hii post login called")
                res.send({message:"somthing added successfully"})
        } catch (error) {
            res.status(500).send({message:"somthing went wrong"})
        }
    }


    module.exports={
        postlogin
    }