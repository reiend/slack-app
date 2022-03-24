import React from "react";
import "./ChannelTab.scss";

const ChannelTab = ({
  channel,
  onClickChannelInfoExpand,
  isExpanded,
  onClickCloseChannelExpand,
  expandedInfo,
  onClickAdd,
}) => {

  return (
    <div
      className={
        !isExpanded
          ? "channel-info-container"
          : "channel-info-container channel-info-container-expanded"
      }
    >
      <nav
        className={
          !isExpanded ? "channel-info" : "channel-info channel-info-expanded"
        }
        aria-label="channel-Info"
      >
        {Object.keys(channel).map((type) => (
          <h2
            className="channel-type"
            onClick={onClickChannelInfoExpand}
            key={type}
            id={type}
          >
            {type} channel
          </h2>
        ))}
      </nav>
      {isExpanded && (
        <ul className="channel-name-container"> {expandedInfo} </ul>
      )}
      {isExpanded && ( 
        <span
          className="close-channel-expand"
          onClick={onClickCloseChannelExpand}
        >
          ⨉
        </span>
      )}
      {isExpanded && (
        <span className="add-channel" onClick={onClickAdd}>
          +
        </span>
      )}
    </div>
  );
};

export default ChannelTab;
