"use client";

import React from "react";
import Image from "next/image";

export interface TopEarnerItem {
  rank: number;
  name: string;
  avatar: string;
  earnings: number;
}

export interface TopEarnersBox {
  timeframe: string;
  dateRange: string;
  topEdgeGradient: string;
  top3: TopEarnerItem[];
  remaining?: TopEarnerItem[];
}

export const TOP_EARNERS_DATA: TopEarnersBox[] = [
  {
    timeframe: "TODAY'S",
    dateRange: "(20-Nov-2026)",
    topEdgeGradient: "from-pink-500/80 via-rose-500/80 to-purple-500/80",
    top3: [
      {
        rank: 2,
        name: "HIMANSHU",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
        earnings: 0,
      },
      {
        rank: 1,
        name: "Hemraj",
        avatar: "/images/founder.jpeg",
        earnings: 6,
      },
    ],
    remaining: [],
  },
  {
    timeframe: "LAST 7 DAY'S",
    dateRange: "(20-Nov-2026 - 14-Nov-2026)",
    topEdgeGradient: "from-rose-500/80 via-orange-500/80 to-amber-500/80",
    top3: [
      {
        rank: 2,
        name: "Shania",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        earnings: 145,
      },
      {
        rank: 1,
        name: "Ishrat",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
        earnings: 217,
      },
      {
        rank: 3,
        name: "Ankit (TG)",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
        earnings: 133,
      },
    ],
    remaining: [
      {
        rank: 4,
        name: "Alka Singh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        earnings: 114,
      },
      {
        rank: 5,
        name: "Fatima",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
        earnings: 101,
      },
    ],
  },
  {
    timeframe: "LAST 30 DAY'S",
    dateRange: "(21-Oct-2026 - 20-Nov-2026)",
    topEdgeGradient: "from-violet-500/80 via-fuchsia-500/80 to-rose-500/80",
    top3: [
      {
        rank: 2,
        name: "Shania",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        earnings: 426,
      },
      {
        rank: 1,
        name: "Ishrat",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
        earnings: 637,
      },
      {
        rank: 3,
        name: "Shahid",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        earnings: 404,
      },
    ],
    remaining: [
      {
        rank: 4,
        name: "MALAIK",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        earnings: 394,
      },
      {
        rank: 5,
        name: "Hadiya",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        earnings: 391,
      },
    ],
  },
];

// Realistic Crown Vector Component matching user screenshot
function RealisticCrown({ tier }: { tier: "gold" | "silver" | "bronze" }) {
  if (tier === "gold") {
    return (
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 mx-auto -mb-1 drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)]"
        viewBox="0 0 32 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gold-crown-body" x1="0" y1="0" x2="32" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="gold-crown-base" x1="0" y1="21" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect x="4" y="21" width="24" height="3.5" rx="1" fill="url(#gold-crown-base)" stroke="#92400E" strokeWidth="0.6" />
        <path
          d="M4 21L6 9L11 15L16 3L21 15L26 9L28 21H4Z"
          fill="url(#gold-crown-body)"
          stroke="#92400E"
          strokeWidth="0.8"
        />
        <circle cx="6" cy="9" r="1.6" fill="#FEF9C3" stroke="#B45309" strokeWidth="0.6" />
        <circle cx="11" cy="15" r="1.3" fill="#FEF9C3" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="16" cy="3" r="2.2" fill="#FEF9C3" stroke="#B45309" strokeWidth="0.7" />
        <circle cx="21" cy="15" r="1.3" fill="#FEF9C3" stroke="#B45309" strokeWidth="0.5" />
        <circle cx="26" cy="9" r="1.6" fill="#FEF9C3" stroke="#B45309" strokeWidth="0.6" />
        <circle cx="16" cy="13.5" r="1.6" fill="#DC2626" stroke="#991B1B" strokeWidth="0.4" />
      </svg>
    );
  }

  if (tier === "silver") {
    return (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 mx-auto -mb-1 drop-shadow-[0_2px_8px_rgba(203,213,225,0.4)]"
        viewBox="0 0 32 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silver-crown-body" x1="0" y1="0" x2="32" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="silver-crown-base" x1="0" y1="21" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>
        <rect x="5" y="21" width="22" height="3" rx="1" fill="url(#silver-crown-base)" stroke="#334155" strokeWidth="0.6" />
        <path
          d="M5 21L7 10L11.5 15.5L16 4.5L20.5 15.5L25 10L27 21H5Z"
          fill="url(#silver-crown-body)"
          stroke="#334155"
          strokeWidth="0.8"
        />
        <circle cx="7" cy="10" r="1.4" fill="#F8FAFC" stroke="#475569" strokeWidth="0.5" />
        <circle cx="16" cy="4.5" r="1.9" fill="#F8FAFC" stroke="#475569" strokeWidth="0.6" />
        <circle cx="25" cy="10" r="1.4" fill="#F8FAFC" stroke="#475569" strokeWidth="0.5" />
        <circle cx="16" cy="14" r="1.4" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.4" />
      </svg>
    );
  }

  // Bronze / Copper-red Crown
  return (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 mx-auto -mb-1 drop-shadow-[0_2px_8px_rgba(239,68,68,0.4)]"
      viewBox="0 0 32 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bronze-crown-body" x1="0" y1="0" x2="32" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="35%" stopColor="#FB923C" />
          <stop offset="70%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="bronze-crown-base" x1="0" y1="21" x2="32" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
      </defs>
      <rect x="5" y="21" width="22" height="3" rx="1" fill="url(#bronze-crown-base)" stroke="#7F1D1D" strokeWidth="0.6" />
      <path
        d="M5 21L7 10L11.5 15.5L16 4.5L20.5 15.5L25 10L27 21H5Z"
        fill="url(#bronze-crown-body)"
        stroke="#7F1D1D"
        strokeWidth="0.8"
      />
      <circle cx="7" cy="10" r="1.4" fill="#FFEDD5" stroke="#9A3412" strokeWidth="0.5" />
      <circle cx="16" cy="4.5" r="1.9" fill="#FFEDD5" stroke="#9A3412" strokeWidth="0.6" />
      <circle cx="25" cy="10" r="1.4" fill="#FFEDD5" stroke="#9A3412" strokeWidth="0.5" />
      <circle cx="16" cy="14" r="1.4" fill="#EF4444" stroke="#991B1B" strokeWidth="0.4" />
    </svg>
  );
}

// Hexagonal Rank Badge under avatar
function HexagonRankBadge({ rank }: { rank: 1 | 2 | 3 }) {
  if (rank === 1) {
    return (
      <div className="relative -mt-3 sm:-mt-3.5 z-10 drop-shadow-md">
        <svg width="24" height="26" viewBox="0 0 24 28" fill="none">
          <path
            d="M12 0L24 7V21L12 28L0 21V7L12 0Z"
            fill="url(#gold-hex)"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          <defs>
            <linearGradient id="gold-hex" x1="0" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <text
            x="12"
            y="18"
            textAnchor="middle"
            fill="#451A03"
            fontWeight="900"
            fontSize="14"
            fontFamily="monospace"
          >
            1
          </text>
        </svg>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="relative -mt-2.5 sm:-mt-3 z-10 drop-shadow-md">
        <svg width="20" height="23" viewBox="0 0 24 28" fill="none">
          <path
            d="M12 0L24 7V21L12 28L0 21V7L12 0Z"
            fill="url(#silver-hex)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          <defs>
            <linearGradient id="silver-hex" x1="0" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
          </defs>
          <text
            x="12"
            y="18"
            textAnchor="middle"
            fill="#0F172A"
            fontWeight="900"
            fontSize="14"
            fontFamily="monospace"
          >
            2
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative -mt-2.5 sm:-mt-3 z-10 drop-shadow-md">
      <svg width="20" height="23" viewBox="0 0 24 28" fill="none">
        <path
          d="M12 0L24 7V21L12 28L0 21V7L12 0Z"
          fill="url(#bronze-hex)"
          stroke="#EA580C"
          strokeWidth="1.2"
        />
        <defs>
          <linearGradient id="bronze-hex" x1="0" y1="0" x2="24" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FED7AA" />
            <stop offset="0.5" stopColor="#EA580C" />
            <stop offset="1" stopColor="#9A3412" />
          </linearGradient>
        </defs>
        <text
          x="12"
          y="18"
          textAnchor="middle"
          fill="#431407"
          fontWeight="900"
          fontSize="14"
          fontFamily="monospace"
        >
          3
        </text>
      </svg>
    </div>
  );
}

export default function TopEarnersCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {TOP_EARNERS_DATA.map((box, bIdx) => {
        const rank1 = box.top3.find((u) => u.rank === 1);
        const rank2 = box.top3.find((u) => u.rank === 2);
        const rank3 = box.top3.find((u) => u.rank === 3);

        const hasRank3 = Boolean(rank3);

        return (
          <div
            key={bIdx}
            className="relative bg-[#0d0f15] border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden transition-all duration-200 hover:border-slate-700 hover:shadow-2xl"
          >
            {/* Top Accent Gradient Border */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${box.topEdgeGradient}`}
            />

            <div>
              {/* Box Header (Centered) */}
              <div className="text-center pb-3">
                <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-sans">
                  TOP EARNERS
                </h3>
                <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 mt-0.5">
                  {box.timeframe}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">
                  {box.dateRange}
                </div>
              </div>

              {/* Podium Display */}
              {hasRank3 ? (
                /* 3-PERSON PODIUM: Rank 2 (Left) | Rank 1 (Center, Elevated) | Rank 3 (Right) */
                <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end pt-5 pb-3">
                  {/* RANK 2 (Left) */}
                  {rank2 && (
                    <div className="flex flex-col items-center text-center">
                      <RealisticCrown tier="silver" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-slate-300 ring-2 ring-slate-400/30 bg-slate-900 shadow-[0_0_14px_rgba(203,213,225,0.25)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-800">
                          <Image
                            src={rank2.avatar}
                            alt={rank2.name}
                            fill
                            sizes="64px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <HexagonRankBadge rank={2} />
                      <div className="font-bold text-xs sm:text-sm text-white truncate w-full mt-1.5 px-0.5">
                        {rank2.name}
                      </div>
                      <div className="mt-1.5 px-3 py-0.5 rounded-[4px] bg-[#0b1411] border border-emerald-500/50 text-emerald-400 font-mono font-bold text-xs sm:text-sm shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                        $ {rank2.earnings}
                      </div>
                    </div>
                  )}

                  {/* RANK 1 (Center - Elevated & Larger) */}
                  {rank1 && (
                    <div className="flex flex-col items-center text-center -mt-3 sm:-mt-4">
                      <RealisticCrown tier="gold" />
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 border-2 border-amber-400 ring-4 ring-amber-400/40 bg-slate-900 shadow-[0_0_24px_rgba(251,191,36,0.4)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-800">
                          <Image
                            src={rank1.avatar}
                            alt={rank1.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                            priority
                          />
                        </div>
                      </div>
                      <HexagonRankBadge rank={1} />
                      <div className="font-black text-xs sm:text-sm text-amber-400 truncate w-full mt-1.5 px-0.5">
                        {rank1.name}
                      </div>
                      <div className="mt-1.5 px-3.5 py-0.5 rounded-[4px] bg-[#171208] border border-amber-500/60 text-amber-400 font-mono font-black text-xs sm:text-sm shadow-[0_0_18px_rgba(245,158,11,0.28)]">
                        $ {rank1.earnings}
                      </div>
                    </div>
                  )}

                  {/* RANK 3 (Right) */}
                  {rank3 && (
                    <div className="flex flex-col items-center text-center">
                      <RealisticCrown tier="bronze" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-orange-500/80 ring-2 ring-orange-500/30 bg-slate-900 shadow-[0_0_14px_rgba(249,115,22,0.25)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-800">
                          <Image
                            src={rank3.avatar}
                            alt={rank3.name}
                            fill
                            sizes="64px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <HexagonRankBadge rank={3} />
                      <div className="font-bold text-xs sm:text-sm text-white truncate w-full mt-1.5 px-0.5">
                        {rank3.name}
                      </div>
                      <div className="mt-1.5 px-3 py-0.5 rounded-[4px] bg-[#0b1411] border border-emerald-500/50 text-emerald-400 font-mono font-bold text-xs sm:text-sm shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                        $ {rank3.earnings}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* 2-PERSON PODIUM: Today's layout matching screenshot (Rank 2 Left, Rank 1 Right) */
                <div className="flex items-end justify-center gap-6 sm:gap-10 pt-5 pb-3">
                  {/* RANK 2 (Left) */}
                  {rank2 && (
                    <div className="flex flex-col items-center text-center">
                      <RealisticCrown tier="silver" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-slate-300 ring-2 ring-slate-400/30 bg-slate-900 shadow-[0_0_14px_rgba(203,213,225,0.25)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-800">
                          <Image
                            src={rank2.avatar}
                            alt={rank2.name}
                            fill
                            sizes="64px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <HexagonRankBadge rank={2} />
                      <div className="font-bold text-xs sm:text-sm text-white truncate max-w-[90px] mt-1.5 px-0.5">
                        {rank2.name}
                      </div>
                      <div className="mt-1.5 px-3 py-0.5 rounded-[4px] bg-[#0b1411] border border-emerald-500/50 text-emerald-400 font-mono font-bold text-xs sm:text-sm shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                        $ {rank2.earnings}
                      </div>
                    </div>
                  )}

                  {/* RANK 1 (Right - Elevated & Larger with Golden Glow) */}
                  {rank1 && (
                    <div className="flex flex-col items-center text-center -mt-3 sm:-mt-4">
                      <RealisticCrown tier="gold" />
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 border-2 border-amber-400 ring-4 ring-amber-400/40 bg-slate-900 shadow-[0_0_24px_rgba(251,191,36,0.4)]">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-800">
                          <Image
                            src={rank1.avatar}
                            alt={rank1.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                            priority
                          />
                        </div>
                      </div>
                      <HexagonRankBadge rank={1} />
                      <div className="font-black text-xs sm:text-sm text-amber-400 truncate max-w-[90px] mt-1.5 px-0.5">
                        {rank1.name}
                      </div>
                      <div className="mt-1.5 px-3.5 py-0.5 rounded-[4px] bg-[#171208] border border-amber-500/60 text-amber-400 font-mono font-black text-xs sm:text-sm shadow-[0_0_18px_rgba(245,158,11,0.28)]">
                        $ {rank1.earnings}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom List: Ranks 4, 5 */}
            {box.remaining && box.remaining.length > 0 && (
              <div className="border-t border-slate-800/80 mt-3 pt-2.5 space-y-1.5">
                {box.remaining.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-bold text-xs text-slate-400 w-4 text-center shrink-0">
                        {user.rank}
                      </span>
                      <div className="w-7 h-7 rounded-full overflow-hidden relative border border-slate-700 shrink-0 bg-slate-800">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          sizes="28px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                        {user.name}
                      </span>
                    </div>

                    <span className="font-mono font-bold text-xs sm:text-sm text-emerald-400 shrink-0">
                      $ {user.earnings}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
