import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

interface LoaderMessage {
  id: number;
  label: string;
  isComplete: boolean;
  status: "loading" | "success" | "error";
  message: string;
}

interface LoaderContextType {
  showLoader: (messages: LoaderMessage[]) => void;
  updateLoaderStatus: (
    id: number,
    status: LoaderMessage["status"],
    message: string,
    isComplete: boolean
  ) => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  showLoader: () => {},
  updateLoaderStatus: () => {},
  hideLoader: () => {},
});

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [LoaderOpen, setLoaderOpen] = useState(false);
  const [messages, setMessages] = useState<LoaderMessage[]>([]);

  const showLoader = useCallback((newMessages: LoaderMessage[]) => {
    setMessages(newMessages);
    setLoaderOpen(true);
  }, []);

  const updateLoaderStatus = useCallback(
    (
      id: number,
      status: LoaderMessage["status"],
      message: string,
      isComplete: boolean
    ) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status, message, isComplete } : msg
        )
      );
    },
    []
  );

  const hideLoader = useCallback(() => {
    setLoaderOpen(false);
    setMessages([]);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messages.every((msg) => msg.isComplete)) {
      const timer = setTimeout(() => {
        hideLoader();
      }, 5000); // Auto-hide after 5 seconds when all calls are completed
      return () => clearTimeout(timer);
    }
  }, [messages, hideLoader]);

  const renderStatusIcon = (
    status: LoaderMessage["status"],
    isComplete: boolean
  ) => {
    switch (status) {
      case "loading":
        return <CircularProgress size={16} />;
      case "success":
        return <CheckIcon sx={{ color: green[500] }} />;
      case "error":
        return <ErrorIcon color="error" />;
      default:
        return isComplete ? (
          <CheckIcon sx={{ color: green[500] }} />
        ) : (
          <CircularProgress size={16} />
        );
    }
  };

  return (
    <LoaderContext.Provider
      value={{ showLoader, updateLoaderStatus, hideLoader }}
    >
      {children}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100%",
        }}
        open={LoaderOpen}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{
            backgroundColor: "transparent",
            borderRadius: 1,
            p: 3,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px 40px",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <CircularProgress size={16} color="success" />
              <Typography
                variant="h6"
                component="div"
                color="#000"
                gutterBottom
              >
                API Calls in Progress...
              </Typography>
            </Box>
            {messages.length > 0 && (
              <List>
                {messages.map(({ id, label, status, message, isComplete }) => (
                  <ListItem key={id}>
                    <ListItemIcon>
                      {renderStatusIcon(status, isComplete)}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      secondary={message}
                      sx={{ color: "#000" }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Backdrop>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

export default LoaderProvider;
