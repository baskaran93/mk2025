import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

// Importing logo
const LoginBgimg = require("../../assets/images/NMMKLogo.png");

// Get device width
const { width, height } = Dimensions.get("window");

const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      pincode: "",
    },
  });
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const onSubmit = async (data) => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);

    const requestBody = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.mobile.trim(),
      address: data.city.trim(),
      pincode: parseInt(data.pincode.trim()),
    };

    try {
      const response = await fetch("http://98.70.27.226:8080/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid server response. Please try again.");
      }

      if (response.ok) {
        alert("Success", "Registration completed successfully! 🎉");

        // ✅ Reset the form after successful submission
        reset({
          name: "",
          email: "",
          mobile: "",
          city: "",
          pincode: "",
        });
      } else {
        alert(
          "Error",
          responseData.message || "Failed to register. Try again."
        );
      }
    } catch (error) {
      alert(
        "Error",
        error.message || "Failed to connect to the server. Please try again."
      );
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo Section */}
            <Image source={LoginBgimg} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Visitor Registration</Text>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Name Field */}
              <Text style={styles.label}>Name *</Text>
              <Controller
                control={control}
                rules={{
                  required: "Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Name cannot be empty or just spaces",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="words"
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}

              {/* Mobile Number Field */}
              <Text style={styles.label}>Mobile Number *</Text>
              <Controller
                control={control}
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter mobile number"
                    keyboardType="phone-pad"
                    onChangeText={onChange}
                    value={value}
                    maxLength={10}
                  />
                )}
                name="mobile"
              />
              {errors.mobile && (
                <Text style={styles.error}>{errors.mobile.message}</Text>
              )}

              {/* Pincode Field */}
              <Text style={styles.label}>Pincode *</Text>
              <Controller
                control={control}
                rules={{
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter pincode"
                    keyboardType="number-pad"
                    onChangeText={onChange}
                    value={value}
                    maxLength={6}
                  />
                )}
                name="pincode"
              />
              {errors.pincode && (
                <Text style={styles.error}>{errors.pincode.message}</Text>
              )}

              {/* City Field */}
              <Text style={styles.label}>City *</Text>
              <Controller
                control={control}
                rules={{
                  required: "City is required",
                  validate: (value) =>
                    value.trim() !== "" || "City cannot be empty or just spaces",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter city"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="words"
                  />
                )}
                name="city"
              />
              {errors.city && (
                <Text style={styles.error}>{errors.city.message}</Text>
              )}

              {/* Email Field */}
              <Text style={styles.label}>Email ID *</Text>
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter email ID"
                    keyboardType="email-address"
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}

              {/* Submit Button */}
              <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
                {loading ? (
                  <ActivityIndicator size="large" color="#6A1B9A" />
                ) : (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: {
    width: width > 600 ? 300 : 150, // Larger logo for web/tablet
    height: width > 600 ? 250 : 130,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: width > 600 ? 28 : 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6A1B9A",
    marginBottom: 20,
  },
  formContainer: {
    width: width > 600 ? "50%" : "90%", // Adaptive form width
    maxWidth: 600,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    width: "100%",
  },
  input: {
    height: 50,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: "#6A1B9A",
    paddingVertical: 18,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Registration;
