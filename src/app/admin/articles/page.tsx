"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit2, Eye } from "lucide-react";
import { adminApi } from "@/lib/api";
import { Article } from "@/types";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getArticles(1, 100);
      setArticles(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await adminApi.deleteArticle(id);
      loadArticles();
    }
  };

  const columns = [
    {
      header: "Title",
      accessor: (item: Article) => (
        <div>
          <p className="font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-400">/{item.slug}</p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (item: Article) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            item.is_published
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.is_published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Read Time",
      accessor: (item: Article) => `${item.read_time_minutes} min`,
    },
    {
      header: "Actions",
      accessor: (item: Article) => (
        <div className="flex items-center gap-2">
          {item.is_published && (
            <Link
              href={`/articles/${item.slug}`}
              target="_blank"
              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
          <Link
            href={`/admin/articles/${item.id}`}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
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
            Legal Articles
          </h1>
          <p className="text-sm text-gray-500">
            Write, publish, and manage legal commentary and essays.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            New Article
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={articles}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        emptyMessage="No articles written yet. Click 'New Article' to publish your first piece!"
      />
    </div>
  );
}