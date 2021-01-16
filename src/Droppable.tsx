import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "darkBlue" : "Red",
  };
  return (
    <div className="todolist" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;
