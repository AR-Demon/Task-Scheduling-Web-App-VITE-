import {Link} from "react-router-dom";

const HomePage = () => {
    return(
    <div>
        Home Page
        <Link to="/auth/login">Log In</Link>
    </div>);
};

export default HomePage;