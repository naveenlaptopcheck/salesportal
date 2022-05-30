import { React, useState } from "react";

import Switch from "@mui/material/Switch";

function SwitchUser() {
  const [stat, setStat] = useState(false);
  return (
    <Switch
      className="Button"
      checked={stat}
      onClick={() => {
        setStat(!stat);
      }}
      inputProps={{ "aria-label": "controlled" }}
      size="small"
    />
  );
}

export default SwitchUser;
