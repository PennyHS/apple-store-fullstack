import { Link } from "react-router-dom";
import { footerLinks, CREDIT_URL } from "../footerContent";

const FooterLink = ({ link }) =>
    link.to ? (
        <Link to={link.to}>{link.label}</Link>
    ) : (
        <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
    );

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <div className="flex flex-col gap-1">
                    <p>Portfolio demo. Not affiliated with or endorsed by Apple Inc. Product names and images belong to their respective owners.</p>
                    <p>Payments run in Stripe test mode, so no real orders or charges.</p>
                    <p>
                        Frontend UI based on
                        <span><a href={CREDIT_URL} target="_blank" rel="noreferrer"> JavaScript Mastery </a></span>
                        tutorials. Backend, database, payments and integration built by Penny Hsiao.
                    </p>
                </div>
                <img src="/logo.svg" alt="Logo" />
            </div>

            <hr />

            <div className="links">
                <p>© 2026 Penny Hsiao · Built with React, Express, PostgreSQL & Stripe</p>

                <ul>
                    {footerLinks.map((link) => (
                        <li key={link.label}>
                            <FooterLink link={link} />
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;