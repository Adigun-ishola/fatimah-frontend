"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Camera } from "lucide-react";
import { adminApi, publicApi } from "@/lib/api";
import { GalleryImage } from "@/types";
import ImageUpload from "@/components/ui/ImageUpload";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    thumbnail_url: "",
    category: "general",
  });

  const loadGallery = async () => {
    try {
      setIsLoading(true);
      const res = await publicApi.getGallery();
      setImages(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      alert("Please upload an image first.");
      return;
    }

    await adminApi.addGalleryImage(formData);
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      thumbnail_url: "",
      category: "general",
    });
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this photo from gallery?")) {
      await adminApi.deleteGalleryImage(id);
      loadGallery();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
            Photo Gallery
          </h1>
          <p className="text-sm text-gray-500">
            Upload and organize photos from moot courts, conferences, and law school events.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Photo
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-gray-500">Loading gallery...</div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <img
                src={img.thumbnail_url || img.image_url}
                alt={img.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {img.title}
                </p>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                  {img.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-500">
          <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p>No photos in gallery yet. Click 'Add Photo' to upload!</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Photo to Gallery"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. National Moot Court Championship 2024"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option value="general">General</option>
              <option value="moot_court">Moot Court</option>
              <option value="academics">Academics</option>
              <option value="leadership">Leadership</option>
              <option value="events">Events</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Upload Image *
            </label>
            <ImageUpload
              folder="gallery"
              currentImage={formData.image_url}
              onUpload={(url, thumb) =>
                setFormData({
                  ...formData,
                  image_url: url,
                  thumbnail_url: thumb || url,
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Caption / Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Photo
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}