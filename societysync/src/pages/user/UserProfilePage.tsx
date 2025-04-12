import type React from "react"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileUpdateSchema, changePasswordSchema } from "../../utils/schemas"
import { User, Mail, Phone, Home, Lock, Camera, MapPin, CreditCard, Building } from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Select from "../../components/common/Select"
import Radio from "../../components/common/Radio"
import Textarea from "../../components/common/Textarea"
import Tabs from "../../components/common/Tabs"
import { useNotification } from "../../components/common/Notification"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import { updateUserProfile, changePassword } from "../../services/authService"

// Dummy Data for Select Options
const STATES = [
  { value: "state1", label: "State 1" },
  { value: "state2", label: "State 2" },
]
const CITIES = [
  { value: "city1", label: "City 1" },
  { value: "city2", label: "City 2" },
]

type ProfileFormData = {
  firstName: string
  lastName: string
  gender: "male" | "female" | "other"
  phoneNumber: string
  state: string
  city: string
  pinNumber: string
  address: string
  streetTower: string
  floorNumber: string
  houseNumber: string
  aadharCard: string
  propertyID?: string
  PPPID?: string
  profilePicture?: FileList
}

type PasswordFormData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const UserProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const { showNotification } = useNotification()

  const [profileImage, setProfileImage] = useState<string | null>(null)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control: profileControl,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.gender || "male",
      phoneNumber: user?.phoneNumber || "",
      state: user?.state || "",
      city: user?.city || "",
      pinNumber: user?.pinNumber || "",
      address: user?.address || "",
      streetTower: user?.streetTower || "",
      floorNumber: user?.floorNumber || "",
      houseNumber: user?.houseNumber || "",
      aadharCard: user?.aadharCard || "",
      propertyID: user?.propertyID || "",
      PPPID: user?.PPPID || "",
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "male",
        phoneNumber: user.phoneNumber || "",
        state: user.state || "",
        city: user.city || "",
        pinNumber: user.pinNumber || "",
        address: user.address || "",
        streetTower: user.streetTower || "",
        floorNumber: user.floorNumber || "",
        houseNumber: user.houseNumber || "",
        aadharCard: user.aadharCard || "",
        propertyID: user.propertyID || "",
        PPPID: user.PPPID || "",
      })

      if (user.profilePicture) {
        setProfileImage(user.profilePicture)
      }
    }
  }, [user, resetProfile])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const profileData: any = { ...data }

      if (data.profilePicture && data.profilePicture.length > 0) {
        profileData.profilePicture = data.profilePicture[0]
      } else {
        delete profileData.profilePicture
      }

      await dispatch(updateUserProfile(profileData)).unwrap()

      showNotification({
        type: "success",
        title: "Profile updated successfully",
        duration: 3000,
      })
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Failed to update profile",
        message: error.message,
        duration: 5000,
      })
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await dispatch(
        changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      ).unwrap()

      resetPassword()

      showNotification({
        type: "success",
        title: "Password changed successfully",
        duration: 3000,
      })
    } catch (error: any) {
      showNotification({
        type: "error",
        title: "Failed to change password",
        message: error.message,
        duration: 5000,
      })
    }
  }

  const ProfileTab = () => (
    <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt={user?.firstName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <label
              htmlFor="profile-picture"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <input
                type="file"
                id="profile-picture"
                className="hidden"
                accept="image/*"
                {...registerProfile("profilePicture")}
                onChange={(e) => {
                  registerProfile("profilePicture").onChange(e)
                  handleProfileImageChange(e)
                }}
              />
            </label>
          </div>
          <p className="mt-4 text-sm text-gray-500">Click the camera icon to upload a new profile picture</p>
          {profileErrors.profilePicture && (
            <p className="mt-1 text-sm text-red-600">{profileErrors.profilePicture.message?.toString()}</p>
          )}
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="firstName"
              {...registerProfile("firstName")}
              error={profileErrors.firstName?.message}
              leftIcon={<User className="w-5 h-5 text-gray-400" />}
              fullWidth
            />

            <Input
              label="Last Name"
              id="lastName"
              {...registerProfile("lastName")}
              error={profileErrors.lastName?.message}
              leftIcon={<User className="w-5 h-5 text-gray-400" />}
              fullWidth
            />
          </div>

          <Radio
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            {...registerProfile("gender")}
            error={profileErrors.gender?.message}
          />

          <Input
            label="Email Address"
            value={user?.emailAddress || ""}
            leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
            disabled
            fullWidth
            helperText="Email cannot be changed"
          />

          <Input
            label="Phone Number"
            id="phoneNumber"
            {...registerProfile("phoneNumber")}
            error={profileErrors.phoneNumber?.message}
            leftIcon={<Phone className="w-5 h-5 text-gray-400" />}
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="state"
              control={profileControl}
              render={({ field }) => (
                <Select
                  label="State"
                  id="state"
                  options={STATES}
                  error={profileErrors.state?.message}
                  fullWidth
                  {...field}
                />
              )}
            />

            <Controller
              name="city"
              control={profileControl}
              render={({ field }) => (
                <Select
                  label="City"
                  id="city"
                  options={CITIES}
                  error={profileErrors.city?.message}
                  fullWidth
                  {...field}
                />
              )}
            />
          </div>

          <Input
            label="Pin Number"
            id="pinNumber"
            {...registerProfile("pinNumber")}
            error={profileErrors.pinNumber?.message}
            leftIcon={<MapPin className="w-5 h-5 text-gray-400" />}
            fullWidth
          />

          <Textarea
            label="Address"
            id="address"
            {...registerProfile("address")}
            error={profileErrors.address?.message}
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Street/Tower"
              id="streetTower"
              {...registerProfile("streetTower")}
              error={profileErrors.streetTower?.message}
              leftIcon={<Building className="w-5 h-5 text-gray-400" />}
              fullWidth
            />

            <Input
              label="Floor Number"
              id="floorNumber"
              {...registerProfile("floorNumber")}
              error={profileErrors.floorNumber?.message}
              leftIcon={<Home className="w-5 h-5 text-gray-400" />}
              fullWidth
            />

            <Input
              label="House Number"
              id="houseNumber"
              {...registerProfile("houseNumber")}
              error={profileErrors.houseNumber?.message}
              leftIcon={<Home className="w-5 h-5 text-gray-400" />}
              fullWidth
            />
          </div>

          <Input
            label="Aadhar Card"
            id="aadharCard"
            {...registerProfile("aadharCard")}
            error={profileErrors.aadharCard?.message}
            leftIcon={<CreditCard className="w-5 h-5 text-gray-400" />}
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Property ID"
              id="propertyID"
              {...registerProfile("propertyID")}
              error={profileErrors.propertyID?.message}
              leftIcon={<Building className="w-5 h-5 text-gray-400" />}
              fullWidth
            />

            <Input
              label="PPPID"
              id="PPPID"
              {...registerProfile("PPPID")}
              error={profileErrors.PPPID?.message}
              leftIcon={<CreditCard className="w-5 h-5 text-gray-400" />}
              fullWidth
            />
          </div>

          <div className="pt-4">
            <Button type="submit" isLoading={loading}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  )

  const PasswordTab = () => (
    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="max-w-md mx-auto">
      <div className="space-y-4">
        <Input
          label="Current Password"
          id="currentPassword"
          type="password"
          {...registerPassword("currentPassword")}
          error={passwordErrors.currentPassword?.message}
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          fullWidth
        />

        <Input
          label="New Password"
          id="newPassword"
          type="password"
          {...registerPassword("newPassword")}
          error={passwordErrors.newPassword?.message}
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          fullWidth
        />

        <Input
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          {...registerPassword("confirmPassword")}
          error={passwordErrors.confirmPassword?.message}
          leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
          fullWidth
        />

        <div className="pt-4">
          <Button type="submit" isLoading={loading}>
            Change Password
          </Button>
        </div>
      </div>
    </form>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      <Card>
        <Tabs
          tabs={[
            { id: "profile", label: "Profile Information", content: <ProfileTab /> },
            { id: "password", label: "Change Password", content: <PasswordTab /> },
          ]}
        />
      </Card>
    </div>
  )
}

export default UserProfilePage
