import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image"; 
// Get device dimensions
const { width, height } = Dimensions.get("window");

const AlreadyRegistered = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [visitorID, setVisitorID] = useState("");
  const viewShotRef = useRef(null);

  // Convert base64 to Blob for Web Download
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/png" });
  };

  // Fetch Visitor ID from API
  const fetchVisitorID = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return null;
    }

    console.log("Checking status for Mobile Number:", mobileNumber);

    try {
      const response = await fetch(
        `http://98.70.27.226:8080/getUserId?phone=${mobileNumber}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.user_id) {
        console.log("User ID:", responseData.user_id);
        return responseData.user_id;
      } else {
        alert(responseData.message || "User not registered.");
        return null;
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error fetching user data. Please try again later.");
      return null;
    }
  };

  // Handle Download Ticket
  const handleDownloadTicket = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit number.");
      return;
    }
  
    // Fetch visitor ID using the mobile number
    const fetchedVisitorID = await fetchVisitorID();
    if (!fetchedVisitorID) {
      alert("Visitor ID not found.");
      return;
    }
  
    // Set the visitor ID correctly
    setVisitorID(fetchedVisitorID);
  
    // Wait for state to update before capturing
    setTimeout(async () => {
      const node = document.getElementById("ticketCapture");
      if (node) {
        try {
          const dataUrl = await toPng(node);
          saveAs(dataUrl, `Visitor_Ticket_${fetchedVisitorID}.png`);
          alert("Ticket downloaded successfully!");
        } catch (error) {
          console.error("Error capturing ticket:", error);
          alert("Failed to download the ticket.");
        }
      } else {
        alert("Error: Unable to locate the ticket preview.");
      }
    }, 500);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Mobile Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="numeric"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        {/* Download Ticket Button */}
        <TouchableOpacity style={styles.button} onPress={handleDownloadTicket}>
          <Text style={styles.buttonText}>Download Ticket</Text>
        </TouchableOpacity>

        {/* Hidden Ticket Preview for Download */}
        <ViewShot
          ref={viewShotRef}
          options={{
            format: "png",
            quality: 1,
            result: "base64",
            width: width * 2,
            height: height * 2,
          }}
          style={styles.hiddenView}
        >
          <View
  id="ticketCapture"
  style={styles.ticketWrapper}
>
  <Image
    source={require("../../assets/images/ENTRY_TICKET.jpg")}
    style={styles.ticketImage}
  />
  {visitorID ? (
    <View style={styles.qrContainer}>
      <QRCode value={visitorID} size={width > 768 ? 150 :150} />
      <Text
        style={[
          styles.additionalText,
          { fontSize: width > 768 ? 30 : 30 },
        ]}
      >
        {visitorID}
      </Text>
    </View>
  ) : null}
</View>

          </ViewShot>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  innerContainer: {
    width: width > 768 ? "40%" : "90%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  ticketWrapper: {
    position: "relative",
    alignItems: "center",
  },
  ticketImage: {
    width: 1000, // High-res width for quality
    height: 700, // High-res height for quality
    resizeMode: "contain",
  },
 
  qrContainer: {
    position: "absolute",
    left: "47%",
    bottom: "-.5%",
    transform: [{ translateX: -45 }], // Adjusted for larger QR code
  },
   // qrContainer: {
  //   position: "absolute",
  //   left: "50%",
  //   bottom: "1%",
  //   width: width > 768 ? 450 : 280,
  //   height: 500,
  //   transform: [{ translateX: width > 768 ? -225 : -140 }],
  // },
  additionalText: {
    marginTop: 1, // Space below Visitor ID
    fontSize: 40, // Slightly smaller than Visitor ID
    color: "#fff", // Soft gray color
    textAlign: "center",
    fontWeight: "500", // Medium weight
  
  },
  hiddenView: {
    position: "absolute",
    left: -1000,
  },
});

export default AlreadyRegistered;
