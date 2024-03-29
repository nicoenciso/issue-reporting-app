import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmationTicketModal from "./ConfirmationTicketModal";

export default function TicketButton({ handleClick, variant, name }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        className="mt-5"
        onClick={() => setModalShow(true)}
      >
        {name}
      </Button>
      <ConfirmationTicketModal
        name={name}
        variant={variant}
        handleclick={handleClick}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
