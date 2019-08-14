import React, { useState } from "react";
import Button from "../../UI/Button/Button";

const EditableHeader = props => {
  const [deleteMode, setDeleteMode] = useState(false);
  const toggleDeleteMode = event => {
    event.preventDefault();
    setDeleteMode(!deleteMode);
  };
  return (
    <div onContextMenu={!props.canBeDeleted ? toggleDeleteMode : null}>
      {deleteMode ? (
        <Button onMouseOut={toggleDeleteMode} onClick={props.onClick}>
          Eliminar
        </Button>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
};

export default EditableHeader;
