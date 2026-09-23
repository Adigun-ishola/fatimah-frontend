"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { adminApi, publicApi } from "@/lib/api";
import { LegalJourneyEntry } from "@/types";
import { JOURNEY_CATEGORIES } from "@/lib/constants";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type JourneyCategory = LegalJourneyEntry["category"];

export default function AdminLegalJourneyPage() {
  const [items, setItems] = useState<LegalJourneyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LegalJourneyEntry | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    organization: string;
    role: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
    highlights: string;
    category: JourneyCategory;
  }>({
    title: "",
    organization: "",
    role: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    is_current: false,
    description: "",
    highlights: "",
    category: "moot_court",
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await publicApi.getLegalJourney();
      setItems(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (item?: LegalJourneyEntry) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        organization: item.organization,
        role: item.role,
        start_date: item.start_date ? item.start_date.split("T")[0] : "",
        end_date: item.end_date ? item.end_date.split("T")[0] : "",
        is_current: item.is_current,
        description: item.description || "",
        highlights: item.highlights ? item.highlights.join(", ") : "",
        category: item.category,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        organization: "",
        role: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: "",
        is_current: false,
        description: "",
        highlights: "",
        category: "moot_court",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<LegalJourneyEntry> = {
      ...formData,
      end_date: formData.is_current ? null : formData.end_date || null,
      highlights: formData.highlights
        ? formData.highlights.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    if (editingItem) {
      await adminApi.updateJourneyEntry(editingItem.id, payload);
    } else {
      await adminApi.createJourneyEntry(payload);
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this milestone?")) {
      await adminApi.deleteJourneyEntry(id);
      loadData();
    }
  };

  const columns = [
    {
      header: "Role & Organization",
      accessor: (item: LegalJourneyEntry) => (
        <div>
          <p className="font-semibold text-gray-900">{item.role}</p>
          <p className="text-xs text-gray-500">{item.organization}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: LegalJourneyEntry) => {
        const cat = JOURNEY_CATEGORIES[item.category as keyof typeof JOURNEY_CATEGORIES];
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat?.color || "bg-gray-100 text-gray-600"}`}>
            {cat?.label || item.category}
          </span>
        );
      },
    },
    {
      header: "Duration",
      accessor: (item: LegalJourneyEntry) => (
        <span className="text-xs text-gray-600">
          {new Date(item.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} —{" "}
          {item.is_current ? "Present" : item.end_date ? new Date(item.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: LegalJourneyEntry) => (
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
            Legal Journey Milestones
          </h1>
          <p className="text-sm text-gray-500">
            Document moot court competitions, internships, legal clinics, and advocacy work.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Milestone
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        emptyMessage="No legal journey entries yet. Click 'Add Milestone' to begin."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Legal Journey Entry" : "Add Journey Milestone"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Title / Activity Name *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. National Moot Court Championship"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Organization / Institution *
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Law Clinic Society"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Role / Capacity *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Lead Counsel / Legal Intern"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as JourneyCategory })}
              className="input-field"
            >
              <option value="moot_court">Moot Court</option>
              <option value="internship">Internship</option>
              <option value="clinic">Legal Clinic</option>
              <option value="competition">Competition</option>
              <option value="volunteer">Volunteer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                disabled={formData.is_current}
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
              I am currently in this position / role
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Description / Responsibilities
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary of your contributions and key responsibilities..."
              className="input-field resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Key Highlights (Comma separated)
            </label>
            <input
              type="text"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder="Drafted appellate briefs, Argued constitutional rights motions"
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Milestone
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}