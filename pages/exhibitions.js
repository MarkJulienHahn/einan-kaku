import React from "react";
import client from "@/client";

import About from "../Components/About";
import Image from "next/image";

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
              <span className="exhibitionHeader">
                Current
                <br />
                <br />
              </span>
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

                      {ex.image && (
                        <div className="exhibitionImage">
                          <div>
                            <Image
                              src={ex.image.asset.url}
                              width={300}
                              height={400}
                              style={{
                                objectFit: "contain",
                                objectPosition: "left top",
                              }}
                            ></Image>
                          </div>
                        </div>
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
              <span className="exhibitionHeader">
                Upcoming
                <br />
                <br />
              </span>
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
                        <p>
                          <span className="italic">{ex.name}</span>,{" "}
                          {ex.location}
                        </p>
                      )}

                      {ex.image.asset && (
                        <div className="exhibitionImage">
                          <div>
                            <Image
                              src={ex.image.asset.url}
                              width={300}
                              height={400}
                              style={{
                                objectFit: "contain",
                                objectPosition: "left top",
                              }}
                            ></Image>
                          </div>
                        </div>
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
              <span className="exhibitionHeader">
                Past
                <br />
                <br />
              </span>
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
                        <p>
                          <span className="italic">{ex.name}</span>,{" "}
                          {ex.location}
                        </p>
                      )}

                      {ex.image.asset?.url && (
                        <div className="exhibitionImage">
                          <div>
                            <Image
                              src={ex.image.asset?.url}
                              width={300}
                              height={400}
                              style={{
                                objectFit: "contain",
                                objectPosition: "left top",
                              }}
                            ></Image>
                          </div>
                        </div>
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
  * [_type == "exhibitions"]|order(orderRank){..., "image": image{..., "asset": asset->{...}}}`);
  const about = await client.fetch(`
  * [_type == "about"]`);
  return {
    props: {
      exhibitions,
      about,
    },
  };
}
