import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

const useCameraAccess = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  return { cameraPermission };
};

export default useCameraAccess;
