import React, { useState } from 'react';
import { Camera, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    };
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently joined';

  return (
    <div className="min-h-screen bg-base-100 px-4 py-10 text-base-content">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-3xl border border-base-300 bg-base-200 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-2 text-sm opacity-70">Your profile information</p>
          </div>

          <div className="mb-8 flex flex-col items-center">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || 'https://placehold.co/160x160/171717/f59e0b?text=User'}
                alt={authUser?.fullName || 'Profile'}
                className="h-32 w-32 rounded-full border-4 border-primary/30 object-cover shadow-lg"
              />

              <label
                htmlFor="profile-upload"
                className={`absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-content transition ${
                  isUpdatingProfile ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:brightness-95'
                }`}
              >
                {isUpdatingProfile ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Camera size={18} />
                )}
              </label>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>

            <p className="mt-4 text-sm opacity-70">
              {isUpdatingProfile ? 'Uploading photo...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          <div className="space-y-5">
            <div className="form-control w-full">
              <label className="mb-2 block text-sm font-medium text-base-content">
                <span>Full Name</span>
              </label>
              <div className="relative border border-base-300 bg-base-100">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
                <input
                  type="text"
                  readOnly
                  value={authUser?.fullName || ''}
                  className="h-12 w-full bg-transparent pl-10 pr-4 outline-none"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="mb-2 block text-sm font-medium text-base-content">
                <span>Email Address</span>
              </label>
              <div className="relative border border-base-300 bg-base-100">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
                <input
                  type="email"
                  readOnly
                  value={authUser?.email || ''}
                  className="h-12 w-full bg-transparent pl-10 pr-4 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-base-300 bg-base-200 p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-primary">Account Information</h2>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex flex-col gap-1 border-b border-base-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="opacity-70">Member Since</span>
              <span className="font-medium">{memberSince}</span>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="opacity-70">Account Status</span>
              <span className="font-semibold text-success">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
