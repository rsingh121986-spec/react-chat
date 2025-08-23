import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import {
  collection, addDoc, serverTimestamp,
    query, orderBy, onSnapshot, limit
    } from "firebase/firestore";

    export default function ChatRoom({ user }) {
      const { roomId } = useParams();
        const [text, setText] = useState("");
          const [msgs, setMsgs] = useState([]);
            const bottomRef = useRef(null);

              useEffect(() => {
                  const q = query(
                        collection(db, "rooms", roomId, "messages"),
                              orderBy("createdAt", "asc"),
                                    limit(200)
                                        );
                                            const off = onSnapshot(q, (snap) => {
                                                  const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                                                        setMsgs(rows);
                                                              setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
                                                                  });
                                                                      return off;
                                                                        }, [roomId]);

                                                                          const send = async (e) => {
                                                                              e.preventDefault();
                                                                                  const t = text.trim();
                                                                                      if (!t) return;
                                                                                          await addDoc(collection(db, "rooms", roomId, "messages"), {
                                                                                                text: t,
                                                                                                      uid: user.uid,
                                                                                                            displayName: user.displayName ?? "You",
                                                                                                                  photoURL: user.photoURL ?? null,
                                                                                                                        createdAt: serverTimestamp()
                                                                                                                            });
                                                                                                                                setText("");
                                                                                                                                  };

                                                                                                                                    return (
                                                                                                                                        <div className="wrap">
                                                                                                                                              <div className="header">
                                                                                                                                                      <div className="title">
                                                                                                                                                                Room #{roomId.slice(0, 6)}
                                                                                                                                                                          <div className="subtitle">Share this URL so a friend joins this room.</div>
                                                                                                                                                                                  </div>
                                                                                                                                                                                        </div>

                                                                                                                                                                                              <div className="messages">
                                                                                                                                                                                                      {msgs.map(m => {
                                                                                                                                                                                                                const mine = m.uid === user.uid;
                                                                                                                                                                                                                          return (
                                                                                                                                                                                                                                      <div key={m.id} className={`row ${mine ? "right" : "left"}`}>
                                                                                                                                                                                                                                                    <div className={`bubble ${mine ? "mine" : "theirs"}`}>
                                                                                                                                                                                                                                                                    <div>{m.text}</div>
                                                                                                                                                                                                                                                                                    <div className="meta">
                                                                                                                                                                                                                                                                                                      <span>{mine ? "You" : (m.displayName || "Friend")}</span>
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                  })}
                                                                                                                                                                                                                                                                                                                                                                          <div ref={bottomRef} />
                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                      <form className="composer" onSubmit={send}>
                                                                                                                                                                                                                                                                                                                                                                                              <input
                                                                                                                                                                                                                                                                                                                                                                                                        value={text}
                                                                                                                                                                                                                                                                                                                                                                                                                  onChange={(e) => setText(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                            placeholder="Type a message…"
                                                                                                                                                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                                                                                                                                                            <button type="submit">Send</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
