class CollectionsController{
    newArrivals(req,res,next)
    {
        res.send("NEW - ARRIVALS");
    }
}
module.exports = new CollectionsController();