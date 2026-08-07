function DashboardCard({ icon, title, value, description }) {

    return(

        <div className="dashboard-card">

            <div className="card-icon">
                {icon}
            </div>

            <h2>{title}</h2>

            <h1>{value}</h1>

            <p>{description}</p>

        </div>

    );

}

export default DashboardCard;