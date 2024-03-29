import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Table } from "react-bootstrap";
import useAxiosGet from "../services/ServiceAxiosGet";
import { useAuth0 } from "@auth0/auth0-react";
import { originalColors } from "../Utilities/originalColors";
import TBodyUser from "./TBodyUser";
import THeadAll from "./THeadAll";
import ResetTableButton from "./ResetTableButton";
import { useNavigate } from "react-router-dom";

export default function IssuesTableList({ userId, userRole }) {
  const [filteredData, setFilteredData] = useState(null);
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState();
  const { user } = useAuth0();
  const role = user["https://my-app/roles"][0];
  const param = role === "Support" ? "support" : "user";
  const navigate = useNavigate();

  const [data] = useAxiosGet(
    `${process.env.REACT_APP_SERVICE_API}/ticket/${
      userId ? userId : user.sub
    }/${userRole ? userRole : param}`
  );

  if (!data) {
    navigate("/notfound");
  }

  const [filterColor, setFilterColor] = useState(originalColors);

  const handleOpenSelect = (date) => {
    let filtered = data.filter((issue) => {
      let issueOpenDate = new Date(issue.Open);
      return (
        issueOpenDate >= date.selection.startDate &&
        issueOpenDate <= date.selection.endDate
      );
    });
    setSelectionRange([date.selection]);
    setFilteredData(filtered);
    setFilterColor({
      ...originalColors,
      Open: "text-light",
    });
    setValue("Open");
  };

  const handleClosedSelect = (date) => {
    let filtered = data.filter((issue) => {
      let issueClosedDate = new Date(issue.Closed);
      return (
        issueClosedDate >= date.selection.startDate &&
        issueClosedDate <= date.selection.endDate
      );
    });
    setSelectionRange([date.selection]);
    setFilteredData(filtered);
    setFilterColor({
      ...originalColors,
      Closed: "text-light",
    });
    setValue("Closed");
  };

  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  return (
    <div
      className="container-fluid bg-dark mb-3"
      style={{ overflow: "auto", minHeight: "300px", maxHeight: "500px" }}
    >
      <div style={{ height: "50px" }}>
        {value && (
          <ResetTableButton
            setFilteredData={setFilteredData}
            setValue={setValue}
            setFilterColor={setFilterColor}
          />
        )}
      </div>
      <Table bordered hover variant="dark" className="mb-2">
        <THeadAll
          data={data}
          setValue={setValue}
          filterColor={filterColor}
          setFilter={setFilter}
          setFilterColor={setFilterColor}
          handleOpenSelect={handleOpenSelect}
          handleClosedSelect={handleClosedSelect}
          selectionRange={selectionRange}
          role={role}
          userId={userId}
        />
        <TBodyUser
          data={data}
          value={value}
          filter={filter}
          filteredData={filteredData}
        />
      </Table>
    </div>
  );
}
