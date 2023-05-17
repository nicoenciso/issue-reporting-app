import useAxiosGet from "../services/ServiceAxiosGet";

export default function TableUserHeader({ userSub }) {
    const [data] = useAxiosGet(
        `${process.env.REACT_APP_SERVICE_API}/${userSub}/roles`
    );
    return (
        data && data.name === "User" ? (<th>Assignee</th>) : data && data.name === "Support" ? (<th>Reported by</th>) : (<th></th>)
    )
}