"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ExternalLink } from "lucide-react";
import { adminApi, publicApi } from "@/lib/api";
import { Education } from "@/types";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function AdminEducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field_of_study: "Law",
    start_year: new Date().getFullYear(),
    end_year: "" as string | number,
    is_current: false,
    description: "",
    achievements: "",
    certificate_url: "",
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await publicApi.getEducation();
      setItems(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (item?: Education) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        institution: item.institution,
        degree: item.degree,
        field_of_study: item.field_of_study,
        start_year: item.start_year,
        end_year: item.end_year || "",
        is_current: item.is_current,
        description: item.description || "",
        achievements: item.achievements ? item.achievements.join(", ") : "",
        certificate_url: item.certificate_url || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        institution: "",
        degree: "",
        field_of_study: "Law",
        start_year: new Date().getFullYear(),
        end_year: "",
        is_current: false,
        description: "",
        achievements: "",
        certificate_url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      ...formData,
      start_year: Number(formData.start_year),
      end_year: formData.is_current ? null : formData.end_year ? Number(formData.end_year) : null,
      achievements: formData.achievements
        ? formData.achievements.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    if (editingItem) {
      await adminApi.updateEducation(editingItem.id, payload);
    } else {
      await adminApi.createEducation(payload);
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await adminApi.deleteEducation(id);
      loadData();
    }
  };

  const columns = [
    {
      header: "Degree & Field",
      accessor: (item: Education) => (
        <div>
          <p className="font-semibold text-gray-900">{item.degree}</p>
          <p className="text-xs text-gray-500">{item.field_of_study}</p>
        </div>
      ),
    },
    {
      header: "Institution",
      accessor: "institution" as keyof Education,
    },
    {
      header: "Period",
      accessor: (item: Education) => (
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100">
          {item.start_year} — {item.is_current ? "Present" : item.end_year}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: Education) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            Education Milestones
          </h1>
          <p className="text-sm text-gray-500">
            Manage your degrees, certifications, and academic achievements.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Education
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        emptyMessage="No education milestones added yet."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Education" : "Add Education"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Institution Name *
            </label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g. University of Lagos / Nigerian Law School"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Degree / Qualification *
              </label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. Bachelor of Laws (LL.B)"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                required
                value={formData.field_of_study}
                onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                placeholder="e.g. Law"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Start Year *
              </label>
              <input
                type="number"
                required
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: Number(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                End Year
              </label>
              <input
                type="number"
                disabled={formData.is_current}
                value={formData.end_year}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
                placeholder="Leave blank if current"
                className="input-field disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_current"
              checked={formData.is_current}
              onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
              className="rounded text-[#1a365d] focus:ring-[#1a365d]"
            />
            <label htmlFor="is_current" className="text-sm text-gray-700">
              I am currently studying here
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description / Notes
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Key Achievements (Comma separated)
            </label>
            <input
              type="text"
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              placeholder="e.g. Dean's Honour Roll, Best Advocate"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Certificate Link (Optional URL)
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
              Save Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}