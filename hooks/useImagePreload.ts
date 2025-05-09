import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export default function useImagePreload(images: number[]) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function preload() {
      try {
        await Asset.loadAsync(images);
      } catch (e) {
        console.warn("Image preload error:", e);
      } finally {
        setIsLoaded(true);
      }
    }

    preload();
  }, [images]);

  return isLoaded;
}
