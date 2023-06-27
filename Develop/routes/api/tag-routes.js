const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
try{
  const tags = await Tag.findAll({
    include:[{
      model: Product,
      through:ProductTag,
    }]
  });
  res.status(200).json(tags)
}catch(err){
  res.status(500).json(err);
}
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id,{
      include:[{
        model: Product,
        through:ProductTag,
      }]
    });
    if(!tagData){
      res.status.apply(404).json({message:'No tags with that specific id'});
      return;
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json()
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const {tag_name} = req.body;
    const tag = await Tag.create({tag_name})
    res.status(200).json(tag)
  }catch(err){
    res.status(500).json();
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    await Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    });
    const updatedTag = await Tag.findByPk(req.params.id);
    if(updatedTag){
        res.json(updatedTag)
      }else{
        res.status(404).json({message:"tag not found"})
      }
    }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const deleted =await Tag.destroy({
      where:{
        id:req.params.id
      }
    });
    
    if(deleted){
      res.status(200).json({message:"Tag deleted!"});
    }else{
      res.status(404).json({message:"tag is not found with this id"})
    }
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
