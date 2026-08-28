function StatusBadge({ status }) {

    let color = "#3B82F6";

    if (status === "SELECTED") color = "#22C55E";
    else if (status === "REJECTED") color = "#EF4444";
    else if (status === "SHORTLISTED") color = "#F59E0B";

    return (
        <span
            style={{
                background: color,
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold"
            }}
        >
            {status}
        </span>
    );
}

export default StatusBadge;