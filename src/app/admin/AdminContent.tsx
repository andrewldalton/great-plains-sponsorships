"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Users,
  Eye,
  FileText,
  ArrowLeft,
  RefreshCw,
  Mail,
  Building2,
  Calendar,
  TrendingUp,
  Globe,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  orgType: string;
  message: string;
  timestamp: string;
  status: string;
}

interface Analytics {
  totalPageviews: number;
  weeklyPageviews: number;
  monthlyPageviews: number;
  totalFormSubmissions: number;
  topPages: { page: string; views: number }[];
  dailyViews: { date: string; views: number }[];
  topReferrers: { source: string; views: number }[];
}

type Tab = "overview" | "leads" | "analytics";

export default function AdminContent() {
  const [tab, setTab] = useState<Tab>("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, analyticsRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/analytics"),
      ]);
      const leadsData = await leadsRes.json();
      const analyticsData = await analyticsRes.json();
      setLeads(leadsData.leads || []);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    {
      icon: Eye,
      label: "Page Views (This Week)",
      value: analytics?.weeklyPageviews ?? 0,
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Eye,
      label: "Page Views (This Month)",
      value: analytics?.monthlyPageviews ?? 0,
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: FileText,
      label: "Form Submissions",
      value: analytics?.totalFormSubmissions ?? 0,
      color: "text-gps-green bg-gps-green/10",
    },
    {
      icon: Users,
      label: "Total Leads",
      value: leads.length,
      color: "text-gps-gold bg-gps-gold/10",
    },
  ];

  const maxDailyViews = Math.max(
    ...(analytics?.dailyViews?.map((d) => d.views) || [1]),
    1
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image
              src="/images/gps-logo.png"
              alt="GPS"
              width={40}
              height={40}
            />
            <div>
              <p className="font-bold text-gps-slate text-sm">GPS Admin</p>
              <p className="text-xs text-gps-gray">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "overview" as Tab, icon: BarChart3, label: "Overview" },
            { id: "leads" as Tab, icon: Users, label: "Leads" },
            { id: "analytics" as Tab, icon: TrendingUp, label: "Analytics" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                tab === item.id
                  ? "bg-gps-green/10 text-gps-green"
                  : "text-gps-gray hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gps-gray hover:text-gps-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gps-slate capitalize">
            {tab}
          </h1>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gps-gray hover:text-gps-green border border-gray-200 rounded-lg hover:border-gps-green/20 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                    >
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gps-slate">
                    {card.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-gps-gray mt-1">{card.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gps-slate">
                  Recent Leads
                </h2>
              </div>
              {leads.length === 0 ? (
                <div className="p-12 text-center text-gps-gray">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No leads yet. They&apos;ll appear here when someone submits the contact form.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 px-6 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gps-green/10 flex items-center justify-center text-gps-green font-semibold text-sm">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gps-slate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-gps-gray">
                            {lead.organization || lead.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            lead.status === "new"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {lead.status}
                        </span>
                        <p className="text-xs text-gps-gray mt-1">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {tab === "leads" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Name
                    </th>
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Email
                    </th>
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Organization
                    </th>
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Type
                    </th>
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Date
                    </th>
                    <th className="text-left text-xs font-semibold text-gps-gray uppercase tracking-wider px-6 py-4">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gps-gray">
                        No leads yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gps-slate whitespace-nowrap">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gps-gray">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gps-gray">
                          {lead.organization || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gps-gray">
                          {lead.orgType || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gps-gray whitespace-nowrap">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gps-gray max-w-xs truncate">
                          {lead.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === "analytics" && (
          <div className="space-y-8">
            {/* Daily Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gps-slate mb-6">
                Page Views (Last 7 Days)
              </h2>
              <div className="flex items-end gap-2 h-48">
                {(analytics?.dailyViews || []).map((day) => (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <span className="text-xs text-gps-gray font-medium">
                      {day.views}
                    </span>
                    <div
                      className="w-full bg-gps-green/20 rounded-t-lg transition-all hover:bg-gps-green/40"
                      style={{
                        height: `${Math.max((day.views / maxDailyViews) * 100, 4)}%`,
                      }}
                    />
                    <span className="text-xs text-gps-gray">
                      {new Date(day.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Top Pages */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gps-slate mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gps-green" />
                  Top Pages
                </h2>
                {(analytics?.topPages || []).length === 0 ? (
                  <p className="text-sm text-gps-gray">No data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics?.topPages.map((page) => (
                      <div
                        key={page.page}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gps-slate font-mono">
                          {page.page}
                        </span>
                        <span className="text-sm font-semibold text-gps-green">
                          {page.views}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Referrers */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gps-slate mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gps-green" />
                  Top Referrers
                </h2>
                {(analytics?.topReferrers || []).length === 0 ? (
                  <p className="text-sm text-gps-gray">No data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {analytics?.topReferrers.map((ref) => (
                      <div
                        key={ref.source}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gps-slate">
                          {ref.source}
                        </span>
                        <span className="text-sm font-semibold text-gps-green">
                          {ref.views}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
