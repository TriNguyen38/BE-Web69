import axios from "axios";
import dotenv from "dotenv";
import Category from "../models/Category";
import Product from "../models/Product";
import productsValidator from "../validations/products";

dotenv.config()

const { DB_URL } = process.env

export const getAll = async (req, res) => {
  // res.end(JSON.stringify(products));
  
  try {
    // const _page = req.query._page || 1;
    // const _limit = req.query._limit || 10;
    // const _sort = req.query._sort ||'price';
    // const _order = req.query._order || 'asc';
    console.log(req.query)
    const {
      _page = 1,
      _limit = 10,
      _order = "asc",
      _sort = "price"
    } = req.query;


    const options = {
      page: _page,
      limit: _limit,
      sort: {[_sort]: _order === "asc" ? 1 : -1},
      
      // sort: ({price: req.query._order})
      // sort by createdAt/price/rate...
    };
    




    // const { data } = await axios.get(`${DB_URL}/products`);
    // const data = await Product.find({}).populate("categoryId");
    const data = await Product.paginate({},options)
    console.log(req.query)
    if (!data.docs || data.docs.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product successfully", products: data });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetail = async (req, res) => {
  // res.end(JSON.stringify(products));
  try {
    // const { data } = await axios.get(`${DB_URL}/products/${req.params.id}`);
    const data = await Product.findById(req.params.id).populate("categoryId")
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product successfully", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Product failed",
    });
  }
};

export const createProduct = async (req, res) => {
  // res.end(JSON.stringify(products));
  const { error } = productsValidator.validate(req.body);  
  console.log(error)
  // Biến error trên được trả ra sau khi đã validate. 
  // Tuy nhiên nếu không return lỗi thì chương trình vẫn chạy tiếp và chỉ hiển thị thông báo error
  // có thể tạo biến mới tại vị trí { error } và clg để theo dõi.

  if (error) {
    return res.status(500).json({ message: error.details[0].message || "name is not allowed to be empty" });
  }
  try {
    console.log(req.body);
    const data = await Product.create(req.body);
    if (!data) {
      return res.status(404).json({ message: "Create not successfully" });
    }
    const updateCategory = await Category.findByIdAndUpdate(data.categoryId,{
      $addToSet: {
        products: data._id
      }
    })
    if (!updateCategory){
      return res.status(404).json({ message: "Update Category not successfully" });
    }
    return res
      .status(200)
      .json({ message: "Create successfully", products: data,});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  // res.end(JSON.stringify(products));
  const { error } = productsValidator.validate(req.body);
  console.log(error)
  if (error) {
    return res.status(500).json({ message: error.details[0].message || "name is not allowed to be empty" });
  }


  try {
    // const { data } = await axios.put(
    //   `${DB_URL}/products/${req.params.id}`,
    //   req.body
    // );
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!data) {
      return res.status(404).json({ message: "Edit not successfully" });
    }
    const updateEditCategory = await Category.findByIdAndUpdate(data.categoryId,{
      $addToSet: {
        products: data._id
      }
    })
    if (!updateEditCategory){
      return res.status(404).json({ message: "Error updating category" });
    }


    return res
      .status(200)
      .json({ message: "Edit successfully", products: data });
  } catch (error) {
    return res.status(500).json({
      message: "Edit failed",
    });
  }
};




export const deleteProduct = async (req, res) => {
  // res.end(JSON.stringify(products));
  try {
    // const { status } = await axios.delete(
    //   `${DB_URL}/products/${req.params.id}`
    // );

    const data = await Product.findByIdAndDelete(req.params.id);
    // if (!status || status !== 200) {
      if (!data){
      return res.status(404).json({ message: "Delete not successfully" });
    }
    const updateDeleteCategory = await Category.findByIdAndUpdate(data.categoryId,{
      $pull: {
        products: data._id
      }
    })
    if (!updateDeleteCategory){
      return res.status(404).json({ 
        message: "Error updating category"
      })
    }
    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};





