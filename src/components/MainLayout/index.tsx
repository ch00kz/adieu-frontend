import { ReactNode } from "react";
import "./styles.css";

type TProps = { children: ReactNode; victory?: boolean };

function MainLayout({ children, victory }: TProps) {
  return (
    <div className="container">
      <header>
        {victory && <div className="emoji">🎉</div>}
        <h1 className="page-hero">Adieu</h1>
        {victory && <div className="emoji">🎉</div>}
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
