"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function SettingsPage() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const supabase = createClient();
      
      // Upload to 'avatars' bucket
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      alert('Avatar uploaded successfully!');

    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg mb-2">Settings</h1>
        <p className="text-on-surface-variant font-body-md">Manage your account and preferences</p>
      </div>

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-8">
        <h2 className="text-lg font-bold mb-4">Profile Picture</h2>
        <p className="text-sm text-on-surface-variant mb-4">Upload a new avatar to Supabase Storage.</p>
        
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
            )}
          </div>
          
          <div>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              className="hidden"
            />
            <label 
              htmlFor="single" 
              className="cursor-pointer bg-primary text-on-primary px-4 py-2 rounded-lg font-bold inline-block hover:brightness-110"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
