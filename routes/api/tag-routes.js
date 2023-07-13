const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    if (!tagData) {
      res.status.apply(404).json({ message: "No tags with that specific id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json();
  }
});

router.post("/", async (req, res) => {
  try {
    const { tag_name } = req.body;
    const tag = await Tag.create({ tag_name });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json();
  }
});
// Updates a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedTag = await Tag.findByPk(req.params.id);
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).json({ message: "tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Deletes tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleted) {
      res.status(200).json({ message: "Tag deleted!" });
    } else {
      res.status(404).json({ message: "tag is not found with this id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
