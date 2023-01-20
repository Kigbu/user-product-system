const {
  models: { Product, User },
} = require("../models");

module.exports = {
  create: async (req, res) => {
    const { name, description, quantity, unitprice, amountsold } = req.body;
    const { userId, email } = req.user;

    // verify user
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return res.status(400).json({
        success: false,
        data: "Invalid User! Please Login to add new product",
      });

    // validate inputs
    if (!name || !description || !quantity || !unitprice || !amountsold)
      return res
        .status(400)
        .json({ success: false, data: "Invalid field inputs" });

    const product = await Product.create({
      name,
      description,
      quantity,
      unitprice,
      amountsold,
      userId,
    });

    res.status(200).json({ success: true, data: product });
  },

  updateProduct: async (req, res) => {
    const { name, description, quantity, unitprice, amountsold } = req.body;
    const { userId, email } = req.user;
    const { productId } = req.params;

    // verify user
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return res.status(400).json({
        success: false,
        data: "Invalid User! Please Login to add new product",
      });

    // validate inputs
    if (!name || !description || !quantity || !unitprice || !amountsold)
      return res
        .status(400)
        .json({ success: false, data: "Invalid field inputs" });

    try {
      const product = await Product.update(
        {
          name,
          description,
          quantity,
          unitprice,
          amountsold,
        },
        {
          where: { id: productId, userId: userId },
        }
      );
      res
        .status(200)
        .json({ success: true, data: "Product update successful!" });
    } catch (err) {
      return res.status(400).json({
        success: false,
        data: "Product cannot be updated",
      });
    }
  },

  getMyProducts: async (req, res) => {
    const { userId } = req.user;

    const products = await Product.findAll({
      where: { userId },
      order: [["id", "DESC"]],
    });
    if (!products)
      return res.status(400).json({
        success: false,
        data: "Product record not found",
      });

    res.status(200).json({ success: true, data: products });
  },
};
