import { PortableText } from "@portabletext/react";

import Link from "next/link";

const About = ({ about, setShowAbout }) => {
  return (
    <>
      <div className="aboutHeadBackground"></div>
      <div className="aboutMobileCloseButton" onClick={() => setShowAbout(false)}>Back</div>
      <div className="aboutOuter">
        <div className="aboutWrapper">
          <div className="aboutSection">
            <PortableText value={about[0].beschreibung} />
          </div>
          <div className="aboutSection">
            <PortableText value={about[0].vitaHeader} />
          </div>
          <ul className="aboutSection">
            <li>Vita</li>
            {about[0].vita.map((entry, i) => (
              <li key={i}>
                <span className="aboutJahr">{entry.jahr}</span>
                <span className="aboutBeschreibung">{entry.beschreibung}</span>
              </li>
            ))}
          </ul>
          <ul className="aboutSection">
            <li>Awards & Scholarships</li>
            {about[0].awards.map((entry, i) => (
              <li key={i}>
                <span className="aboutJahr">{entry.jahr}</span>
                <span className="aboutBeschreibung">{entry.beschreibung}</span>
              </li>
            ))}
          </ul>
          <ul className="aboutSection">
            <li>Solo Exhibitions</li>
            {about[0].soloExhibitions.map((entry, i) => (
              <li key={i}>
                <span className="aboutJahr">{entry.jahr}</span>
                <span className="aboutBeschreibung">{entry.beschreibung}</span>
              </li>
            ))}
          </ul>
          <ul className="aboutSection">
            <li>Group Exhibitions</li>
            {about[0].groupExhibitions.map((entry, i) => (
              <li key={i}>
                <span className="aboutJahr">{entry.jahr}</span>
                <span className="aboutBeschreibung">{entry.beschreibung}</span>
              </li>
            ))}
          </ul>
          <div>
            © {new Date().getFullYear()} Einan Kaku,{" "}
            <Link href="/legals">Legals</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
