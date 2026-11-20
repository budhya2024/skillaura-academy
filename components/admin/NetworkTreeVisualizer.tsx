"use client";

import React, { useState } from "react";
import {
  MemberNode,
  INITIAL_NETWORK_TREE,
} from "../../lib/networkData";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Users,
  ChevronDown,
  ChevronUp,
  Award,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  X,
  Share2,
  ArrowRight,
  Layers,
} from "lucide-react";

interface TreeNodeProps {
  node: MemberNode;
  onSelectNode: (node: MemberNode) => void;
  selectedNodeId: string | null;
  searchQuery: string;
  depth?: number;
}

const getRankHeaderColor = (rank: string) => {
  switch (rank) {
    case "Crown Ambassador":
      return "border-purple-300 bg-purple-50/20";
    case "Diamond Leader":
      return "border-cyan-300 bg-cyan-50/20";
    case "Platinum Partner":
      return "border-indigo-300 bg-indigo-50/20";
    case "Gold Associate":
      return "border-amber-300 bg-amber-50/20";
    case "Silver Member":
      return "border-slate-300 bg-slate-50/20";
    default:
      return "border-orange-300 bg-orange-50/20";
  }
};

const getRankTag = (rank: string) => {
  switch (rank) {
    case "Crown Ambassador":
      return "bg-purple-100 text-purple-900 border-purple-300";
    case "Diamond Leader":
      return "bg-cyan-100 text-cyan-900 border-cyan-300";
    case "Platinum Partner":
      return "bg-indigo-100 text-indigo-900 border-indigo-300";
    case "Gold Associate":
      return "bg-amber-100 text-amber-900 border-amber-300";
    case "Silver Member":
      return "bg-slate-100 text-slate-800 border-slate-300";
    default:
      return "bg-orange-100 text-orange-900 border-orange-300";
  }
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onSelectNode,
  selectedNodeId,
  searchQuery,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isMatched =
    searchQuery &&
    (node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.id.toLowerCase().includes(searchQuery.toLowerCase()));

  const isSelected = selectedNodeId === node.id;
  const hasChildren = Boolean(node.left || node.right);

  return (
    <div className="flex flex-col items-center relative">
      {/* Node Card - 4px rounded, no heavy accent border */}
      <div
        onClick={() => onSelectNode(node)}
        className={`w-64 cursor-pointer p-3 border transition-all relative bg-white shadow-xs hover:shadow-md rounded-[4px] ${getRankHeaderColor(
          node.rank
        )} ${isSelected
          ? "ring-2 ring-[#116E63] border-[#116E63] shadow-md"
          : isMatched
            ? "ring-2 ring-[#FDA31B] border-[#FDA31B] bg-amber-50/60"
            : "border-slate-300 hover:border-slate-400"
          }`}
      >
        {/* Top Header: Leg & Status */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5">
            {node.legPosition !== "root" && (
              <span
                className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-[4px] ${node.legPosition === "left"
                  ? "bg-blue-600 text-white"
                  : "bg-orange-500 text-white"
                  }`}
              >
                {node.legPosition === "left" ? "Branch A" : "Branch B"}
              </span>
            )}
            <span className="text-[11px] font-mono font-bold text-slate-600">
              {node.id}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${node.status === "active" ? "bg-emerald-500" : "bg-slate-400"
                }`}
            />
            <span className="text-[9px] uppercase font-bold text-slate-600">
              {node.status}
            </span>
          </div>
        </div>

        {/* Member Name & Role */}
        <div className="flex items-start gap-2.5 mb-2.5">
          <div
            className={`w-8 h-8 shrink-0 flex items-center justify-center font-bold text-xs rounded-[4px] ${node.level === 0
              ? "bg-[#116E63] text-white"
              : "bg-slate-800 text-white"
              }`}
          >
            {node.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-slate-900 truncate leading-tight uppercase">
              {node.name}
            </h4>
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 border rounded-[4px] ${getRankTag(
                  node.rank
                )}`}
              >
                {node.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200 text-[11px]">
          <div className="bg-slate-50 p-1.5 border border-slate-200 text-center rounded-[4px]">
            <span className="text-slate-500 block text-[9px] uppercase font-bold">
              Personal Sales
            </span>
            <span className="font-bold text-[#116E63]">
              {node.personalActiveSales} Courses
            </span>
          </div>
          <div className="bg-slate-50 p-1.5 border border-slate-200 text-center rounded-[4px]">
            <span className="text-slate-500 block text-[9px] uppercase font-bold">
              Direct Referrals
            </span>
            <span className="font-bold text-slate-900">
              {node.directReferrals} Students
            </span>
          </div>
        </div>

        {/* Bottom Bar: Earnings & Directs */}
        <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-slate-600 font-semibold border-t border-slate-200">
          <span className="text-slate-500">
            Active Income:
          </span>
          <span className="font-bold text-emerald-700 text-xs font-mono">
            ₹{node.totalEarnings.toLocaleString()}
          </span>
        </div>

        {/* Expand / Collapse Button if has children */}
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-5 bg-white border border-slate-400 hover:border-[#116E63] text-slate-600 hover:text-[#116E63] flex items-center justify-center shadow-xs z-10 transition-colors rounded-[4px]"
            title={isExpanded ? "Collapse Branch" : "Expand Branch"}
          >
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Children branches */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center w-full">
          {/* Vertical line from parent to branch line */}
          <div className="w-0.5 h-5 bg-slate-400"></div>

          {/* Children container with connecting lines */}
          <div className="flex items-start justify-center relative pt-4">
            {/* Top horizontal connector line */}
            {node.left && node.right && (
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-400"></div>
            )}

            {/* Left Child Leg */}
            <div className="flex flex-col items-center px-4 relative">
              <div className="absolute -top-4 w-0.5 h-4 bg-slate-400"></div>
              {node.left ? (
                <TreeNode
                  node={node.left}
                  onSelectNode={onSelectNode}
                  selectedNodeId={selectedNodeId}
                  searchQuery={searchQuery}
                  depth={depth + 1}
                />
              ) : (
                <div className="w-48 h-20 border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center text-xs rounded-[4px]">
                  <span className="font-bold text-slate-600 text-[11px] uppercase">
                    Empty Position A
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Direct Slot Open
                  </span>
                </div>
              )}
            </div>

            {/* Right Child Leg */}
            <div className="flex flex-col items-center px-4 relative">
              <div className="absolute -top-4 w-0.5 h-4 bg-slate-400"></div>
              {node.right ? (
                <TreeNode
                  node={node.right}
                  onSelectNode={onSelectNode}
                  selectedNodeId={selectedNodeId}
                  searchQuery={searchQuery}
                  depth={depth + 1}
                />
              ) : (
                <div className="w-48 h-20 border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center text-xs rounded-[4px]">
                  <span className="font-bold text-slate-600 text-[11px] uppercase">
                    Empty Position B
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Direct Slot Open
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function NetworkTreeVisualizer() {
  const [zoomLevel, setZoomLevel] = useState(0.9);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<MemberNode | null>(
    INITIAL_NETWORK_TREE
  );
  const [legFilter, setLegFilter] = useState<"all" | "left" | "right">("all");
  const [copiedId, setCopiedId] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleResetZoom = () => {
    setZoomLevel(0.9);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Left / Main: Visual Tree Area (4px rounded) */}
      <div className="flex-1 bg-white border border-slate-300 shadow-xs flex flex-col overflow-hidden rounded-[4px]">
        {/* Mobile Swipe Hint */}
        <div className="lg:hidden bg-teal-50 border-b border-teal-200 px-3 py-1.5 text-[11px] text-[#116E63] flex items-center justify-center gap-1.5 font-bold">
          <span>👈 Swipe horizontally & pinch to navigate tree branches 👉</span>
        </div>

        {/* Tree Control Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member by Name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8 py-1.5 text-xs bg-white border border-slate-200 focus:outline-none focus:border-[#116E63] w-full sm:w-60 rounded-[4px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Direct Channel Filter */}
            <div className="flex items-center bg-white border border-slate-200 p-0.5 text-xs font-bold self-start sm:self-auto rounded-[4px]">
              <button
                onClick={() => setLegFilter("all")}
                className={`px-2.5 py-1 rounded-[4px] ${legFilter === "all"
                  ? "bg-[#116E63] text-white"
                  : "text-slate-700 hover:text-slate-900"
                  }`}
              >
                All Directs
              </button>
              <button
                onClick={() => setLegFilter("left")}
                className={`px-2.5 py-1 rounded-[4px] ${legFilter === "left"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:text-slate-900"
                  }`}
              >
                Branch A
              </button>
              <button
                onClick={() => setLegFilter("right")}
                className={`px-2.5 py-1 rounded-[4px] ${legFilter === "right"
                  ? "bg-orange-600 text-white"
                  : "text-slate-700 hover:text-slate-900"
                  }`}
              >
                Branch B
              </button>
            </div>
          </div>

          {/* Zoom and Tree Controls */}
          <div className="flex items-center justify-end gap-1 bg-white border border-slate-200 p-0.5 text-slate-600 self-end sm:self-auto rounded-[4px]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
              className="p-1.5 hover:bg-slate-100 text-slate-700 cursor-pointer rounded-[4px]"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold px-1.5 text-slate-700">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:bg-slate-100 text-slate-700 cursor-pointer rounded-[4px]"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-slate-100 text-slate-700 border-l border-slate-200 cursor-pointer rounded-[4px]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tree Canvas */}
        <div className="flex-1 overflow-auto p-8 min-h-[540px] max-h-[700px] bg-[#F8FAFC] relative flex justify-center items-start select-none">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#116E63 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out",
            }}
            className="pt-4 pb-12"
          >
            <TreeNode
              node={INITIAL_NETWORK_TREE}
              onSelectNode={setSelectedNode}
              selectedNodeId={selectedNode?.id || null}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* Legend Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
              Ranks:
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-purple-600"></span>
              Crown
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-cyan-500"></span>
              Diamond
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-indigo-600"></span>
              Platinum
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-amber-500"></span>
              Gold
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-500"></span>
              Silver/Bronze
            </span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Click any member node to inspect active course sales and earnings
          </div>
        </div>
      </div>

      {/* Right / Sidebar: Member Details Inspector (4px rounded, no left-border) */}
      {selectedNode && (
        <div className="w-full lg:w-96 bg-white border border-slate-200 p-5 flex flex-col space-y-4 shrink-0 shadow-xs rounded-[4px]">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#116E63] text-white flex items-center justify-center font-black text-sm border border-[#FDA31B] rounded-[4px]">
                {selectedNode.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm leading-tight uppercase">
                  {selectedNode.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-mono text-xs font-bold text-slate-500">
                    {selectedNode.id}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedNode.id)}
                    className="text-slate-400 hover:text-[#116E63]"
                    title="Copy Member ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedId && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-[4px] ${selectedNode.status === "active"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-slate-100 text-slate-600"
                }`}
            >
              {selectedNode.status}
            </span>
          </div>

          {/* Rank & Package Strip */}
          <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between rounded-[4px]">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Rank Level
              </span>
              <span className="font-black text-[#116E63] text-xs uppercase flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#FDA31B]" />
                {selectedNode.rank}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Package
              </span>
              <span className="font-bold text-slate-800 text-xs truncate max-w-[150px] block">
                {selectedNode.packageEnrolled}
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[4px]">
              <span className="text-slate-500 block text-[10px] font-bold uppercase">
                Total Earnings
              </span>
              <span className="text-base font-black text-slate-900 mt-0.5 block">
                ₹{selectedNode.totalEarnings.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">
                Wallet: ₹{selectedNode.walletBalance.toLocaleString()}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[4px]">
              <span className="text-slate-500 block text-[10px] font-bold uppercase">
                Direct Referrals
              </span>
              <span className="text-base font-black text-slate-900 mt-0.5 block">
                {selectedNode.directReferrals} Directs
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Personal Sales: {selectedNode.personalActiveSales} Courses
              </span>
            </div>
          </div>

          {/* Active Direct Performance Summary */}
          <div className="border border-slate-300 p-3 space-y-2 bg-white rounded-[4px]">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">
                Direct Active Sales Ratio
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 flex justify-between items-center text-[11px] rounded-[4px]">
                <span className="text-slate-600 font-medium">Personal Course Sales:</span>
                <span className="font-bold font-mono text-slate-900">{selectedNode.personalActiveSales} Enrollments</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 flex justify-between items-center text-[11px] rounded-[4px]">
                <span className="text-slate-600 font-medium">Active Direct Commission:</span>
                <span className="font-bold font-mono text-emerald-700">₹{selectedNode.totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sponsor & KYC Details */}
          <div className="space-y-1.5 text-xs border-t border-slate-200 pt-3 font-medium">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Direct Sponsor</span>
              <span className="font-bold text-slate-900">
                {selectedNode.sponsorName}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Joined Date</span>
              <span className="text-slate-900">{selectedNode.joinDate}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">KYC Status</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedNode.kycVerified ? "VERIFIED" : "PENDING"}
              </span>
            </div>
            {selectedNode.phone && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Phone</span>
                <span className="text-slate-900 font-mono">
                  {selectedNode.phone}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() =>
                alert(
                  `Direct sponsor link generated for ${selectedNode.name}: https://skillauraacademy.in/register?ref=${selectedNode.id}`
                )
              }
              className="w-full flex items-center justify-center gap-2 bg-[#116E63] hover:bg-[#0c5048] text-white py-2 px-3 text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider rounded-[4px]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Node Sponsor Link</span>
            </button>
            <a
              href={`https://wa.me/${selectedNode.phone?.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 py-2 px-3 text-xs font-bold transition-colors cursor-pointer rounded-[4px]"
            >
              <span>WhatsApp Message</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
