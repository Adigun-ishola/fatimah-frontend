"use client";

import { useState, useEffect } from "react";
import { Mail, Check, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/api";
import { ContactMessage } from "@/types";
import DataTable from "@/components/admin/DataTable";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const res = await adminApi.getMessages(1);
      setMessages(res.data.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (id: string) => {
    await adminApi.markMessageRead(id);
    loadMessages();
  };

  const columns = [
    {
      header: "Sender",
      accessor: (item: ContactMessage) => (
        <div>
          <p className="font-semibold text-gray-900">{item.name}</p>
          <a
            href={`mailto:${item.email}`}
            className="text-xs text-blue-600 hover:underline"
          >
            {item.email}
          </a>
        </div>
      ),
    },
    {
      header: "Subject & Message",
      accessor: (item: ContactMessage) => (
        <div className="max-w-md">
          <p className="font-semibold text-gray-800 text-sm">{item.subject}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{item.message}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (item: ContactMessage) =>
        new Date(item.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      header: "Status",
      accessor: (item: ContactMessage) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            item.is_read
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-100 text-blue-700 font-semibold"
          }`}
        >
          {item.is_read ? "Read" : "Unread"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (item: ContactMessage) => (
        <div className="flex items-center gap-2">
          {!item.is_read && (
            <button
              onClick={() => handleMarkRead(item.id)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
              title="Mark as Read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
          Messages Inbox
        </h1>
        <p className="text-sm text-gray-500">
          Messages received through your website's contact form.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        emptyMessage="No inquiries received yet."
      />
    </div>
  );
}