import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Radio from "../../components/common/Radio";
import FileInput from "../../components/common/FileInput";
import Textarea from "../../components/common/Textarea";
import Checkbox from "../../components/common/Checkbox";
import { motion } from "framer-motion";
import { Building } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { userRegister } from "../../services/authService";

// Signup Schema Validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
  lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
  profilePicture: z.instanceof(File, { message: "Profile picture is required" }),
  phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinNumber: z.string().min(6, "Pin number must be 6 digits").max(6, "Pin number must be 6 digits"),
  address: z.string().min(1, "Address is required"),
  streetTower: z.string().min(1, "Street/Tower is required"),
  floorNumber: z.string().min(1, "Floor Number is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  aadharCard: z.string().min(10, "Aadhar Card must be 10 digits").max(10, "Aadhar Card must be 10 digits"),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

// Placeholder Constants
const PLACEHOLDERS = {
  firstName: "Enter your first name",
  lastName: "Enter your last name",
  emailAddress: "Enter your email address",
  phoneNumber: "Enter your 10-digit phone number",
  password: "Enter your password",
  pinNumber: "Enter your 6-digit pin number",
  address: "Enter your address",
  streetTower: "Enter your street/tower",
  floorNumber: "Enter your floor number",
  houseNumber: "Enter your house number",
  aadharCard: "Enter your 10-digit Aadhar card number",
};

// Dummy Data for Select Options
const STATES = [
  { value: "state1", label: "State 1" },
  { value: "state2", label: "State 2" },
];
const CITIES = [
  { value: "city1", label: "City 1" },
  { value: "city2", label: "City 2" },
];

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const error = false;
  const loading = false;

  const onSubmit = async(data: SignupFormData) => {
    console.log("Signup Data:", data);
    userRegister(data);
   // await createUserWithEmailAndPassword(auth, data.emailAddress, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#64748B] p-0 md:p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen md:min-h-full relative bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 md:rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-3 rounded-full shadow-md">
            <Building className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome to SocietySync</h2>
        <p className="text-center text-gray-300 mb-6">Create an account to get started</p>

        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* First Name */}
          <div className="mb-4">
            <Input
              label={"First Name"}
              id="firstName"
              type="text"
              placeholder={PLACEHOLDERS.firstName}
              fullWidth
              required
              {...register("firstName")}
              error={errors.firstName?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <Input
              label={"Last Name"}
              id="lastName"
              type="text"
              placeholder={PLACEHOLDERS.lastName}
              fullWidth
              required
              {...register("lastName")}
              error={errors.lastName?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <Radio
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              {...register("gender")}
              error={errors.gender?.message}
              className="text-white"
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <Input
              label={"Email Address"}
              id="emailAddress"
              type="email"
              placeholder={PLACEHOLDERS.emailAddress}
              fullWidth
              required
              {...register("emailAddress")}
              error={errors.emailAddress?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <FileInput
              label={"Profile Picture"}
              id="profilePicture"
              required
              {...register("profilePicture")}
              error={errors.profilePicture?.message}
              className="bg-white/20 border-white/30 px-4 py-2 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Input
              label={"Phone Number"}
              id="phoneNumber"
              type="text"
              placeholder={PLACEHOLDERS.phoneNumber}
              fullWidth
              required
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Input
              label={"Password"}
              id="password"
              type="password"
              placeholder={PLACEHOLDERS.password}
              fullWidth
              required
              {...register("password")}
              error={errors.password?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* State */}
          <div className="mb-4">
            <Select
              label={"State"}
              id="state"
              options={STATES}
              fullWidth
              required
              {...register("state")}
              error={errors.state?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <Select
              label={"City"}
              id="city"
              options={CITIES}
              fullWidth
              required
              {...register("city")}
              error={errors.city?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Pin Number */}
          <div className="mb-4">
            <Input
              label={"Pin Number"}
              id="pinNumber"
              type="text"
              placeholder={PLACEHOLDERS.pinNumber}
              fullWidth
              required
              {...register("pinNumber")}
              error={errors.pinNumber?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <Textarea
              label={"Address"}
              id="address"
              placeholder={PLACEHOLDERS.address}
              fullWidth
              required
              {...register("address")}
              error={errors.address?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Street/Tower */}
          <div className="mb-4">
            <Input
              label={"Street/Tower"}
              id="streetTower"
              type="text"
              placeholder={PLACEHOLDERS.streetTower}
              fullWidth
              required
              {...register("streetTower")}
              error={errors.streetTower?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Floor Number */}
          <div className="mb-4">
            <Input
              label={"Floor Number"}
              id="floorNumber"
              type="text"
              placeholder={PLACEHOLDERS.floorNumber}
              fullWidth
              required
              {...register("floorNumber")}
              error={errors.floorNumber?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* House Number */}
          <div className="mb-4">
            <Input
              label={"House Number"}
              id="houseNumber"
              type="text"
              placeholder={PLACEHOLDERS.houseNumber}
              fullWidth
              required
              {...register("houseNumber")}
              error={errors.houseNumber?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Aadhar Card */}
          <div className="mb-6">
            <Input
              label={"Aadhar Card"}
              id="aadharCard"
              type="text"
              placeholder={PLACEHOLDERS.aadharCard}
              fullWidth
              required
              {...register("aadharCard")}
              error={errors.aadharCard?.message}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>

          {/* Agree to Terms */}
          <div className="mb-6">
            <Checkbox
              label="I agree that the above information is correct"
              id="agreeToTerms"
              {...register("agreeToTerms")}
              error={errors.agreeToTerms?.message}
              className="text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="bg-white text-gray-900 hover:bg-gray-200 focus:ring-white"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        {/* Link to Login Page */}
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?
            <Link to="/login" className="text-white font-semibold hover:underline ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;