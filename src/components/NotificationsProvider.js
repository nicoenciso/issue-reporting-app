import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useState } from "react";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const { user } = useAuth0();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(null);

  const getNotif = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVICE_API}/${user.sub}/Notifications`)
      .then((res) => {
        setUnread(res.data.filter((m) => m.Read === false));
        setNotifications(res.data);
      });
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, setNotifications, unread, setUnread, getNotif }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
