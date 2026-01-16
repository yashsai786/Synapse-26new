"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/ui/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Building2,
  Award,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";

type Sponsor = {
  sponsor_id: number;
  name: string;
  tier: string;
  website_url: string;
  logo_url: string;
  description?: string;
};

const tierConfig: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  Platinum: { bg: "bg-slate-400/10", text: "text-slate-300", border: "border-slate-400/30", icon: "💎" },
  Gold: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", icon: "🥇" },
  Silver: { bg: "bg-slate-300/10", text: "text-slate-400", border: "border-slate-300/30", icon: "🥈" },
  Bronze: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", icon: "🥉" },
};

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sponsors");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSponsors(data.sponsors || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingId === null) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/sponsors/${deletingId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await fetchSponsors();
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const getTierStyle = (tier: string) => {
    return tierConfig[tier] || { bg: "bg-muted", text: "text-muted-foreground", border: "border-border", icon: "🏢" };
  };

  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) acc[sponsor.tier] = [];
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  const tierOrder = ["Platinum", "Gold", "Silver", "Bronze"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">Error: {error}</p>
        <Button onClick={fetchSponsors} variant="outline">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        title="Sponsors"
        subtitle="Partnerships"
        badge={<Badge className="bg-primary/10 text-primary border-0">{sponsors.length} partners</Badge>}
        actions={
          <Link href="/admin/sponsors/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Sponsor
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tierOrder.map((tier) => {
          const style = getTierStyle(tier);
          const count = groupedSponsors[tier]?.length || 0;
          return (
            <Card key={tier} className="border-border/40">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{style.icon}</span>
                  <Badge className={`${style.bg} ${style.text} ${style.border}`}>{tier}</Badge>
                </div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">{tier} Sponsors</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sponsors Grid */}
      <Card className="border-border/40">
        <CardHeader className="border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Sponsors</CardTitle>
              <CardDescription>Manage your event sponsors and partners</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {sponsors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sponsors added yet.</p>
              <p className="text-sm">Add your first sponsor to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsors.map((sponsor) => {
                const style = getTierStyle(sponsor.tier);
                return (
                  <div
                    key={sponsor.sponsor_id}
                    className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-xl">
                          {style.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{sponsor.name}</h3>
                          <Badge className={`${style.bg} ${style.text} ${style.border} text-xs`}>
                            <Award className="mr-1 h-3 w-3" />
                            {sponsor.tier}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {sponsor.website_url && (
                      <a
                        href={sponsor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                      >
                        <Globe className="h-3 w-3" />
                        {sponsor.website_url.replace(/^https?:\/\//, '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-border/40">
                      <Link href={`/admin/sponsors/${sponsor.sponsor_id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-border/50">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(sponsor.sponsor_id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Delete Sponsor</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this sponsor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-border/50">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleting}>
              {deleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
