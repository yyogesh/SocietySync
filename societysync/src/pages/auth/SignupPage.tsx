import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Radio from "../../components/common/Radio";
import Checkbox from "../../components/common/Checkbox";
import FileInput from "../../components/common/FileInput";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "../../context/ThemeContext";
import { getThemeColors } from "../../utils/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { registerUser } from "../../slices/authSlice";
import { SignupFormData, signupSchema } from "../../utils/schemas";

// India States and Cities Data
const STATES = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "delhi", label: "Delhi" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal_pradesh", label: "Himachal Pradesh" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "west_bengal", label: "West Bengal" },
];

const CITIES_BY_STATE = {
  andhra_pradesh: [
    { value: "visakhapatnam", label: "Visakhapatnam" },
    { value: "vijayawada", label: "Vijayawada" },
    { value: "guntur", label: "Guntur" },
    { value: "nellore", label: "Nellore" },
  ],
  assam: [
    { value: "guwahati", label: "Guwahati" },
    { value: "silchar", label: "Silchar" },
    { value: "dibrugarh", label: "Dibrugarh" },
  ],
  bihar: [
    { value: "patna", label: "Patna" },
    { value: "gaya", label: "Gaya" },
    { value: "bhagalpur", label: "Bhagalpur" },
  ],
  delhi: [
    { value: "new_delhi", label: "New Delhi" },
    { value: "north_delhi", label: "North Delhi" },
    { value: "south_delhi", label: "South Delhi" },
    { value: "east_delhi", label: "East Delhi" },
    { value: "west_delhi", label: "West Delhi" },
  ],
  gujarat: [
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "surat", label: "Surat" },
    { value: "vadodara", label: "Vadodara" },
    { value: "rajkot", label: "Rajkot" },
  ],
  haryana: [
    { value: "gurugram", label: "Gurugram" },
    { value: "faridabad", label: "Faridabad" },
    { value: "panipat", label: "Panipat" },
  ],
  himachal_pradesh: [
    { value: "shimla", label: "Shimla" },
    { value: "dharamshala", label: "Dharamshala" },
    { value: "manali", label: "Manali" },
  ],
  karnataka: [
    { value: "bengaluru", label: "Bengaluru" },
    { value: "mysuru", label: "Mysuru" },
    { value: "hubli", label: "Hubli" },
    { value: "mangaluru", label: "Mangaluru" },
  ],
  kerala: [
    { value: "thiruvananthapuram", label: "Thiruvananthapuram" },
    { value: "kochi", label: "Kochi" },
    { value: "kozhikode", label: "Kozhikode" },
  ],
  madhya_pradesh: [
    { value: "indore", label: "Indore" },
    { value: "bhopal", label: "Bhopal" },
    { value: "jabalpur", label: "Jabalpur" },
  ],
  maharashtra: [
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "nagpur", label: "Nagpur" },
    { value: "thane", label: "Thane" },
    { value: "nashik", label: "Nashik" },
  ],
  punjab: [
    { value: "ludhiana", label: "Ludhiana" },
    { value: "amritsar", label: "Amritsar" },
    { value: "jalandhar", label: "Jalandhar" },
  ],
  rajasthan: [
    { value: "jaipur", label: "Jaipur" },
    { value: "jodhpur", label: "Jodhpur" },
    { value: "udaipur", label: "Udaipur" },
    { value: "kota", label: "Kota" },
  ],
  tamil_nadu: [
    { value: "chennai", label: "Chennai" },
    { value: "coimbatore", label: "Coimbatore" },
    { value: "madurai", label: "Madurai" },
    { value: "tiruchirappalli", label: "Tiruchirappalli" },
  ],
  telangana: [
    { value: "hyderabad", label: "Hyderabad" },
    { value: "warangal", label: "Warangal" },
    { value: "nizamabad", label: "Nizamabad" },
  ],
  uttar_pradesh: [
    { value: "lucknow", label: "Lucknow" },
    { value: "kanpur", label: "Kanpur" },
    { value: "agra", label: "Agra" },
    { value: "varanasi", label: "Varanasi" },
    { value: "prayagraj", label: "Prayagraj" },
  ],
  west_bengal: [
    { value: "kolkata", label: "Kolkata" },
    { value: "howrah", label: "Howrah" },
    { value: "durgapur", label: "Durgapur" },
    { value: "siliguri", label: "Siliguri" },
  ],
  // Default empty array for other states
  default: [],
};

// Constants for placeholders
const PLACEHOLDERS = {
  firstName: "Enter your first name",
  lastName: "Enter your last name",
  email: "Enter your email address",
  phoneNumber: "Enter your 10-digit phone number",
  password: "Create a password",
  confirmPassword: "Confirm your password",
  pinNumber: "Enter your 6-digit PIN code",
  address: "Enter your address",
  streetTower: "Enter street/tower",
  floorNumber: "Enter floor number",
  houseNumber: "Enter house/flat number",
  aadharCard: "Enter your 12-digit Aadhar card number",
  propertyID: "Enter property ID",
  PPPID: "Enter PPPID",
};

const SignupPage = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);

  const [step, setStep] = useState(1);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      state: "haryana", // Default state
      city: "gurugram", // Default city
      pinNumber: "",
      address: "",
      streetTower: "",
      floorNumber: "",
      houseNumber: "",
      aadharCard: "",
      propertyID: "",
      PPPID: "",
      userType: "owner",
      agreeToTerms: false,
    },
  });

  // Get cities based on selected state
  const getCitiesForState = (state: string) => {
    return (
      CITIES_BY_STATE[state as keyof typeof CITIES_BY_STATE] ||
      CITIES_BY_STATE.default
    );
  };

  // Update cities when state changes
  const handleStateChange = (stateValue: string) => {
    // Reset city when state changes
    console.log("register");
    setValue("city", getCitiesForState(stateValue)[0]?.value || "");
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SignupFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "gender",
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "state",
        "city",
        "pinNumber",
        "address",
        "streetTower",
        "floorNumber",
        "houseNumber",
      ];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: SignupFormData) => {
    if (step !== 3) {
      handleNextStep();
      return;
    }

    try {
      const userData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        state: data.state,
        city: data.city,
        pinNumber: data.pinNumber,
        address: data.address,
        streetTower: data.streetTower,
        floorNumber: data.floorNumber,
        houseNumber: data.houseNumber,
        aadharCard: data.aadharCard,
        propertyID: data.propertyID,
        PPPID: data.PPPID,
        userType: data.userType,
        profilePicture: data.profilePicture?.[0],
      };

      const resultAction = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.colors.backgroundGradient} p-0 md:p-4 relative overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen md:min-h-full relative bg-white backdrop-blur-lg shadow-xl border border-white/20 md:rounded-2xl w-full max-w-2xl p-8"
      >
        <div className="flex justify-center mb-6">
          <div
            className={`bg-[${themeColors.primary}]/20 p-3 rounded-full shadow-md`}
          >
            <Building
              className={`h-10 w-10 text-[${themeColors.primaryDark}]`}
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join {theme.name} to manage your society experience
        </p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Improved Step indicator using theme variables */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => step > 1 && setStep(1)}
                disabled={step < 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  step >= 1
                    ? `bg-[${themeColors.secondary}] text-white shadow-md`
                    : "bg-gray-200 text-gray-600"
                } ${
                  step > 1
                    ? "cursor-pointer hover:bg-[${themeColors.secondaryDark}]"
                    : ""
                }`}
              >
                1
              </button>
              <div
                className={`w-16 h-2 transition-all duration-300 ${
                  step >= 2 ? `bg-[${themeColors.secondary}]` : "bg-gray-200"
                }`}
              ></div>
              <button
                type="button"
                onClick={() => step > 2 && setStep(2)}
                disabled={step < 2}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  step >= 2
                    ? `bg-[${themeColors.secondary}] text-white shadow-md`
                    : "bg-gray-200 text-gray-600"
                } ${
                  step > 2
                    ? "cursor-pointer hover:bg-[${themeColors.secondaryDark}]"
                    : ""
                }`}
              >
                2
              </button>
              <div
                className={`w-16 h-2 transition-all duration-300 ${
                  step >= 3 ? `bg-[${themeColors.secondary}]` : "bg-gray-200"
                }`}
              ></div>
              <button
                type="button"
                disabled={step < 3}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                  step >= 3
                    ? `bg-[${themeColors.secondary}] text-white shadow-md`
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </button>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  id="firstName"
                  placeholder={PLACEHOLDERS.firstName}
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />

                <Input
                  label="Last Name"
                  id="lastName"
                  placeholder={PLACEHOLDERS.lastName}
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />
              </div>

              <Radio
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                {...register("gender")}
                error={errors.gender?.message}
              />

              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder={PLACEHOLDERS.email}
                {...register("email")}
                error={errors.email?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <Input
                label="Phone Number"
                id="phoneNumber"
                placeholder={PLACEHOLDERS.phoneNumber}
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder={PLACEHOLDERS.password}
                {...register("password")}
                error={errors.password?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder={PLACEHOLDERS.confirmPassword}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className={`bg-[${themeColors.secondary}] text-white hover:bg-[${themeColors.secondaryDark}] focus:ring-[${themeColors.primary}]`}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Address Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="State"
                      id="state"
                      options={STATES}
                      error={errors.state?.message}
                      fullWidth
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                        handleStateChange(value);
                      }}
                      value={field.value}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      name={field.name}
                    />
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="City"
                      id="city"
                      options={getCitiesForState(watch("state"))}
                      error={errors.city?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </div>

              <Input
                label="PIN Code"
                id="pinNumber"
                placeholder={PLACEHOLDERS.pinNumber}
                {...register("pinNumber")}
                error={errors.pinNumber?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <Input
                label="Address"
                id="address"
                placeholder={PLACEHOLDERS.address}
                {...register("address")}
                error={errors.address?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Street/Tower"
                  id="streetTower"
                  placeholder={PLACEHOLDERS.streetTower}
                  {...register("streetTower")}
                  error={errors.streetTower?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />

                <Input
                  label="Floor Number"
                  id="floorNumber"
                  placeholder={PLACEHOLDERS.floorNumber}
                  {...register("floorNumber")}
                  error={errors.floorNumber?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />

                <Input
                  label="House/Flat Number"
                  id="houseNumber"
                  placeholder={PLACEHOLDERS.houseNumber}
                  {...register("houseNumber")}
                  error={errors.houseNumber?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  leftIcon={<ArrowLeft size={16} />}
                  className={`border border-[${themeColors.primary}] text-[${themeColors.primary}] hover:bg-[${themeColors.primary}]/10`}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className={`bg-[${themeColors.secondary}] text-white hover:bg-[${themeColors.secondaryDark}] focus:ring-[${themeColors.primary}]`}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Additional Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Information
              </h3>

              <Input
                label="Aadhar Card Number"
                id="aadharCard"
                placeholder={PLACEHOLDERS.aadharCard}
                {...register("aadharCard")}
                error={errors.aadharCard?.message}
                fullWidth
                className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Property ID (Optional)"
                  id="propertyID"
                  placeholder={PLACEHOLDERS.propertyID}
                  {...register("propertyID")}
                  error={errors.propertyID?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />

                <Input
                  label="PPPID (Optional)"
                  id="PPPID"
                  placeholder={PLACEHOLDERS.PPPID}
                  {...register("PPPID")}
                  error={errors.PPPID?.message}
                  fullWidth
                  className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="userType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="User Type"
                      id="userType"
                      options={[
                        { value: "owner", label: "Owner" },
                        { value: "tenant", label: "Tenant" },
                      ]}
                      error={errors.userType?.message}
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profilePreview ? (
                      <img
                        src={profilePreview || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <FileInput
                    id="profilePicture"
                    accept="image/*"
                    {...register("profilePicture")}
                    onChange={(e) => {
                      register("profilePicture").onChange(e);
                      handleProfileImageChange(e);
                    }}
                    error={errors.profilePicture?.message?.toString()}
                    helperText="Upload a profile picture (max 5MB)"
                  />
                </div>
              </div>

              <Checkbox
                id="agreeToTerms"
                label={
                  <span>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className={`text-[${themeColors.primary}] hover:text-[${themeColors.primaryDark}]`}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className={`text-[${themeColors.primary}] hover:text-[${themeColors.primaryDark}]`}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                }
                {...register("agreeToTerms")}
                error={errors.agreeToTerms?.message}
              />

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  leftIcon={<ArrowLeft size={16} />}
                  className={`border border-[${themeColors.primary}] text-[${themeColors.primary}] hover:bg-[${themeColors.primary}]/10`}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  isLoading={loading}
                  className={`bg-[${themeColors.secondary}] text-white hover:bg-[${themeColors.secondaryDark}] focus:ring-[${themeColors.primary}]`}
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`text-[${themeColors.primary}] hover:text-[${themeColors.primaryDark}]`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
