import { Link } from "react-router-dom";

function FeatureCard({ title, description, emoji, link }) {

    return (

        <Link
            to={link}
            className="feature-link"
        >

            <div className="feature-card">

                <div className="emoji">
                    {emoji}
                </div>

                <h3>{title}</h3>

                <p>{description}</p>

            </div>

        </Link>

    );

}

export default FeatureCard;