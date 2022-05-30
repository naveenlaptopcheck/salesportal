import React from "react";
import { v4 as uuidv4 } from "uuid";

const WhatsNewSingle = ({ category, updates, apiDash }) => {
  return (
    <div className="update-tile">
      <h4 style={{ textTransform: "uppercase" }}>{category}</h4>
      <p className="head-line">
        Much awaited! Create reports for your products
      </p>
      <ul>
        {updates.map((update) => {
          return (
            <li key={uuidv4()}>
              <p>{update}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WhatsNewSingle;
