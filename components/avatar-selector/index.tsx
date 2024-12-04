"use client";
import { useConvoDashboardStore } from "@/store/useConvoDashboardStore";
import { AddPhotoAlternate, Cancel } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface AvatarSelectorProps {}

export const AvatarSelector: React.FC<AvatarSelectorProps> = () => {
  const dialogState = useConvoDashboardStore((state: any) => state.editDialog);
  const [avatars, setAvatars] = useState<string[]>([]);

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const avatarUrl = e.target.result as string;
          setAvatars([avatarUrl]);

          useConvoDashboardStore.getState().setEditDialog({
            ...dialogState,
            data: { ...dialogState.data, avatar: avatarUrl },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatars([]);

    useConvoDashboardStore.getState().setEditDialog({
      ...dialogState,
      data: { ...dialogState.data, avatar: "" },
    });
  };

  useEffect(() => {
    const storedAvatar = dialogState.data?.avatar;
    if (storedAvatar) {
      if (avatars[0] !== storedAvatar) {
        setAvatars([storedAvatar]);
      }
    } else {
      setAvatars([]);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="subtitle1" sx={{ flex: 1 }} gutterBottom>
        Select a Team Avatar
      </Typography>
      <Box
        sx={{ flex: 1 }}
        display="flex"
        gap={2}
        padding={1}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
      >
        <label htmlFor="upload-button">
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleUploadClick}
          />
          <IconButton
            component="span"
            sx={{
              width: 60,
              height: 60,
              borderRadius: 1,
              border: "2px solid transparent",
              "&:hover": {
                border: "2px solid #4CAF50",
              },
            }}
          >
            <AddPhotoAlternate style={{ color: "#9E9E9E", fontSize: 40 }} />
          </IconButton>
        </label>
        {avatars.length > 0 && (
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAvatar();
                }}
              >
                <Cancel fontSize="small" />
              </IconButton>
            }
          >
            <Avatar
              src={avatars[0]}
              sx={{
                width: 60,
                height: 60,
                border: "2px solid #4CAF50",
                cursor: "pointer",
              }}
            />
          </Badge>
        )}
      </Box>
    </Box>
  );
};

export default AvatarSelector;
