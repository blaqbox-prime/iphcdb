export const authenticated = (fn) => async (req, res) => {

    verify(req.headers.authorization, process.env.SECRET, async function(err, decoded) {
        if(!err && decoded){
            return await fn(req, res);
        }
        res.status(500).json({message: "You are not authorized"});
      });
    //   return await fn(req, res);
  };