import React, { useState, useEffect, useCallback } from "react";
import DirectMessage from "@components/DirectMessage.jsx";
import CreateChannel from "@components/CreateChannel.jsx";
import ChannelTab from "@components/ChannelTab.jsx";
import ChatBox from "@components/ChatBox.jsx";
import Navbar  from "@components/Navbar.jsx";
import Backdrop  from "@components/Backdrop.jsx";
import {CHANNEL_ID, CHANNEL_NAME, CHANNEL_MESSAGES} from "@globals/constants.js"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Chat.scss";

const Chat = ({ accessToken, client, expiry, uid}) => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState({
    text: [],
    voice: [],
    direct: [],
  });

  const [channelTypeRender, setChannelTypeRender] = useState("text");
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [isExpanded, setIsExpended] = useState(false);

  // state for adding channel or friend
  const [isAdding, setIsAdding] = useState(false);

  const onClickChannelInfoExpand = (evt) => {
    setIsExpended(true);
    setChannelTypeRender(evt.target.id);

    const FIRST_WORD = 0;
    const channelType = evt.target.innerText
      .split(" ")
      [FIRST_WORD].toLowerCase();
    const channelInfos = channel[channelType];

    setExpandedInfo(
      channelInfos.map((channelInfo, i) => (
        <li
          className="channel-name"
          key={channelInfo[0] + channelInfo[1] + `${i}`}
        >
          <a href={`#${channelInfo[0]}`}>#{channelInfo[1]}</a>{" "}
        </li>
      ))
    );
  };

  const onClickSignout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("id");
    navigate("/");
  };

  const onClickCloseChannelExpand = () => setIsExpended(false);

  const getChannels = useCallback(async () => {
    await axios({
      method: "GET",
      url: `${process.env.BASEURL}channels?`,
      headers: {
        ["access-token"]: accessToken,
        ["client"]: client,
        ["expiry"]: expiry,
        ["uid"]: uid,
      },
    }).then((res) => {
      const datas = res.data.data;

      setChannel((prevChannel) => {
        prevChannel.text = [];
        return { ...prevChannel };
      });

      // get channels messages information
      if (datas) {
        datas.forEach(async (data) => {
          let channelMessages = [];
          const { id: channelID, name } = data;
          await axios({
            method: "GET",
            url: `${process.env.BASEURL}messages?receiver_id=${channelID}&receiver_class=Channel`,
            headers: {
              ["access-token"]: accessToken,
              ["client"]: client,
              ["expiry"]: expiry,
              ["uid"]: uid,
            },
          }).then((res) => {
            const datas = res.data.data;

            // skip no channel
            if (datas.length) {
              channelMessages = datas;
            }
          });

          // store channel inforation on state
          setChannel((prevChannel) => {
            const newChannelInfo = [channelID, name, channelMessages];
            prevChannel.text.push(newChannelInfo);
            return { ...prevChannel };
          });
        });
      }
    });
  }, [channel.text.length]);

  const onSubmitSendChannelMessage = useCallback(async (evt) => {
    evt.preventDefault();
    const target = evt.target;

    const message = target["message-input"].value;
    const channelID = target["message-input"]
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .id;

    const USE_CHANNEL_NAME = 0;

    const channelName = target["message-input"]
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .children[USE_CHANNEL_NAME].innerText;

    await axios({
      method: "POST",
      url: `${process.env.BASEURL}messages?receiver_id=${channelID}&receiver_class=Channel&body=${message}`,
      headers: {
        ["access-token"]: localStorage.getItem("access-token"),
        ["client"]: localStorage.getItem("client"),
        ["expiry"]: localStorage.getItem("expiry"),
        ["uid"]: localStorage.getItem("uid"),
      },
    })


    getChannels();

    // clear message input to enter new message
    evt.target["message-input"].value = "";

  });

  // fetching of directe messages
  const getDirects = () => {
    const userID = localStorage.getItem("id");
    if (userID) {
      axios({
        method: "GET",
        url: `${process.env.BASEURL}messages?receiver_id=${userID}&receiver_class=User`,
        headers: {
          ["access-token"]: localStorage.getItem("access-token"),
          ["client"]: localStorage.getItem("client"),
          ["expiry"]: localStorage.getItem("expiry"),
          ["uid"]: localStorage.getItem("uid"),
        },
      }).then((res) => {
        if (res.data.data !== undefined) {
          const receiver = [];
          res.data.data.forEach((data) => {
            receiver.push([data.receiver.uid, data.id, [data.body]]);
          });
          setChannel((prevChannel) => ({ ...prevChannel, direct: receiver }));
        }
      });
    }
  };

  const onSubmitAdd = async (evt) => {
    evt.preventDefault();
    const channelName = evt.target["add-channel"].value;
    const user = evt.target["add-user"].value;

    try {
      await axios({
        method: "POST",
        url: `${process.env.BASEURL}channels?name=${channelName}&user_ids=[${user}]`,
        mode: "no-cors",
        headers: {
          ["access-token"]: localStorage.getItem("access-token"),
          ["client"]: localStorage.getItem("client"),
          ["expiry"]: localStorage.getItem("expiry"),
          ["uid"]: localStorage.getItem("uid"),
        },
      }).catch(() => {
        getChannels();
      });
    } catch (err) {
      getChannels();
    }
  };

  const onClickAdd = () => setIsAdding(true);
  const onClickCancelAdd = () => setIsAdding(false);

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <main className="chat">

      {/* for navigating friends, settings and signout */}
      <Navbar onClickSignout={onClickSignout}/>

      {/* where chatting/usapp lies */}
      <ChatBox
        channel={channel}
        channelTypeRender={channelTypeRender}
        onSubmitSendChannelMessage={onSubmitSendChannelMessage}
      />

      {/* Channel information tab */}
      <ChannelTab
        channel={channel}
        onClickChannelInfoExpand={onClickChannelInfoExpand}
        isExpanded={isExpanded}
        onClickCloseChannelExpand={onClickCloseChannelExpand}
        expandedInfo={expandedInfo}
        onClickAdd={onClickAdd}
      />

      {/* form for adding channels and friends*/}
      {isAdding && channelTypeRender === "text" && (
        <CreateChannel
          onSubmitAdd={onSubmitAdd}
          onClickCancelAdd={onClickCancelAdd}
        />
      )}

      {/* sending direct messages */}
      {isAdding && channelTypeRender === "direct" && (
        <DirectMessage
          onClickCancelAdd={onClickCancelAdd}
          setChannel={setChannel}
          channel={channel}
          getDirects={getDirects}
        />
      )}


      {/* backdrop for modals*/}
      {isAdding && <Backdrop/> }
    </main>
  );
};

export default Chat;
