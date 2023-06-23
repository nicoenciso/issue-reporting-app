import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useAxiosGet from "../services/ServiceAxiosGet";
import axiosDelete from "../services/ServiceAxiosDelete";
import axiosPost from "../services/ServiceAxiosPost";
import PageHeader from "../components/PageHeader";
import TargetUsersBadge from "../components/TargetUsersBadge";
import {
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import RoleButton from "../components/RoleButton";

export default function RoleAssignment() {
  const { user, isAuthenticated } = useAuth0();
  const userUserRole = process.env.REACT_APP_USER_ROLE;
  const userSupportRole = process.env.REACT_APP_SUPPORT_ROLE;
  const [userId, setUserId] = useState();
  const [roleId, setRoleId] = useState();
  const roleUrl = userId
    ? `${process.env.REACT_APP_SERVICE_API}/${userId}/roles`
    : null;
  const [dataUsers] = useAxiosGet(`${process.env.REACT_APP_SERVICE_API}/users`);
  const [userRole] = useAxiosGet(roleUrl);
  const [role, setRole] = useState();
  const [selectValue, setSelectValue] = useState();
  const [disableButton, setDisabledButton] = useState(true);
  const [value, setValue] = useState({ User: false, Support: false });
  const filteredDataUsers = dataUsers?.filter((u) => u.userID !== user.sub);

  useEffect(() => {
    if (userRole) {
      setRole(userRole[0]?.name);
      setRoleId(userRole[0]?.id);
      setValue({ [userRole[0]?.name]: true });
    }
  }, [userRole]);

  const deleteAndPostUserRole = async () => {
    try {
      await axiosDelete(`${process.env.REACT_APP_SERVICE_API}/role/${userId}`);
      await axiosPost(
        `${process.env.REACT_APP_SERVICE_API}/role/${roleId}/${userId}`
      );
      alert("Role was assigned");
    } catch {
      alert("Something is wrong");
    }
  };

  const handleNone = () => {
    setUserId(null);
    setDisabledButton(true);
  };

  const handleUserData = (userID) => {
    setUserId(userID);
    setDisabledButton(true);
  };

  const handleUserRole = () => {
    setRole("User");
    setRoleId(userUserRole);
    setDisabledButton(false);
  };

  const handleSupportRole = () => {
    setRole("Support");
    setRoleId(userSupportRole);
    setDisabledButton(false);
  };
  
  const handleSelectChange = (e) => {
    const value = e.target?.value ? e.target.value : e;
    setSelectValue(value);
  };

  return (
    isAuthenticated &&
    user["https://my-app/roles"][0] === "Admin" && (
      <div className="d-grid">
        <PageHeader name={"Role Assignment"} />
        <TargetUsersBadge
          data={filteredDataUsers}
          title={"Select an Account"}
          value={selectValue}
          onChange={handleSelectChange}
          searchSelect={handleUserData}
          options={
            <>
              <option onClick={handleNone}>---</option>
              {dataUsers &&
                filteredDataUsers?.map((user, index) => (
                  <option
                    key={index}
                    value={index}
                    onClick={() => handleUserData(user.userID)}
                  >
                    {!user.firstName || !user.lastName
                      ? user.username
                      : `${user.username} (${user.firstName} ${user.lastName})`}
                  </option>
                ))}
            </>
          }
        >
          {userId && userRole && (
            <Container>
              <Row>
                <InputGroup
                  className="mx-auto my-3"
                  style={{ maxWidth: "250px" }}
                >
                  <DropdownButton variant="dark" title="Role">
                    <Dropdown.Item disabled>
                      <strong>Select a Role</strong>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleUserRole}
                      disabled={value.User}
                    >
                      User
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleSupportRole}
                      disabled={value.Support}
                    >
                      Support
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control placeholder={role} disabled />
                </InputGroup>
              </Row>
              <RoleButton
                handleclick={deleteAndPostUserRole}
                name={role}
                title="Assign Role"
                disabled={disableButton}
              />
            </Container>
          )}
        </TargetUsersBadge>
      </div>
    )
  );
}
