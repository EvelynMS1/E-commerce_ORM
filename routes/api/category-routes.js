const router = require ('express').Router ();
const {Category, Product} = require ('../../models');

// The `/api/categories` endpoint

router.get ('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll ({include: Product});
    const categories = categoryData.map (category =>
      category.get ({plain: true})
    );
    res.status (200).json (categories);
  } catch (err) {
    res.status (500).json (err);
  }
});

router.get ('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk (req.params.id, {
      include: {model: Product},
    });
    if (!categoryData) {
      res.status (404).json ({message: 'No categories found with that id :(!'});
      return;
    }
    res.status (200).json (categoryData);
  } catch (err) {
    res.status (500).json (err);
  }
});

router.post ('/', async (req, res) => {
  // create a new category
  try {
    const {category_name} = req.body;
    const category = await Category.create ({category_name});

    res.status (200).json (category);
  } catch (err) {
    res.status (500).json ();
  }
});

router.put ('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update (req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedCategory = await Category.findByPk (req.params.id);
    if (updatedCategory) {
      res.json (updatedCategory);
    } else {
      res.status (404).json ({message: 'category not found with this id'});
    }
  } catch (err) {
    res.status (500).json (err);
  }
});

router.delete ('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy ({
      where: {
        id: req.params.id,
      },
    });

    if (deleted) {
      res.status (200).json ({message: 'successfully deleted!'});
    } else {
      res.status (404).json ({message: 'category is not found with this id '});
    }
    // Its primary key is 123
  } catch (err) {
    console.log (err);
    res.status (500).json (err);
  }
});

module.exports = router;
