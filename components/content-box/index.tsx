import { Stack, useTheme, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface ContentBoxProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
}

export const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Stack
      sx={{
        background: palette.background.paper,
        borderRadius: "10px",
        px: 2,
        py: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
