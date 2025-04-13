import { z } from "zod"

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Signup Schema Validation
export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
    lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
    gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    profilePicture: z
      .any()
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
    propertyID: z.string().optional(),
    PPPID: z.string().optional(),
    userType: z.enum(["owner", "tenant", "maintenance"], { required_error: "User type is required" }),
    agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupFormData = z.infer<typeof signupSchema>

export const forgotPasswordSchema = z.object({
  emailAddress: z.string().email("Invalid email address"),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
  lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinNumber: z.string().min(6, "Pin number must be 6 digits").max(6, "Pin number must be 6 digits"),
  address: z.string().min(1, "Address is required"),
  streetTower: z.string().min(1, "Street/Tower is required"),
  floorNumber: z.string().min(1, "Floor Number is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  aadharCard: z.string().min(10, "Aadhar Card must be 10 digits").max(10, "Aadhar Card must be 10 digits"),
  propertyID: z.string().optional(),
  PPPID: z.string().optional(),
  profilePicture: z.any().optional(),
})

// User schemas
export const userCreateSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
  lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinNumber: z.string().min(6, "Pin number must be 6 digits").max(6, "Pin number must be 6 digits"),
  address: z.string().min(1, "Address is required"),
  streetTower: z.string().min(1, "Street/Tower is required"),
  floorNumber: z.string().min(1, "Floor Number is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  aadharCard: z.string().min(10, "Aadhar Card must be 10 digits").max(10, "Aadhar Card must be 10 digits"),
  propertyID: z.string().optional(),
  PPPID: z.string().optional(),
  role: z.enum(["admin", "resident", "security"]),
  userType: z.enum(["owner", "tenant"]),
  status: z.enum(["pending", "active", "inactive", "rejected"]).default("pending"),
  profilePicture: z.any().optional(),
  documents: z.array(z.any()).optional(),
})

export const userUpdateSchema = z.object({
  uid: z.string(),
  firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long").optional(),
  lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long").optional(),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }).optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .optional(),
  state: z.string().min(1, "State is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  pinNumber: z.string().min(6, "Pin number must be 6 digits").max(6, "Pin number must be 6 digits").optional(),
  address: z.string().min(1, "Address is required").optional(),
  streetTower: z.string().min(1, "Street/Tower is required").optional(),
  floorNumber: z.string().min(1, "Floor Number is required").optional(),
  houseNumber: z.string().min(1, "House Number is required").optional(),
  aadharCard: z.string().min(10, "Aadhar Card must be 10 digits").max(10, "Aadhar Card must be 10 digits").optional(),
  propertyID: z.string().optional(),
  PPPID: z.string().optional(),
  role: z.enum(["admin", "resident", "security"]).optional(),
  userType: z.enum(["owner", "tenant"]).optional(),
  status: z.enum(["pending", "active", "inactive", "rejected"]).optional(),
  profilePicture: z.any().optional(),
  documents: z.array(z.any()).optional(),
})

export const userApprovalSchema = z.object({
  uid: z.string(),
  status: z.enum(["active", "rejected"]),
  rejectionReason: z.string().optional().nullable(),
})

export const userDocumentUploadSchema = z.object({
  userId: z.string(),
  documentType: z.enum(["id_proof", "address_proof", "other"]),
  documentName: z.string().min(1, "Document name is required"),
  file: z
    .any()
    .refine((file) => file instanceof File, { message: "Document file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB" }),
})
