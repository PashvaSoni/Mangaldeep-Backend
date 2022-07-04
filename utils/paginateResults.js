"use strict";

import Product from "../model/product.js";

function productQueryObject(req)
{
    const queryObj={}
    if(req.query.search)
    {
      queryObj.$text={$search:req.query.search}
    }
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
      let populateString=''
      
      if(model===Product)
      {
          queryObj=productQueryObject(req);
          sortObj=productSortObject(req);
          populateString='category class occasion';
      }

      const result = {};
      result.totalDocs=(await model.where(queryObj).count());
      if (endIndex < result.totalDocs) {
        result.nextPage = page + 1;
      }
      else
      {
        result.nextPage =null;
      }
      if (startIndex > 0) {
        result.previousPage =page - 1;
      }
      else
      {
        result.previousPage=null;
      }
      try {
        result.results = await model.find(queryObj).sort(sortObj).limit(limit).skip(startIndex).populate(populateString);
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json({success:0, message: e.message,data:null });
      }
    };
  }