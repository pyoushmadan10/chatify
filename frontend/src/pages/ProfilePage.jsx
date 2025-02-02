import { useState, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Camera, Mail, User, Calendar, Shield } from "lucide-react"
import { motion } from "framer-motion"

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <motion.div
        className="max-w-3xl mx-auto p-6"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="bg-zinc-800 rounded-3xl p-8 shadow-2xl space-y-10" variants={itemVariants}>
          <motion.div className="text-center" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-zinc-100 mb-2">Profile</h1>
            <p className="text-lg text-zinc-400">Your personal information</p>
          </motion.div>

          <motion.div className="flex flex-col items-center gap-6" variants={itemVariants}>
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulsating-border"></div>
              <div className="absolute inset-[3px] rounded-full bg-zinc-800"></div>
              <motion.img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="relative w-40 h-40 rounded-full object-cover border-4 border-zinc-600 shadow-lg transition-all duration-300 group-hover:border-zinc-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2 
                  bg-zinc-700 hover:bg-zinc-600
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-300 ease-in-out
                  transform hover:scale-110
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-6 h-6 text-zinc-300" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 animate-pulse">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={itemVariants}>
            <ProfileItem icon={<User className="w-5 h-5" />} label="Full Name" value={authUser?.fullName} />
            <ProfileItem icon={<Mail className="w-5 h-5" />} label="Email Address" value={authUser?.email} />
          </motion.div>

          <motion.div className="mt-8 bg-zinc-700 rounded-2xl p-6 shadow-inner" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Account Information</h2>
            <div className="space-y-4 text-sm">
              <AccountInfoItem
                icon={<Calendar className="w-5 h-5 text-zinc-400" />}
                label="Member Since"
                value={authUser.createdAt?.split("T")[0]}
              />
              <AccountInfoItem
                icon={<Shield className="w-5 h-5 text-green-400" />}
                label="Account Status"
                value="Active"
                valueClass="text-green-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const ProfileItem = ({ icon, label, value }) => (
  <motion.div
    className="space-y-2"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="text-sm text-zinc-400 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="px-4 py-3 bg-zinc-700 rounded-lg text-zinc-100">{value}</p>
  </motion.div>
)

const AccountInfoItem = ({ icon, label, value, valueClass }) => (
  <motion.div
    className="flex items-center justify-between py-2 border-b border-zinc-600"
    whileHover={{ scale: 1.02, x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <span className="flex items-center gap-2 text-zinc-300">
      {icon}
      {label}
    </span>
    <span className={`font-medium ${valueClass || "text-zinc-100"}`}>{value}</span>
  </motion.div>
)

export default ProfilePage

