import TrendingThreatsChart from "@/components/infographics/TrendingThreatsChart";
import fs from 'fs';
import path from 'path';

type AnalysisRecord = {
    id: number;
    timestamp: string;
    scamType: string;
    keywords: string[];
    reason: string;
};

type DbData = {
    analyses: AnalysisRecord[];
};

async function getThreatData(): Promise<DbData> {
    const dbPath = path.resolve(process.cwd(), 'db.json');
    try {
        if (fs.existsSync(dbPath)) {
            const fileContent = fs.readFileSync(dbPath, 'utf-8');
            if (fileContent) { // Ensure content is not empty
                const data = JSON.parse(fileContent);
                // Check if the parsed data has the 'analyses' property and it is an array
                if (data && Array.isArray(data.analyses)) {
                    return data;
                }
            }
        }
    } catch (error) {
        console.error('Error reading or parsing db.json:', error);
    }
    // Return a default structure if the file doesn't exist, is empty, or malformed.
    return { analyses: [] };
}


export default async function AdminDashboard() {
    const { analyses } = await getThreatData();

    const totalReports = analyses.length;
    const scamTypeCounts = analyses.reduce((acc, analysis) => {
        acc[analysis.scamType] = (acc[analysis.scamType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                        Threat Intelligence Dashboard
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                    Real-time insights from user-submitted data.
                </p>
            </header>

            <main className="space-y-12">
                {/* Key Metrics */}
                <section className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h3 className="text-4xl font-bold text-blue-600">{totalReports}</h3>
                        <p className="text-gray-600 mt-1">Total Reports</p>
                    </div>
                    {Object.entries(scamTypeCounts).map(([type, count]) => (
                         <div key={type} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                           <h3 className="text-4xl font-bold text-orange-600">{count}</h3>
                           <p className="text-gray-600 mt-1">{type}</p>
                         </div>
                    ))}
                </section>
                
                {/* Visualizations */}
                <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Trending Threats</h2>
                    <TrendingThreatsChart />
                </section>

                {/* Data Table */}
                <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Suspicious Activity Log</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Timestamp</th>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Scam Type</th>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analyses.length > 0 ? (
                                    analyses.map((analysis) => (
                                        <tr key={analysis.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-700">{new Date(analysis.timestamp).toLocaleString()}</td>
                                            <td className="px-4 py-3 text-gray-700">{analysis.scamType}</td>
                                            <td className="px-4 py-3 text-gray-700">{analysis.reason}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center py-8 text-gray-500">
                                            No suspicious activity recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
