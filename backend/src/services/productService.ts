import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try
  {
    const products = [
      {
        title: "Dell Laptop",
        image:
          "https://m.media-amazon.com/images/I/61ESd8sr8kL._AC_UF350,350_QL80_.jpg",
        price: 949,
        stock: 10,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};
