import React, { useRef, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

// 🔧 To change circle size, update ITEM_SIZE here
const ITEM_SIZE = 60;
const SPACING = 12;

// Moved the "+" profile to the beginning of the array
const profiles = [
  { id: "add", name: "+" },
  { id: "1", name: "Dog 1" },
  { id: "2", name: "Dog 2" },
  { id: "3", name: "Dog 3" },
];

export default function DogProfileSlider({
  onProfileSelect,
}: {
  onProfileSelect: (profileId: string) => void;
}) {
  const listRef = useRef<FlatList>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("add");

  // This useEffect sets the initial scroll position to center the "+" profile
  useEffect(() => {
    // Set initial profile selection
    onProfileSelect("add");

    // Calculate initial offset to center the first item ("+")
    const initialOffset = 0; // First item should be centered by default with proper padding

    // Apply the offset after component mounts
    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: initialOffset,
        animated: false,
      });
    }, 100);
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    // Calculate which item is centered
    const centerOfScreen = scrollPosition + width / 2;
    const itemFullWidth = ITEM_SIZE + SPACING;
    const firstItemOffset = (width - ITEM_SIZE) / 2;
    const indexFloat = (centerOfScreen - firstItemOffset) / itemFullWidth;
    const index = Math.round(indexFloat);

    // Ensure index is within bounds
    if (index >= 0 && index < profiles.length) {
      const profileId = profiles[index].id;
      if (profileId !== selectedProfileId) {
        setSelectedProfileId(profileId);
        onProfileSelect(profileId);
      }
    }
  };

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={listRef}
        data={profiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_SIZE) / 2,
        }}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              // Find the index of this item
              const index = profiles.findIndex((p) => p.id === item.id);
              if (index !== -1) {
                // Calculate the scroll position to center this item
                const itemPosition = index * (ITEM_SIZE + SPACING);
                listRef.current?.scrollToOffset({
                  offset: itemPosition,
                  animated: true,
                });

                // Update selected profile
                setSelectedProfileId(item.id);
                onProfileSelect(item.id);
              }
            }}
          >
            <View
              style={[
                styles.circle,
                selectedProfileId === item.id && styles.selectedCircle,
              ]}
            >
              <Text style={styles.label}>{item.name === "+" ? "+" : "🐶"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING / 2,
  },
  circle: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "dashed", // ✅ Dotted look
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000066",
  },
  selectedCircle: {
    borderColor: "#00BFFF", // Highlight selected profile
    backgroundColor: "#00000099",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

/* 
NOTES FOR IMPLEMENTING API INTEGRATION:

1. Dog Profile API Integration:

   A) Creating New Dog Profiles:
   
   When a user taps the "+" button, implement a function like:
   
   ```typescript
   const handleAddProfile = async () => {
     // Navigate to profile creation screen
     navigation.navigate('CreateDogProfile', {
       onProfileCreated: (newProfile) => {
         // Fetch updated profiles after creation
         fetchDogProfiles();
       }
     });
   }
   ```
   
   B) Fetching Profiles from API:
   
   Replace the hardcoded profiles array with data from your API:
   
   ```typescript
   const [profiles, setProfiles] = useState([
     { id: "add", name: "+" } // Always keep the "+" option
   ]);
   
   const fetchDogProfiles = async () => {
     try {
       // Show loading indicator
       setLoading(true);
       
       // Make API call
       const response = await fetch('https://your-api.com/dog-profiles', {
         headers: {
           'Authorization': `Bearer ${userToken}`,
           'Content-Type': 'application/json'
         }
       });
       
       if (!response.ok) {
         throw new Error('Failed to fetch profiles');
       }
       
       // Parse response
       const data = await response.json();
       
       // Transform API data to match component format
       const formattedProfiles = data.map(profile => ({
         id: profile.id.toString(),
         name: profile.name,
         imageUrl: profile.imageUrl // You'll need to add image handling
       }));
       
       // Add the "+" option at the beginning
       setProfiles([
         { id: "add", name: "+" },
         ...formattedProfiles
       ]);
     } catch (error) {
       console.error('Error fetching dog profiles:', error);
       // Handle error (show toast, etc.)
     } finally {
       setLoading(false);
     }
   };
   
   // Call this in useEffect
   useEffect(() => {
     fetchDogProfiles();
   }, []);
   ```
   
   C) Handling Profile Images:
   
   Modify the renderItem function to display actual dog profile images:
   
   ```typescript
   renderItem={({ item }) => (
     <TouchableOpacity style={styles.item}>
       <View style={[
         styles.circle,
         selectedProfileId === item.id && styles.selectedCircle
       ]}>
         {item.id === 'add' ? (
           <Text style={styles.label}>+</Text>
         ) : (
           item.imageUrl ? (
             <Image 
               source={{ uri: item.imageUrl }} 
               style={styles.profileImage} 
               resizeMode="cover"
             />
           ) : (
             <Text style={styles.label}>🐶</Text>
           )
         )}
       </View>
     </TouchableOpacity>
   )}
   ```
   
   Add to styles:
   ```
   profileImage: {
     width: ITEM_SIZE - 4,
     height: ITEM_SIZE - 4,
     borderRadius: (ITEM_SIZE - 4) / 2,
   }
   ```

2. Handling Selection with Real Data:

   When taking a photo, you'll want to associate it with the selected profile:
   
   ```typescript
   const handleTakePicture = async () => {
     try {
       // Check if a real profile (not the "+" button) is selected
       if (selectedProfileId !== 'add') {
         const photo = await cameraRef.current?.takePhoto({
           flash: flash === "on" ? "on" : "off"
         });
         
         if (photo?.path) {
           // Upload the photo and associate with dog profile
           const photoUri = "file://" + photo.path;
           await uploadPhotoForDogProfile(photoUri, selectedProfileId);
         }
       } else {
         // Handle the case when "+" is selected
         // Either show a message or redirect to create profile
         Alert.alert('Select a dog profile', 'Please select a dog profile or create a new one');
       }
     } catch (error) {
       console.error('Error taking picture:', error);
     }
   };
   
   const uploadPhotoForDogProfile = async (photoUri, profileId) => {
     // Create form data for upload
     const formData = new FormData();
     formData.append('photo', {
       uri: photoUri,
       name: 'photo.jpg',
       type: 'image/jpeg'
     });
     formData.append('profileId', profileId);
     
     // Make API call to upload
     try {
       const response = await fetch('https://your-api.com/dog-photos', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${userToken}`,
           'Content-Type': 'multipart/form-data'
         },
         body: formData
       });
       
       if (!response.ok) {
         throw new Error('Failed to upload photo');
       }
       
       // Handle successful upload
       const result = await response.json();
       console.log('Photo uploaded successfully:', result);
       
       // Navigate to success screen or show confirmation
     } catch (error) {
       console.error('Error uploading photo:', error);
       // Handle error
     }
   };
   ```

3. Performance Considerations:

   - Use image caching for dog profile pictures (libraries like react-native-fast-image)
   - Implement pagination if the user has many dog profiles
   - Add pull-to-refresh functionality to update the list
   - Consider storing profiles in local storage for offline access

4. Error Handling:

   - Add proper error states for failed API calls
   - Implement retry mechanisms for failed uploads
   - Show appropriate loading states during API operations
*/
