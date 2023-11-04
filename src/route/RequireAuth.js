import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  return <div>{children}</div>;
};

export default RequireAuth;
