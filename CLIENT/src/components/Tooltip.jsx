/* eslint-disable react/prop-types */
import { useState } from "react";

function Tooltip({children,text}) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
      setShowTooltip(true);
    };
  
    const handleMouseLeave = () => {
      setShowTooltip(false);
    };
  
    return (
      <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
        {showTooltip && <div className="tooltip">{text}</div>}
      </div>
    );
}

export default Tooltip;