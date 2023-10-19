'use client';

/**
 * @file AdminLayout
 * @author jjq
 * @description AdminLayout
 */

import AppContext from "@/store";
import Header from "@/components/Header";

interface AdminLayoutProps {
  children: any;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // return <>{children}</>;
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex-grow-0">
        <Header />
      </div>
      <div className="flex-shrink-1 flex-grow-0 overflow-scroll">
        <AppContext.Provider>
          {children}
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default AdminLayout;
