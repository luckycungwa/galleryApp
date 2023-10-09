import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
// import { Text, View,} from "react-native-web";
import { Camera } from "expo-camera"; //Expo cam || RNC (REACT)
import * as Location from "@react-native-community/geolocation"; //metadata/location data
import * as SQLite from "expo-sqlite";

// using expo sqlite
const db = SQLite.openDatabase("images.db"); // SQlite from expo
  
const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, latitude REAL, longitude REAL)',
      [],
      () => console.log('Table created!'),
      (_, error) => console.error('failed to create table! Error:', error)
    );
  });
};

const CamScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    // initializeed db whne components mounts
    setupDatabase();

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log("Photo URI:", photo.uri);

      // Save the image URI and coordinate data to SQLite
      captureLocation();
      
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO images (uri, latitude, longitude) VALUES (?, ?, ?)",
          [photo.uri, latitude, longitude],
          () => console.log("Image saved"),
          (_, error) => console.error("Failed to save image. Error:", error)
        );
      });
    }
  };
  // handl permission to access user device features
  if (hasPermission === null) {
    return <View />; //render view from cam perspective
  }
  if (hasPermission === false) {
    return console.log("App is using your Cam");
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back} //default cam emva or from cam
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.camFeatures}>
          <TouchableOpacity style={styles.shutterBtn} onPress={takePicture}>
            {/* <Text style={{ fontSize: 18, color: 'white' }}>Take Picture</Text> */}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  camView: {
    // backgroundColor: "#ff5858",
    flex: 1,
    width: "100%",
    // height: 1080,
    // position: 'absolute',
  },
  shutterBtn: {
    alignSelf: "center",
    width: 60,
    height: 60,
    backgroundColor: "#b3b3b3e1",
    borderRadius: 50,
    border: 4,
    borderColor: "#2c2c2c",
  },
  galleryBtn: {
    // alignSelf: "flex-start",
    width: 34,
    height: 34,
    backgroundColor: "#dbdbdb",
    borderRadius: 50,
  },
  settingsBtn: {
    // alignSelf: "flex-end",
    width: 34,
    height: 34,
    backgroundColor: "#dbdbdb",
    borderRadius: 50,
    // display: "absolute",
  },

  camFeatures: {
    // position: "absolute",
    gap: 60,
    // padding: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  camFX: {
    alignSelf: "center",
    padding: 2,
    // gap: 12,

    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    letterSpacing: 1,
    fontSize: 12,
    textAlign: "center",
  },
  fxBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe1004c",
    borderWidth: 1,
    borderColor: "#ffe10076",
    // width: 'auto',
    marginHorizontal: 2,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  //   LAYOUT
  top: {
    flex: 1,
    width: "100%",
    height: 100,
    backgroundColor: "#71ff58",
  },
  middle: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexGrow: 6,
    // backgroundColor: "#58ffc7",
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: "auto",
    backgroundColor: "#7158ff",
    // flexGrow: 1,
    position: "relative",
  },
});

export default CamScreen;
