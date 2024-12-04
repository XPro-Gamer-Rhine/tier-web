"use client";
import { useAuth } from "@/lib/contexts/AuthContext";
import React from "react";

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <div>Admin Page</div>
      {user && (
        <h1>
          {user.firstName} {user.lastName}
        </h1>
      )}
    </div>
  );
};

export default AdminPage;
