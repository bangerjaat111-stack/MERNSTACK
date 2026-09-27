import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext.jsx';
import { RiUploadCloud2Line, RiCloseLine, RiImageAddLine } from 'react-icons/ri';

export default function ImageUploader({ images = [], onChange, maxImages = 6 }) {
  const { dark } = useTheme();
  const [dragActive, setDragActive] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const maxWidth = 1200;
          const maxHeight = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => resolve(event.target.result);
      };
    });
  };

  const handleFiles = async (files) => {
    const fileList = Array.from(files);
    const compressedImages = [];

    for (const file of fileList) {
      if (images.length + compressedImages.length >= maxImages) break;
      if (!file.type.startsWith('image/')) continue;

      try {
        const compressed = await compressImage(file);
        compressedImages.push(compressed);
      } catch (err) {
        console.error('Image compression failed:', err);
      }
    }

    if (compressedImages.length > 0 && onChange) {
      onChange([...images, ...compressedImages]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    if (onChange) onChange(updated);
  };

  const border = dark ? 'border-red-900/30' : 'border-slate-300';
  const textHi = dark ? 'text-gray-50' : 'text-slate-900';
  const textSb = dark ? 'text-white/55' : 'text-slate-500';

  return (
    <div className="space-y-4">
      {/* Upload Dropzone Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
          dragActive
            ? 'border-red-500 bg-red-500/10'
            : dark
            ? `${border} bg-white/4 hover:border-red-500/50`
            : `${border} bg-slate-50 hover:border-amber-500`
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-2 pointer-events-none">
          <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${dark ? 'bg-red-900/20 text-red-400' : 'bg-amber-100 text-amber-600'}`}>
            <RiUploadCloud2Line size={28} />
          </div>
          <h4 className={`text-xs sm:text-sm font-bold ${textHi}`}>
            Drag &amp; drop car photos here, or <span className="text-red-500 underline">browse</span>
          </h4>
          <p className={`text-[11px] ${textSb}`}>
            Upload exterior, interior &amp; engine photos (Up to {maxImages} photos, PNG, JPG, WEBP)
          </p>
        </div>
      </div>

      {/* Uploaded Images Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className={textHi}>Uploaded Photos ({images.length}/{maxImages})</span>
            <span className="text-slate-400 text-[10px]">Click ✕ on photo to remove</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-black/40">
                <img src={imgUrl} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors border-none cursor-pointer"
                  title="Remove Image"
                >
                  <RiCloseLine size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
