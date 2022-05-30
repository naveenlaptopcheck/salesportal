import React from "react";
import { connect } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { CLOSE_WHATS_NEW } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";
import WhatsNewSingle from "./WhatsNewSingle";
//import DashLoader from "../pages/dashboard/contents/DashLoader";

const WhatsNew = ({ whtsNewOpen , handleCloseWhtsNew , apiDash = {} }) => {
  let size = Object.keys(apiDash).length;
  //console.log(apiDash);
  let { whats_new } = apiDash;
  //console.log(whats_new);
  let categ = Object.keys(whats_new);
  let updates = Object.values(whats_new);
  //console.log(categ, updates);
  const wh_new = categ.map((category, i) => {
    return { id: uuidv4(), category: category, updates: updates[i] };
  });
  //console.log(wh_new);
  return (
    <div className={whtsNewOpen ? "whats-new-wrap active" : "whats-new-wrap"}>
      <header>
        <div className="whn-head">
          <h4>What's New</h4>
          <AiOutlineClose className="whn-close" onClick={handleCloseWhtsNew} />
        </div>
      </header>
      {/* {size===0?<DashLoader/>:} */}
      <div className="updates-container">
        {wh_new.map((item) => {
          let { id, category, updates } = item;
          return (
            <WhatsNewSingle
              key={id}
              category={category}
              updates={updates}
              apiDash={apiDash}
            />
          );
        })}
      </div>
    </div>
  );
};
//Redux
const mapStateToProps = (state) => {
  
  const { apiDash } = state.recordReducer;
  return { apiDash };
};

// const mapStateToProps = (state) => {
//   //const { whtsNewOpen } = state.reducer;
//   const { apiDash } = state.recordReducer;
//   return { whtsNewOpen, apiDash };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseWhtsNew: () => {
      dispatch({ type: CLOSE_WHATS_NEW });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);
