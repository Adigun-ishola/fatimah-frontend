"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { adminApi, publicApi } from "@/lib/api";
import { Achievement } from "@/types";
import { ACHIEVEMENT_CATEGORIES } from "@/lib/constants";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type AchievementCategory = "leadership" | "academic" | "award" | "certificate" | "community";

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    organization: string;
    date_received: string;
    description: string;
    category: AchievementCategory;
    certificate_url: string;
  }>({
    title: "",
    organization: "",
    date_received: new Date().toISOString().split("T")[0],
    description: "",
    category: "leadership",
    certificate_url: "",
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await publicApi.getAchievements();
      setItems(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (item?: Achievement) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        organization: item.organization,
        date_received: item.date_received ? item.date_received.split("T")[0] : "",
        description: item.description || "",
        category: item.category as AchievementCategory,
        certificate_url: item.certificate_url || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        organization: "",
        date_received: new Date().toISOString().split("T")[0],
        description: "",
        category: "leadership",
        certificate_url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<Achievement> = {
      ...formData,
    };

    if (editingItem) {
      await adminApi.updateAchievement(editingItem.id, payload);
    } else {
      await adminApi.createAchievement(payload);
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      await adminApi.deleteAchievement(id);
      loadData();
    }
  };

  const columns = [
    {
      header: "Title & Organization",
      accessor: (item: Achievement) => (
        <div>
          <p className="font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-500">{item.organization}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: Achievement) => {
        const cat = ACHIEVEMENT_CATEGORIES[item.category as keyof typeof ACHIEVEMENT_CATEGORIES];
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat?.color || "bg-gray-100 text-gray-600"}`}>
            {cat?.label || item.category}
          </span>
        );
      },
    },
    {
      header: "Date Awarded",
      accessor: (item: Achievement) =>
        new Date(item.date_received).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
    },
    {
      header: "Actions",
      accessor: (item: Achievement) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
            Leadership & Achievements
          </h1>
          <p className="text-sm text-gray-500">
            Showcase awards, leadership roles, honorary mentions, and certifications.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Achievement
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        emptyMessage="No achievements added yet."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Achievement" : "Add Achievement / Award"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Achievement Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Best Oralist / President, Law Students Association"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Conferring Body / Organization *
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Nigerian Bar Association / Faculty of Law"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as AchievementCategory })}
                className="input-field"
              >
                <option value="leadership">Leadership Position</option>
                <option value="academic">Academic Excellence</option>
                <option value="award">Award / Recognition</option>
                <option value="certificate">Certification</option>
                <option value="community">Community Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Date Received *
            </label>
            <input
              type="date"
              required
              value={formData.date_received}
              onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description / Significance
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explain the background or significance of this recognition..."
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Certificate / Proof URL (Optional)
            </label>
            <input
              type="url"
              value={formData.certificate_url}
              onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
              placeholder="https://..."
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Achievement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}