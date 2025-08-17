const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-lg font-bold">{label}</h2>
    <p className="text-3xl font-bold text-primary mt-2">{value}</p>
  </div>
);

export default StatCard;
