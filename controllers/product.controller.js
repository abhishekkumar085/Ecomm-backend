import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';
import { Category } from '../models/category.model.js';

export const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    quantity_in_stock,
    category,
    attributes,
    images,
    reviews,
  } = req.body;

  // Check if all required fields are provided
  if (!name || !description || !price || !quantity_in_stock || !category) {
    return res.status(400).send({
      message:
        'All fields are required: name, description, price,  quantity_in_stock, and category',
    });
  }

  // Validate the category ID
  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).send({
      message: 'Invalid category ID',
    });
  }

  // Check if the category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(404).send({
      message: 'Category not found',
    });
  }

  const productData = {
    name,
    description,
    price,
    quantity_in_stock,
    category,
    attributes,
    images,
    reviews,
  };

  try {
    const product = await Product.create(productData);
    return res.status(201).send({
      message: 'Product created successfully',
      data: product,
    });
  } catch (err) {
    console.error('Error while creating the product:', err);
    return res.status(500).send({
      message: 'Error while creating the product',
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send({
      message: 'products getting successfully!!',
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: 'Something went Wrong with fetching product!!',
      error: error.message,
    });
  }
};

export const productFindByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  console.log(categoryId, 'categoryIDddd');
  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).send({
      message: 'Invalid Category Id',
    });
  }
  try {
    const productsById = await Product.find({
      category: categoryId,
    }).populate('category');
    return res.status(200).send({
      message: 'Products retrieved successfully by category',
      data: productsById,
    });
  } catch (error) {
    console.error('Error while retrieving products by category:', error);
    return res.status(500).send({
      message: 'Error while retrieving products by category',
    });
  }
};

export const updateProductById = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }
  const id = req.params.id;
  console.log(`Received request to update product with id: ${id}`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invalid Product Id',
    });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log('Updated product', updateProduct);

    if (!updateProduct) {
      return res.status(404).send({
        message: 'Product not found',
      });
    }
    res.status(200).send({
      message: 'Product updated successfully',
      data: updateProduct,
    });
  } catch (error) {
    console.error('Error while updating product:', error);
    return res.status(500).send({
      message: 'Error while updating product',
    });
  }
};
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).send({
        message: 'Product not found!!',
      });
    }
    return res.satatus(200).send({
      message: 'product deleted successfully!!',
    });
  } catch (error) {
    console.log('Error while deleting product', error);
    return res.status(404).send({
      message: 'Error while deleting product',
    });
  }
};
