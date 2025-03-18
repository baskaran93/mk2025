import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";

const LoginBgimg = require("../../assets/images/NMMKLogo.png");
const EventImage = require("../../assets/images/eventImage1.png");

const { width, height } = Dimensions.get("window");

const FirstPage = ({ navigation }) => {
  const isWeb = Platform.OS === "web";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Left Side: Event Image */}
        <View style={styles.imageContainer}>
          <Image source={EventImage} style={styles.eventImage} />
        </View>

        {/* Right Side: Buttons and Logo */}
        <View style={styles.rightContainer}>
          <Image source={LoginBgimg} style={styles.logo} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.buttonText}>Register Here</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AlreadyRegistered")}
            >
              <Text style={styles.buttonText}>Already Registered</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
  },
  contentContainer: {
    flexDirection: width > 600 ? "row" : "column", // Row for web, column for mobile
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: width > 600 ? "40%" : "100%",
    height: width > 600 ? "100vh" : 300, // Full height for web, limited height for mobile
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  eventImage: {
    width: "100%", // Full width
    height: "100%", // Full height
    resizeMode: "contain", // Avoid cutting image
  },
  rightContainer: {
    width: width > 600 ? "60%" : "100%", // Take 60% width for larger screens
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width > 600 ? 40 : 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: width > 600 ? 300 : 200,
    height: width > 600 ? 200 : 150,
    resizeMode: "contain",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: width > 600 ? 18 : 16,
    borderRadius: 10,
    width: width > 600 ? "50%" : "80%", // Smaller width for mobile
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: width > 600 ? 18 : 16,
    fontWeight: "bold",
  },
});

export default FirstPage;
