function DashboardCard({ title, value, color }) {
    return (
        <div
            style={{
                background: "#1E293B",
                borderLeft: `6px solid ${color}`,
                borderRadius: "12px",
                padding: "25px",
                minWidth: "220px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.35)"
            }}
        >
            <h2
                style={{
                    fontSize: "40px",
                    color: color,
                    marginBottom: "10px"
                }}
            >
                {value}
            </h2>

            <p
                style={{
                    color: "#CBD5E1",
                    fontSize: "18px"
                }}
            >
                {title}
            </p>
        </div>
    );
}

export default DashboardCard;