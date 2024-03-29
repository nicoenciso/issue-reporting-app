import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function NewIssue() {
  return (
    <div className="mx-auto mb-3">
      <Link to="/newticket">
        <Button
          variant="light"
          style={{
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          <strong>New Issue +</strong>
        </Button>
      </Link>
    </div>
  );
}
