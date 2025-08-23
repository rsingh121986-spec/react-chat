import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import ChatRoom from "./ChatRoom";
import NewRoom from "./NewRoom";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => onAuthStateChanged(auth, (u) => {
          setUser(u || null);
              setLoading(false);
                }), []);

                  if (loading) return <div className="wrap"><div className="header"><div className="title">Loading…</div></div></div>;

                    return (
                        <BrowserRouter>
                              <Routes>
                                      <Route path="/login" element={user ? <Navigate to="/new" replace /> : <Login />} />
                                              <Route path="/new" element={user ? <NewRoom /> : <Navigate to="/login" replace />} />
                                                      <Route path="/room/:roomId" element={user ? <ChatRoom user={user} /> : <Navigate to="/login" replace />} />
                                                              <Route path="*" element={<Navigate to={user ? "/new" : "/login"} replace />} />
                                                                    </Routes>
                                                                        </BrowserRouter>
                                                                          );
                                                                          }
