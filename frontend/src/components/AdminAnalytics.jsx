import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminAnalytics = ({ stats }) => {
    if (!stats?.salesOverTime || !stats?.topProducts) {
        return <div className="text-secondary text-center">No sufficient data for analytics yet.</div>;
    }

    // Prepare Sales Data
    const salesLabels = stats.salesOverTime.map(item => item._id);
    const salesData = stats.salesOverTime.map(item => item.totalRevenue);

    const salesChartData = {
        labels: salesLabels,
        datasets: [
            {
                label: 'Revenue ($)',
                data: salesData,
                backgroundColor: 'rgba(137, 85, 117, 0.6)', // accent color with opacity
                borderColor: 'rgba(137, 85, 117, 1)',
                borderWidth: 1,
            },
        ],
    };

    const salesChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue (Last 7 Days)',
            },
        },
    };

    // Prepare Top Products Data
    const productLabels = stats.topProducts.map(item => item.name);
    const productData = stats.topProducts.map(item => item.totalSold);

    const productChartData = {
        labels: productLabels,
        datasets: [
            {
                label: '# of Sales',
                data: productData,
                backgroundColor: [
                    'rgba(30, 2, 51, 0.6)',   // primary
                    'rgba(52, 45, 80, 0.6)',  // secondary
                    'rgba(137, 85, 117, 0.6)', // accent
                    'rgba(231, 211, 204, 0.6)', // light
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(30, 2, 51, 1)',
                    'rgba(52, 45, 80, 1)',
                    'rgba(137, 85, 117, 1)',
                    'rgba(231, 211, 204, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-primary">Analytics Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <Bar options={salesChartOptions} data={salesChartData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex justify-center">
                    <div className="w-full max-w-sm">
                        <Pie data={productChartData} />
                        <h4 className="text-center mt-4 font-bold text-secondary">Top Selling Products</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
