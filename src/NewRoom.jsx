import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function NewRoom() {
  const nav = useNavigate();
    useEffect(() => {
        const id = uuid();
            nav(`/room/${id}`, { replace: true });
              }, [nav]);
                return (
                    <div className="wrap">
                          <div className="header"><div className="title">Creating room…</div></div>
                              </div>
                                );
                                }
