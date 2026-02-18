"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentType";
import { useAuth, useUser, UserProfile } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { Bot, Crown, Mail, Sparkles, User2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function Profile() {
  const { user } = useUser();
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: "unlimited_plan" });
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [agentList, setAgentList] = useState<Agent[]>([]);

  useEffect(() => {
    if (userDetail?._id) {
      GetUserAgents();
    }
  }, [userDetail?._id]);

  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail._id,
    });
    setAgentList(result);
  };

  const publishedCount = agentList.filter((agent) => agent.published).length;
  const remainingCredits =
    typeof userDetail?.totalRemainingCredits === "number"
      ? userDetail.totalRemainingCredits
      : Math.max(0, 2 - agentList.length);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-100 to-white p-6 md:p-8 lg:p-10 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Dashboard</p>
              <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Manage your identity, plan, and workspace usage.
              </p>
            </div>
            <Badge
              className={`rounded-full px-4 py-1.5 text-sm ${
                isPaidUser
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
              }`}
            >
              {isPaidUser ? "Unlimited Plan" : "Free Plan"}
            </Badge>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Agents" value={String(agentList.length)} icon={Bot} />
          <StatCard title="Published" value={String(publishedCount)} icon={Sparkles} />
          <StatCard title="Remaining Credits" value={String(remainingCredits)} icon={Crown} />
          <StatCard title="Email Verified" value={user?.primaryEmailAddress?.emailAddress ? "Yes" : "No"} icon={Mail} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
          <Card className="rounded-3xl border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User2 className="h-5 w-5" />
                Account Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Name</p>
                <p className="font-medium">{user?.fullName || "Not set"}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium">{user?.primaryEmailAddress?.emailAddress || "Not available"}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Workspace Credits</p>
                <p className="font-medium">{userDetail?.token ?? 0}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Plan Status</p>
                <p className="font-medium">{isPaidUser ? "Unlimited" : "Free Tier"}</p>
              </div>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <UserProfile />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;
