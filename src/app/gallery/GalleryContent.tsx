"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { publicApi } from "@/lib/api";
import { GalleryImage } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GalleryContent() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await publicApi.getGallery();
        setImages(response.data.data || []);
      } catch (error) {
        console.log("No gallery images yet");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["all", ...new Set(images.map((img) => img.category))];
  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    const currentIndex = filtered.findIndex(
      (img) => img.id === selectedImage.id
    );
    if (direction === "prev" && currentIndex > 0) {
      setSelectedImage(filtered[currentIndex - 1]);
    }
    if (direction === "next" && currentIndex < filtered.length - 1) {
      setSelectedImage(filtered[currentIndex + 1]);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-primary">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-4">
              <span className="text-[#c9a84c]">Gallery</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Moments captured from the journey of Jimoh-Sulaiman Fatima Adesewa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mb-12 justify-center">
              <Filter className="w-4 h-4 text-gray-400" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                    activeCategory === cat
                      ? "bg-[#1a365d] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <LoadingSpinner />
          ) : filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={image.thumbnail_url || image.image_url}
                      alt={image.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium text-sm">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a365d] font-['Playfair_Display'] mb-2">
                Gallery Coming Soon
              </h3>
              <p className="text-gray-500">
                Photos and memories from Jimoh-Sulaiman Fatima Adesewa&apos;s
                journey will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-[#c9a84c]"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 p-2 text-white hover:text-[#c9a84c]"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-medium">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 p-2 text-white hover:text-[#c9a84c]"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}