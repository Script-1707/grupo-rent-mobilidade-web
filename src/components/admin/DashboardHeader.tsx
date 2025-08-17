const DashboardHeader = ({ title, subtitle }) => (
  <>
    <h1 className="text-3xl font-bold text-secondary mb-2">{title}</h1>
    <p className="text-muted-foreground mb-8">{subtitle}</p>
  </>
);

export default DashboardHeader;
