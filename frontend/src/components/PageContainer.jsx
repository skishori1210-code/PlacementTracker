function PageContainer({ title, children }) {
    return (
        <div
            style={{
                padding: "30px",
                maxWidth: "1200px",
                margin: "0 auto",
                color: "#F8FAFC"
            }}
        >
            <h1
                style={{
                    marginBottom: "25px",
                    fontWeight: "700"
                }}
            >
                {title}
            </h1>

            {children}
        </div>
    );
}

export default PageContainer;