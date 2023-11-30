import React from 'react';
import MuiAlert, { AlertProps } from "@mui/material/Alert";


export const RegisterFormStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.0)",
    backgroundColor: "rgba(255, 255, 255, 0.0)" 
  };
  
  export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  