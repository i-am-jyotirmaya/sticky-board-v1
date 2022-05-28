import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setProp } from "../../store";

const Appbar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="h-14 bg-purple-100 py-3">
      <div className="w-96 mx-auto">
        <Input.Group>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{ width: "calc(100% - 100px)" }}
            placeholder="Your name"
          />
          <Button
            type="primary"
            onClick={(e) => {
              setProp(name);
              navigate("/board");
            }}
          >
            Set
          </Button>
        </Input.Group>
      </div>
    </nav>
  );
};

export default Appbar;
