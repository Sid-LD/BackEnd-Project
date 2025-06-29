const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export {asyncHandler}









////APPROACH 2
// const asyncHandler=()=>{}
// const asyncHandler=(func)=>()=>{}
// const asyncHandler=(func)=>async ()=>{}

//CREATES A WRAPPER FUNCTION AROUND THE ASYNC FUNCTION
// THIS HELPS IN HANDLING ERRORS IN ASYNC FUNCTIONS WITHOUT TRY CATCH BLOCKS
// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
//         await fn(req,res,next); 
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message 
//         })
        
//     }
// }