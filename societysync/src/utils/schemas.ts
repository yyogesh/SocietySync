import { z } from "zod";

// Signup Schema Validation
export const signupSchema = z.object({
    firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
    lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
    gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
    emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
    // profilePicture: z.instanceof(File, { message: "Profile picture is required" }),
    profilePicture: z.any()
    .refine((files) => files?.[0] instanceof File, { message: "Profile picture is required" })
    .refine((files) => files?.[0]?.size <= 3 * 1024 * 1024, { message: "File size must be less than 3MB" }),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pinNumber: z.string().min(6, "Pin number must be 6 digits").max(6, "Pin number must be 6 digits"),
    address: z.string().min(1, "Address is required"),
    streetTower: z.string().min(1, "Street/Tower is required"),
    floorNumber: z.string().min(1, "Floor Number is required"),
    houseNumber: z.string().min(1, "House Number is required"),
    aadharCard: z.string().min(10, "Aadhar Card must be 10 digits").max(10, "Aadhar Card must be 10 digits"),
    agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error message;
});

export type SignupFormData = z.infer<typeof signupSchema>;


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})
