import React from "react";
import TopNavbar from "./Navbar/TopNavbar";
import LeftNavbar from "./Navbar/LeftNavbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PyramidLoader from "../common/Loader/PyramidLoader";

function Layout() {
  const { userRole, loading } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  if (loading) {
    return <div><PyramidLoader /></div>;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Navbar with fixed width */}
      <LeftNavbar role={userRole} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Adjust the margin based on whether the navbar is collapsed or not */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300`}
        style={{
          marginLeft: isCollapsed ? '80px' : '256px',
          width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)',
        }}
      >
        <TopNavbar isCollapsed={isCollapsed} />
        <div className="flex-1 overflow-y-auto p-6 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;