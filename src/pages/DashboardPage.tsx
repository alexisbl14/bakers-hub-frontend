import { Link } from "react-router-dom";

const DashboardPage = () => {
    return(
        <>
            <p>Welcome!</p>
            <Link to="/inventory">Go to Inventory</Link>
        </>
    )
}

export default DashboardPage;