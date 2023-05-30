// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foregeinKey :'category_id',

})
// Categories have many Products
Category.hasMany(Product,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag,{
  forgeinKey: 'product_id',
  onDelete:"CASCADE"
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag,{
  forgeinKey:"tag_id",
  onDelete:"CASCADE"
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
