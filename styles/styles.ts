export const iconStyle = {
  width: "16px",
  height: "16px",
  marginRight: "8px",
  marginLeft: "0px",
};

export const loginButtonStyle = {
  height: "48px",
  fontFamily: "Lexend",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "20px",
  marginTop: "24px",
  textAlign: "center",
  padding: "8px 36px",
  borderRadius: "4px",
  background: "#2AA87E",
  color: "#fff",
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#2AA87E",
    boxShadow: "none",
  },
};

export const buttonStyle = {
  fontFamily: "Lexend",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  borderRadius: "4px",
  textAlign: "center",
  padding: "8px 12px",
  background: "#2AA87E",
  boxShadow: "none",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#2AA87E",
    boxShadow: "none",
  },
  "& .MuiButton-startIcon": {
    marginRight: "0px",
    marginLeft: "0px",
  },
};

export const noClientsStyle: React.CSSProperties = {
  fontFamily: "Lexend",
  fontSize: "24px",
  fontWeight: 300,
  lineHeight: "30px",
  letterSpacing: "-0.0031em",
  textAlign: "center",
  color: "#243030",
};

export const addClientStyle = {
  fontFamily: "Lexend",
  fontSize: "24px",
  fontWeight: 300,
  lineHeight: "30px",
  letterSpacing: "-0.0031em",
  textAlign: "center",
  color: "#2AA87E",
  textTransform: "unset",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
};

export const modalStyle5: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "760px",
  maxHeight: "100vh",
  height: "100vh",
  overflowY: "scroll",
  background: "#fff",
  border: "1px solid #8CA19F",
  padding: "48px",
  borderRadius: "4px",
};
export const notificationModal: React.CSSProperties = {
  ...modalStyle5,
  width: "864px",
};
export const modalStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "628px",
  backgroundColor: "white",
  boxShadow: "0px 16px 64px 0px rgba(10, 18, 20, 0.125)",
  background: "#ffffff",
  borderRadius: "8px",
  padding: "32px 36px",
  border: "1px solid #DAE8E7",
  outline: "none",
};
export const labelStyle: React.CSSProperties = {
  fontFamily: "Lexend",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "18px",
  textAlign: "left",
  color: "#243030",
  textTransform: "uppercase",
  background: "#fff",
  padding: "0px 0px",
};

export const inputStyle: React.CSSProperties = {
  height: "44px",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #DAE8E7",
  fontFamily: "Lexend",
  fontSize: "14px",
  fontWeight: 300,
  lineHeight: "21px",
  textAlign: "left",
  color: "#5B706F",
  width: "100%",
};

export const errorStyle: React.CSSProperties = {
  marginTop: "0px",
  marginLeft: "2px",
  fontFamily: "Lexend",
  fontSize: "14px",
  fontWeight: 300,
  color: "red",
};

export const createButton = {
  textTransform: "capitalize",
  height: "44px",
  padding: "12px 16px",
  gap: "8px",
  borderRadius: "4px",
  background: "#2AA87E",
  fontFamily: "Lexend",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  textAlign: "center",
  color: "#fff",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#2AA87E",
    boxShadow: "none",
  },
};
export const searchIcon: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  top: "13px",
  color: "#5B706F",
  width: "22px",
  height: "22px",
};
export const searchIcon2: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  top: "15px",
  color: "#5B706F",
  width: "22px",
  height: "22px",
};

export const licenseText: React.CSSProperties = {
  fontFamily: "Lexend",
  fontSize: "26px",
  fontWeight: 300,
  lineHeight: "35px",
  letterSpacing: "-0.0031em",
  textAlign: "left",
  color: "#141418",
};

export const colorPalette = {
  primary: {
    main: "#29A87E", //'#4c12a1',
  },
  success: {
    main: "#29A87E",
  },
  background: {
    paper: "#FFFFFF",
  },
};