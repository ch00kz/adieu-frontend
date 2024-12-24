import { ReactNode } from "react";
import "./styles.css";

type TProps = { children: ReactNode; pageTitle?: string };

function MainLayout({ children, pageTitle }: TProps) {
  return (
    <div className="container">
      <h1 className="page-hero">{pageTitle ? pageTitle : "ADIEU"}</h1>
      {children}
    </div>
  );
}

export default MainLayout;
