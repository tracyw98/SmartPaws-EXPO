import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

const useCameraAccess = () => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setCameraPermissionStatus(permission);
    };

    requestPermission();
  }, []);

  return {
    cameraPermissionStatus,
    hasCameraAccess: cameraPermissionStatus === "granted",
  };
};

export default useCameraAccess;
