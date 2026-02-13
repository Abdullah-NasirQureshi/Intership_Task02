const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        // Get total counts
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await Customer.countDocuments();
        const totalSales = await Sale.countDocuments();

        // Calculate total revenue
        const sales = await Sale.find();
        const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalCustomers,
                totalSales,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
