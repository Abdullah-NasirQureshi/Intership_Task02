const Sale = require('../models/Sale');
const Product = require('../models/Product');

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('customerId', 'name phone email')
      .populate('createdBy', 'name email')
      .sort('-createdAt');
    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single sale
// @route   GET /api/sales/:id
// @access  Private
exports.getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('customerId', 'name phone email')
      .populate('createdBy', 'name email');
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }
    res.status(200).json({
      success: true,
      data: sale
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create sale
// @route   POST /api/sales
// @access  Private
exports.createSale = async (req, res) => {
  try {
    const { customerId, items, paymentMethod } = req.body;

    // Calculate total and update stock
    let totalAmount = 0;
    const saleItems = [];

    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      saleItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    const sale = await Sale.create({
      customerId,
      items: saleItems,
      totalAmount,
      paymentMethod,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: sale
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
