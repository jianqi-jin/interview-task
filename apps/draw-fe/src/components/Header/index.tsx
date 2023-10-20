/**
 * @file Header
 * @author jjq
 * @description Header
 */

import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { useContainer } from "unstated-next";
import AppContext from "@/store";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const { setShowLogin, userName } = useContainer(AppContext);
  const navs = [
    {
      id: 0,
      text: "DashBoard",
      onClick: () => router.push("/admin/dashboard"),
    },
    {
      id: 1,
      text: userName || "Login",
      onClick: () => {
        if (userName) {
          return;
        }
        // not login
        setShowLogin(true);
      },
    },
  ];
  return (
    <header className={`${styles.Header} py-4 border-slate-900/10 border-b`}>
      <div className={`h-7 backdrop-blur px-6 flex flex-row justify-between`}>
        <div>
          <a>TASK</a>
        </div>
        <div>
          <nav className="font-semibold">
            <ul className="flex flex-row space-x-8">
              {navs.map((item) => (
                <li
                  key={item.id}
                  onClick={item.onClick}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
