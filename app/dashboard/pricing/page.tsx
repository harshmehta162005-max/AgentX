"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { PricingTable, useAuth } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { Check, Crown, Rocket } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function Pricing() {
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: "unlimited_plan" });
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [agentCount, setAgentCount] = useState(0);

  useEffect(() => {
    if (userDetail?._id) {
      GetUserAgents();
    }
  }, [userDetail?._id]);

  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail._id,
    });
    setAgentCount(result.length || 0);
  };

  const remainingCredits = Math.max(0, 2 - agentCount);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-100 to-white p-6 md:p-8 lg:p-10 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Billing</p>
              <h1 className="text-3xl font-semibold tracking-tight">Pricing & Plans</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Choose the plan that fits your AI agent workflow.
              </p>
            </div>
            <Badge
              className={`rounded-full px-4 py-1.5 text-sm ${
                isPaidUser
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
              }`}
            >
              {isPaidUser ? "Current Plan: Unlimited" : "Current Plan: Free"}
            </Badge>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <PlanCard
            icon={Rocket}
            title="Free"
            subtitle="For getting started"
            features={[
              "Create up to 2 agents",
              "Agent builder & preview access",
              "Template cloning support",
            ]}
            footer={`Remaining free slots: ${remainingCredits}`}
          />
          <PlanCard
            icon={Crown}
            title="Unlimited"
            subtitle="For serious production use"
            features={[
              "Unlimited agent creation",
              "Priority usage and scale",
              "Ideal for teams and heavy workflows",
            ]}
            footer={isPaidUser ? "You are on this plan" : "Upgrade to remove limits"}
            highlight
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Manage Subscription</h2>
            {!isPaidUser && (
              <Button asChild>
                <Link href="/dashboard/profile">Open Billing in Profile</Link>
              </Button>
            )}
          </div>
          <PricingTable />
        </section>
      </div>
    </div>
  );
}

function PlanCard({
  icon: Icon,
  title,
  subtitle,
  features,
  footer,
  highlight = false,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  features: string[];
  footer: string;
  highlight?: boolean;
}) {
  return (
    <Card
      className={`rounded-2xl border shadow-sm ${
        highlight
          ? "border-sky-300 bg-sky-50/70 dark:border-sky-500/40 dark:bg-sky-900/20"
          : "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/70"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {features.map((feature) => (
          <p key={feature} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-emerald-500" />
            {feature}
          </p>
        ))}
        <p className="pt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{footer}</p>
      </CardContent>
    </Card>
  );
}

export default Pricing;
