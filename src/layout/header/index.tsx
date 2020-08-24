import styles from "./index.module.scss";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Svg from "../../components/Svg";
import { useRouter } from "next/router";

function KHeader() {
  const router = useRouter();
  const onLogout = () => {
    router.replace("/login");
  };
  return (
    <div className={styles.header}>
      <div className={styles.user}>
        <Avatar size={32} icon={<UserOutlined />} />
        <span>157****9586</span>
        <Button
          className={styles.logout}
          type="text"
          icon={<Svg name="btn-logout-h" color="#B0B7BD" />}
          onClick={onLogout}
        ></Button>
      </div>
    </div>
  );
}

export default KHeader;
