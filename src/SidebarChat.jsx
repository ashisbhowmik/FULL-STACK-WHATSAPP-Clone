import React, { useState, useEffect } from "react";
import "./sidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [pic, setPic] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    setPic(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please Add a RoomName");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <>
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
          <Avatar
            className="avatar"
            src={`https://avatars.dicebear.com/api/female/${pic}.svg`}
            alt="image not found"
          />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    </>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2
        style={{
          color: "green",
          fontFamily: "cursive",
          textAlign: "center",
          marginLeft: "18px",
        }}
      >
        Add New Chat
      </h2>
    </div>
  );
};

export default SidebarChat;
