import React, { useState, useEffect, forwardRef } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import FlipMove from "react-flip-move";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [pic, setPic] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setPic(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <Avatar
            className="avatar"
            src={`https://avatars.dicebear.com/api/male/${pic}.svg`}
            alt="image not found"
          />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            {/* <p>last seen - </p>
            {
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate().toUTCString()
              )
            } */}
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          <FlipMove>
            {messages.map((message, index) => (
              <p
                key={index}
                className={`chat__message ${
                  message.name === user.displayName && "chat__receiver"
                }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                  {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
                  {new Date().toLocaleString()}
                </span>
              </p>
            ))}
          </FlipMove>
        </div>

        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form>
            <input
              type="text"
              onChange={inputChange}
              value={input}
              placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send a message</button>
          </form>
          <MicIcon />
        </div>
      </div>
    </>
  );
};

export default Chat;
