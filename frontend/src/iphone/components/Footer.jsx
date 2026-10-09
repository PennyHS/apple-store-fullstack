import { Link } from 'react-router-dom';
import { footerLinks, CREDIT_URL } from '../../footerContent';

const FooterLink = ({ link }) =>
  link.to ? (
    <Link to={link.to} className="hover:text-white">{link.label}</Link>
  ) : (
    <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
      {link.label}
    </a>
  );

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray text-xs">
            Portfolio demo. Not affiliated with or endorsed by Apple Inc. Product names and images
            belong to their respective owners.
          </p>
          <p className="font-semibold text-gray text-xs">
            Payments run in Stripe test mode, so no real orders or charges.
          </p>
          <p className="font-semibold text-gray text-xs">
            Frontend UI based on{' '}
            <a href={CREDIT_URL} target="_blank" rel="noreferrer" className="underline hover:text-white">
              JavaScript Mastery
            </a>{' '}
            tutorials. Backend, database, payments and integration built by Penny Hsiao.
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between gap-3">
          <p className="font-semibold text-gray text-xs">
            © 2026 Penny Hsiao · Built with React, Express, PostgreSQL & Stripe
          </p>
          <div className="flex flex-wrap">
            {footerLinks.map((link, i) => (
              <span key={link.label} className="font-semibold text-gray text-xs">
                <FooterLink link={link} />
                {i !== footerLinks.length - 1 && <span className="mx-2">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;