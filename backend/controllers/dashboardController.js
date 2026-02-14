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

        // Sales over time (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesOverTime = await Sale.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Top 5 selling products
        const topProducts = await Sale.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.productId",
                    name: { $first: "$items.productName" }, // Assuming productName is saved in sale items, if not we need $lookup
                    totalSold: { $sum: "$items.quantity" }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $project: {
                    name: { $ifNull: ["$name", { $arrayElemAt: ["$productDetails.name", 0] }] },
                    totalSold: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalCustomers,
                totalSales,
                totalRevenue,
                salesOverTime,
                topProducts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
