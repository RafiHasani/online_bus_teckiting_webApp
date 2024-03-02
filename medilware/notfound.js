const NotFoundError = (req,res,next)=>{
    res.status(404).sendFile('../public/notfound.html')
next();
}


 export default NotFoundError;