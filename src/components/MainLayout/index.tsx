import { ReactNode } from "react";
import "./styles.css";

type TProps = { children: ReactNode };

function MainLayout({ children }: TProps) {
  return (
    <div className="container">
      <h1 className="page-hero">ADIEU</h1>
      <section>{children}</section>
    </div>
  );
}

export default MainLayout;
