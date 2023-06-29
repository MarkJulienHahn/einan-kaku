import Link from "next/link";

const Cookie = ({ onAccept, onDecline }) => {
  return (
    <div>
      This website uses cookies. Protecting your privacy and personal data is
      important to us, which is why we want to inform you about our use of
      cookies in compliance with the General Data Protection Regulation (GDPR).
      <br />
      <br />
      If you do not wish to allow any cookies, please click »Decline«. Please
      note that this may limit the functionality of the website.
      <br />
      <br />
      <div className="cookieButtonWrapper">
        <div style={{ textDecoration: "underline" }} onClick={onAccept}>
          Accept
        </div>
        <div onClick={onDecline}>Decline</div>
        <div onClick={onDecline}>
          <Link href="/legals">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
