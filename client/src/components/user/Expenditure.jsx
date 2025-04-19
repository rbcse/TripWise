import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const Expenditure = ({ trip }) => {
    const data = trip.trip_sequence.map((item, index) => ({
      name: item.name || `Item ${index + 1}`,
      Budget: item.budget || 0,
      Expense: item.expense || 0,
    }));
  
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Expenditure for {trip.trip_name}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default Expenditure;
  