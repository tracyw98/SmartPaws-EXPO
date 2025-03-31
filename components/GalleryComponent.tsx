import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

interface Props {
  onImageSelected: (uri: string) => void;
}

export default function GalleryComponent({ onImageSelected }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [latestImage, setLatestImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        const assets = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
          sortBy: [["creationTime", false]],
        });

        if (assets.assets.length > 0) {
          setLatestImage(assets.assets[0].uri); // ✅ use asset.uri directly
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ modern usage
      allowsEditing: false,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        onImageSelected(uri); // ✅ safest, avoids assetId lookup
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={[
        styles.thumbnailWrapper,
        !latestImage && { backgroundColor: "#fff" },
      ]}
      disabled={!hasPermission}
    >
      {latestImage && (
        <Image source={{ uri: latestImage }} style={styles.thumbnail} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumbnailWrapper: {
    position: "absolute",
    bottom: 70,
    left: 20,
    width: 55,
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
});
