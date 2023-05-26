import React from "react";

const Contact = ({ contact }) => {
  console.log(contact);
  return (
    <div className="contactWrapper">
      {contact.map((contact, i) => (
        <div key={i} className="contactInner">
          <div className="italic">{contact.beschreibung}</div>
          <a href={`mailto:${contact.mailadresse}`}>{contact.mailadresse}</a>
        </div>
      ))}
    </div>
  );
};

export default Contact;
