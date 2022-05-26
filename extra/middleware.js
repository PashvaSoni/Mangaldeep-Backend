import Product from "../model/product.js";

function productQueryObject(req)
{
    const queryObj={}
    if(req.query.category)
    {
      queryObj.category=req.query.category;
    }
    if(req.query.class)
    {
      queryObj.class=req.query.class;
    }
    if(req.query.occasion)
    {
      queryObj.occasion=req.query.occasion;
    }
    if(req.query.metal)
    {
    queryObj.metal=req.query.metal;
    }
    
    return queryObj;
}

function productSortObject(req)
{
    const sortObj={}
    if(req.query.sort)
    {
        if (req.query.sort==="nf") // newest first
        {
            sortObj._id=-1;
        }
        else if(req.query.sort==="of") // oldest first
        {
            sortObj._id=1;
        }
        else if(req.query.sort==="lth") // price low to high
        {
            sortObj.makingcharge=1;
        }
        else if(req.query.sort==="htl") // price high to low
        {
            sortObj.makingcharge=-1;
        }
        else
        {
            sortObj.popularity=1;
        }
    }
    return sortObj;
}

export function paginate(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      let queryObj={}
      let sortObj={}

      if(model===Product)
      {
          queryObj=productQueryObject(req);
          sortObj=productSortObject(req);
      }

      const result = {};
      result.totaldocs=(await model.countDocuments().exec());
      if (endIndex < result.totaldocs) {
        result.next = {
          page: page + 1,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
        };
      }
      try {
        result.results = await model.find(queryObj).sort(sortObj).limit(limit).skip(startIndex);
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json({success:0, message: e.message,data:null });
      }
    };
  }