import React, { Fragment, useState } from "react";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";

const editableHeader = props => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [hidden, setHidden] = useState(true);
  const toggleDeleteMode = event => {
    event.preventDefault();
    setDeleteMode(!deleteMode);
  };
  return (
    <Fragment>
      <div onContextMenu={toggleDeleteMode}>
        {deleteMode ? (
          <Button onMouseOut={toggleDeleteMode} onClick={props.onClick}>
            Eliminar
          </Button>
        ) : (
          <div>{props.children}</div>
        )}
      </div>
      <Modal title={"Editar tipo de area"} hidden={hidden} />
    </Fragment>
  );
};

export default editableHeader;
