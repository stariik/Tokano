export default function ResultsDisplay({ filledData }) {
  if (!filledData) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">
        <p>
          No data filled yet. Select and fill a fund form to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Filled Data Result
      </h3>
      <div className="bg-white rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="font-semibold text-gray-700">Type:</span>
          <span className="text-indigo-600 font-bold">{filledData.type}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="font-semibold text-gray-700">Created:</span>
          <span className="text-gray-600">{filledData.createdAt}</span>
        </div>

        {Object.entries(filledData).map(([key, value]) => {
          if (key === "type" || key === "createdAt") return null;
          return (
            <div
              key={key}
              className="flex justify-between items-center pb-2 border-b border-gray-100"
            >
              <span className="font-semibold text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
