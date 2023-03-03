import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddPost({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const onClick = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // console.log(data.uri);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onClick()}>
          <Text style={styles.text}>Click</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
          <Text style={styles.text}>Choose image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SavePost", { image })}
        >
          <Text style={styles.text}>Done</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    width: Dimensions.get("screen").width * 0.4,
    height: 40,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cameraContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});
