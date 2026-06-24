"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
  Filter,
  RefreshCw,
  ChevronDown,
  X,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { bulkDeleteTransactions } from "@backend/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Housing",
  "Transportation",
  "Groceries",
  "Dining Out",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal Care",
  "Travel",
  "Insurance",
  "Other Income",
  "Other Expense",
];

const TYPE_FILTERS = ["All", "INCOME", "EXPENSE"];

export function TransactionTable({ transactions, accountId }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;

  const { loading: deleteLoading, fn: deleteFn } = useFetch(bulkDeleteTransactions);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        !search ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || t.type === typeFilter;
      const matchCategory = categoryFilter === "All" || t.category === categoryFilter;
      const matchAccount = !accountId || t.accountId === accountId;
      return matchSearch && matchType && matchCategory && matchAccount;
    });
  }, [transactions, search, typeFilter, categoryFilter, accountId]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "date") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (sortField === "amount") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortDir]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((t) => t.id)));
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} transaction(s)? This cannot be undone.`)) return;
    const result = await deleteFn([...selectedIds]);
    if (result?.success) {
      toast.success(`${selectedIds.size} transaction(s) deleted`);
      setSelectedIds(new Set());
      router.refresh();
    } else {
      toast.error(result?.error || "Failed to delete transactions");
    }
  };

  const SortIcon = ({ field }) =>
    sortField === field ? (
      sortDir === "asc" ? <SortAsc className="h-3.5 w-3.5 ml-1 text-cyan-400" /> : <SortDesc className="h-3.5 w-3.5 ml-1 text-cyan-400" />
    ) : <SortAsc className="h-3.5 w-3.5 ml-1 opacity-20" />;

  const hasFilters = search || typeFilter !== "All" || categoryFilter !== "All";
  const clearFilters = () => { setSearch(""); setTypeFilter("All"); setCategoryFilter("All"); setPage(1); };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 bg-white/5 border-border/50 focus:border-cyan-500/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Type filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 border-border/50 bg-white/5 hover:bg-white/10 text-sm h-10">
                <Filter className="h-3.5 w-3.5" />
                {typeFilter === "All" ? "Type" : typeFilter}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0D0B12] border-border/50">
              {TYPE_FILTERS.map((t) => (
                <DropdownMenuItem key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
                  className={typeFilter === t ? "text-cyan-400" : ""}>
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 border-border/50 bg-white/5 hover:bg-white/10 text-sm h-10">
                {categoryFilter === "All" ? "Category" : categoryFilter}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0D0B12] border-border/50 max-h-56 overflow-y-auto">
              {CATEGORIES.map((c) => (
                <DropdownMenuItem key={c} onClick={() => { setCategoryFilter(c); setPage(1); }}
                  className={categoryFilter === c ? "text-cyan-400" : ""}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 h-10 text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-sm font-medium text-cyan-400">
            {selectedIds.size} selected
          </span>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={deleteLoading}
            className="ml-auto h-8 bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Selected
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedIds(new Set())}
            className="h-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{sorted.length} transaction{sorted.length !== 1 ? "s" : ""}</span>
        <div className="flex gap-4">
          <span className="text-emerald-400">
            Income: ${filtered.filter(t => t.type === "INCOME").reduce((s, t) => s + t.amount, 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-rose-400">
            Expense: ${filtered.filter(t => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/40 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 px-4 py-3 bg-white/5 border-b border-border/30 text-xs text-muted-foreground font-medium">
          <div className="flex items-center">
            <Checkbox
              checked={paginated.length > 0 && selectedIds.size === paginated.length}
              onCheckedChange={toggleSelectAll}
              className="border-border/50"
            />
          </div>
          <button onClick={() => handleSort("description")} className="flex items-center text-left hover:text-foreground transition-colors">
            Description <SortIcon field="description" />
          </button>
          <button onClick={() => handleSort("category")} className="flex items-center hover:text-foreground transition-colors">
            Category <SortIcon field="category" />
          </button>
          <button onClick={() => handleSort("date")} className="flex items-center hover:text-foreground transition-colors">
            Date <SortIcon field="date" />
          </button>
          <button onClick={() => handleSort("amount")} className="flex items-center justify-end hover:text-foreground transition-colors">
            Amount <SortIcon field="amount" />
          </button>
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <p className="text-muted-foreground text-sm">No transactions found</p>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-cyan-400 hover:text-cyan-300">
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border/20">
            {paginated.map((t) => (
              <div
                key={t.id}
                className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors items-center ${
                  selectedIds.has(t.id) ? "bg-cyan-500/5" : ""
                }`}
              >
                <Checkbox
                  checked={selectedIds.has(t.id)}
                  onCheckedChange={() => toggleSelect(t.id)}
                  className="border-border/50"
                />
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    t.type === "INCOME" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                  }`}>
                    {t.type === "INCOME" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{t.description}</p>
                    {t.isRecurring && (
                      <span className="text-[10px] text-cyan-400/70 flex items-center gap-1">
                        <RefreshCw className="h-2.5 w-2.5" /> Recurring
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] border-border/40 text-muted-foreground font-normal hidden sm:flex">
                  {t.category}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(new Date(t.date), "MMM d, yy")}
                </span>
                <div className="flex items-center gap-2 justify-end">
                  <span className={`text-sm font-bold ${t.type === "INCOME" ? "text-emerald-400" : "text-rose-400"}`}>
                    {t.type === "INCOME" ? "+" : "-"}$
                    {t.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 hover:bg-white/10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0D0B12] border-border/50">
                      <DropdownMenuItem asChild>
                        <Link href={`/transaction/create?edit=${t.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-rose-400 focus:text-rose-400"
                        onClick={async () => {
                          if (!confirm("Delete this transaction?")) return;
                          const result = await deleteFn([t.id]);
                          if (result?.success) { toast.success("Transaction deleted"); router.refresh(); }
                          else toast.error(result?.error || "Failed to delete");
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-border/50 bg-white/5 hover:bg-white/10 h-8"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border-border/50 bg-white/5 hover:bg-white/10 h-8"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
