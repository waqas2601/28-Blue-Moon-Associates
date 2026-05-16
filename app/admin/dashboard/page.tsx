
import { supabase } from "@/lib/supabase";
import { Users, Building2, FileText, TrendingUp } from "lucide-react";

export default async function Dashboard() {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  ).toISOString();

  const [
    { count: leadsCount },
    { count: propertiesCount },
    { count: blogsCount },
    { data: recentLeads },
    { count: thisMonthCount },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth),
  ]);

  const stats = [
    {
      title: "Total Leads",
      value: leadsCount || 0,
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      title: "Properties",
      value: propertiesCount || 0,
      icon: Building2,
      color: "bg-[#29ABE2]",
      lightColor: "bg-[#29ABE2]/10",
      textColor: "text-[#29ABE2]",
    },
    {
      title: "Blog Posts",
      value: blogsCount || 0,
      icon: FileText,
      color: "bg-[#C9963A]",
      lightColor: "bg-[#C9963A]/10",
      textColor: "text-[#C9963A]",
    },
    {
      title: "This Month",
      value: thisMonthCount || 0,
      icon: TrendingUp,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#4A4A4A]">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.lightColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#4A4A4A]">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#4A4A4A]">Recent Leads</h2>

          <a
            href="/admin/leads"
            className="text-sm text-[#29ABE2] hover:underline font-medium"
          >
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Society
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads && recentLeads.length > 0 ? (
                recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-[#4A4A4A]">
                      <a href="/admin/leads" className="hover:text-[#29ABE2] transition-colors">
                        {lead.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.purpose || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.society || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#29ABE2]/10 text-[#29ABE2] text-xs rounded-full font-medium">
                        {lead.source_page || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No leads yet. They will appear here when someone fills the
                    contact form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
