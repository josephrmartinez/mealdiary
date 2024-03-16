'use client'

import { ChangeEvent, useState } from 'react';

interface ImageUploaderProps {
    onUpload: (image: File) => void;
  }
  

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setPreviewUrl(URL.createObjectURL(resizedImage));
        onUpload(resizedImage)
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          let { width, height } = img;
  
          // Calculate cropping dimensions
          let cropX = 0;
          let cropY = 0;
          let croppedWidth = width;
          let croppedHeight = height;
  
          if (width > height) {
            // Landscape orientation
            const diff = (width - height) / 2;
            cropX = diff;
            croppedWidth = height;
          } else if (height > width) {
            // Portrait orientation
            const diff = (height - width) / 2;
            cropY = diff;
            croppedHeight = width;
          }
  
          // Draw image onto canvas with cropping
          canvas.width = croppedWidth;
          canvas.height = croppedHeight;
          ctx.drawImage(img, cropX, cropY, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);
  
          // Create an off-screen canvas for resizing
          const resizedCanvas = document.createElement('canvas');
          const resizedCtx = resizedCanvas.getContext('2d')!;
          resizedCanvas.width = 512;
          resizedCanvas.height = 512;
  
          // Resize the cropped image to 512x512
          resizedCtx.drawImage(canvas, 0, 0, croppedWidth, croppedHeight, 0, 0, 512, 512);
  
          // Convert canvas to Blob
          resizedCanvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to convert canvas to Blob'));
            }
          }, file.type);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
        try {
          const resizedImage = await resizeImage(file);
          setPreviewUrl(URL.createObjectURL(resizedImage));
          onUpload(resizedImage)
        } catch (error) {
          console.error('Error resizing image:', error);
        }
      }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  const handleClick = () => {
    document.getElementById('imageInput')?.click();
  };

  return (
    <div
      className='flex flex-col items-center'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageInput"
      />

      <div
        className="border rounded-lg relative cursor-pointer overflow-hidden w-[512px] h-[512px]"
        onClick={handleClick}
      >
        {!previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-bold text-gray-500">Click here to add an image</p>
          </div>
        )}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;