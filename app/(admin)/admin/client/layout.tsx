import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import AdminNavbar from "../../_compoenets/admin_navbar";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <AdminNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
