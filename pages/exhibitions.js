import React from "react";
import client from "@/client";

import About from "../Components/About";

const exhibitions = ({ showAbout, setShowAbout, exhibitions, about }) => {
  const heute = new Date();

  const converted = (date) =>
    `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getUTCDate()} ${date.getUTCFullYear()} `;

  const isCurrent = (ex) =>
    new Date(ex.beginning) < heute && new Date(ex.end) > heute;

  const isUpcoming = (ex) => new Date(ex.beginning) > heute;

  const isPast = (ex) => new Date(ex.end) < heute;

  console.log(exhibitions.some(isCurrent));

  return (
    <>
      {showAbout && <About setShowAbout={setShowAbout} about={about} />}
      <div className="exhibitionsWrapper">
        <div>
          {exhibitions.some(isCurrent) && (
            <>
              <span className="exhibitionHeader">Current</span>
              {exhibitions.map(
                (ex, i) =>
                  new Date(ex.beginning) < heute &&
                  new Date(ex.end) > heute && (
                    <div key={i} className="exhibitionInner">
                      <div>
                        {converted(new Date(ex.beginning))} –{" "}
                        {converted(new Date(ex.end))}
                      </div>

                      {ex.link ? (
                        <>
                          <a
                            href={ex.link}
                            target="_blank"
                            rel="noreferrer"
                            className="italicLink"
                          >
                            {ex.name}
                          </a>
                          , {ex.location} &#8599;
                        </>
                      ) : (
                        <>
                          <div className="italic">{ex.name}</div>, {ex.location}
                        </>
                      )}
                    </div>
                  )
              )}
            </>
          )}
        </div>

        <div>
          {exhibitions.some(isUpcoming) && (
            <>
              <span className="exhibitionHeader">Upcoming</span>
              {exhibitions.map(
                (ex, i) =>
                  new Date(ex.beginning) > heute &&
                  new Date(ex.end) > heute && (
                    <div key={i} className="exhibitionInner">
                      <div>
                        {converted(new Date(ex.beginning))} –
                        {converted(new Date(ex.end))}
                      </div>

                      {ex.link ? (
                        <>
                          <a
                            href={ex.link}
                            target="_blank"
                            rel="noreferrer"
                            className="italicLink"
                          >
                            {ex.name}
                          </a>
                          , {ex.location} &#8599;
                        </>
                      ) : (
                        <>
                          <div className="italic">{ex.name}</div>, {ex.location}
                        </>
                      )}
                    </div>
                  )
              )}
            </>
          )}
        </div>

        <div>
          {exhibitions.some(isPast) && (
            <>
              <span className="exhibitionHeader">Past</span>
              {exhibitions.map(
                (ex, i) =>
                  new Date(ex.beginning) < heute &&
                  new Date(ex.end) < heute && (
                    <div key={i} className="exhibitionInner">
                      <div>
                        {converted(new Date(ex.beginning))} –{" "}
                        {converted(new Date(ex.end))}
                      </div>

                      {ex.link ? (
                        <>
                          <a
                            href={ex.link}
                            target="_blank"
                            rel="noreferrer"
                            className="italicLink"
                          >
                            {ex.name}
                          </a>
                          , {ex.location} &#8599;
                        </>
                      ) : (
                        <>
                          <span className="italic">{ex.name}</span>,{" "}
                          {ex.location}
                        </>
                      )}
                    </div>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default exhibitions;

export async function getServerSideProps() {
  const exhibitions = await client.fetch(`
      * [_type == "exhibitions"]|order(orderRank){...}`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      exhibitions,
      about,
    },
  };
}
