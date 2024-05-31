import { Category } from '../models/category.model.js';
/**
 * Controller for creating the category
 * 
 *   POST localhost:8080/ecomm/api/v1/categories
 * 
 *   {
       "name" : "Household",
        "description" : "This will have all the household items "
     }
 */
export const createNewCategory = async (req, res) => {
  //Read the req body
  //Create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  const alreadyExitCategory = await Category.findOne({
    name: cat_data.name,
  });
  if (alreadyExitCategory) {
    return res.status(409).send({
      message: 'Category Already exitss....',
    });
  }

  try {
    //Insert into mongodb
    const category = await Category.create(cat_data);
    return res.status(201).send({
      data: category,
      message: 'Category created successfully',
    });
  } catch (err) {
    console.log('Error while creating the category', err);
    return res.status(500).send({
      message: 'Error while creating the category',
    });
  }

  //return the response of the created category
};

// Get All Category

export const getAllCategory = async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    return res.status(201).send({
      message: 'All Category getting successfully!!',
      data: getAllCategory,
    });
  } catch (error) {
    return res.status(404).send({
      message: 'Something went wrong!!',
    });
  }
};

// Get Specific Category

export const getSpecificCategoryById = async (req, res) => {
  try {
    const getCategoryById = await Category.findById(req.params.id);
    return res.status(201).send({
      message: 'Category Getting Successfully!!',
      data: getCategoryById,
    });
  } catch (error) {
    return res.status(404).send({
      message: 'something Went Wrong!!',
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  // Check if the request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }

  const id = req.params.id;

  try {
    // Check if category with the new name already exists (if the name is being updated)
    if (req.body.name) {
      const existingCategory = await Category.findOne({
        name: req.body.name,
      });
      if (existingCategory && existingCategory._id.toString() !== id) {
        return res.status(409).send({
          message: 'Category with this name already exists',
        });
      }
    }

    // Find the category by ID and update it
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });

    // If the category does not exist, return a 404 error
    if (!category) {
      return res.status(404).send({
        message: 'Category not found',
      });
    }

    // Return a success message with the updated category data
    res.send({
      message: 'Category updated successfully',
      data: category,
    });
  } catch (err) {
    // Return a 500 error if an error occurs during the update process
    console.error('Error while updating the category:', err);
    return res.status(500).send({
      message: err.message || 'Some error occurred while updating the category',
    });
  }
};

export const deletCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).send({
        message: 'Category not found',
      });
    }
    return res.status(200).send({
      message: 'category deleted Successfully!!',
    });
  } catch (error) {
    console.log(error);
  }
};
