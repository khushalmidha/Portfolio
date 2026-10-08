"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
import type { CFRatingChange } from "@/lib/adapters/codeforces";

const RANK_THRESHOLDS = [
  { rating: 800, label: "Newbie", color: "#808080" },
  { rating: 1000, label: "Pupil", color: "#008000" },
  { rating: 1200, label: "Specialist", color: "#03A89E" },
  { rating: 1400, label: "Expert", color: "#0000FF" },
  { rating: 1600, label: "Expert", color: "#0000FF" },
  { rating: 1900, label: "Candidate Master", color: "#AA00AA" },
  { rating: 2100, label: "Master", color: "#FF8C00" },
  { rating: 2300, label: "International Master", color: "#FF8C00" },
  { rating: 2400, label: "Grandmaster", color: "#FF0000" },
];

type ChartPoint = {
  date: string;
  rating: number;
  contestName: string;
  rank: number;
};

function getRankColor(rating: number): string {
  if (rating < 1200) return "#808080";
  if (rating < 1400) return "#008000";
  if (rating < 1600) return "#03A89E";
  if (rating < 1900) return "#1BAAD4";
  if (rating < 2100) return "#AA00AA";
  if (rating < 2300) return "#FF8C00";
  return "#FF0000";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d: ChartPoint = payload[0].payload;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 1rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8125rem",
        maxWidth: "260px",
      }}
    >
      <div style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>{d.date}</div>
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.125rem",
          color: getRankColor(d.rating),
          marginBottom: "0.25rem",
        }}
      >
        {d.rating}
      </div>
      <div style={{ color: "var(--text-secondary)", wordBreak: "break-word" }}>
        {d.contestName}
      </div>
      <div style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}>
        Rank: #{d.rank}
      </div>
    </div>
  );
}

export function CFRatingChart({ data }: { data: CFRatingChange[] }) {
  const chartData: ChartPoint[] = data.map((d) => ({
    date: format(fromUnixTime(d.ratingUpdateTimeSeconds), "MMM yyyy"),
    rating: d.newRating,
    contestName: d.contestName,
    rank: d.rank,
  }));

  const maxRating = Math.max(...chartData.map((d) => d.rating));
  const minRating = Math.min(...chartData.map((d) => d.rating));
  const yMin = Math.max(0, minRating - 100);
  const yMax = maxRating + 100;

  return (
    <div>
      {/* Accessible text summary */}
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.8125rem",
          fontFamily: "var(--font-mono)",
          marginBottom: "1rem",
        }}
      >
        Rating history across {chartData.length} contests. Peak: {maxRating}. Current:{" "}
        {chartData[chartData.length - 1]?.rating ?? "N/A"}.
      </p>

      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          overflowX: "auto",
        }}
        role="img"
        aria-label={`Codeforces rating history chart. ${chartData.length} contests. Peak rating ${maxRating}.`}
      >
        <ResponsiveContainer width="100%" height={320} minWidth={400}>
          <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fill: "#556070" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fill: "#556070" }}
              tickLine={false}
              axisLine={false}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Rank zone reference lines */}
            {RANK_THRESHOLDS.filter(
              (t) => t.rating > yMin && t.rating < yMax
            ).map((t) => (
              <ReferenceLine
                key={t.rating}
                y={t.rating}
                stroke={t.color}
                strokeDasharray="4 4"
                strokeOpacity={0.3}
                label={{
                  value: t.label,
                  position: "insideTopRight",
                  fill: t.color,
                  fontSize: 10,
                  fontFamily: "JetBrains Mono, monospace",
                  opacity: 0.5,
                }}
              />
            ))}

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#1BAAD4"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: ChartPoint };
                return (
                  <circle
                    key={`dot-${payload.date}-${payload.rating}`}
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={getRankColor(payload.rating)}
                    stroke="var(--bg-card)"
                    strokeWidth={1.5}
                  />
                );
              }}
              activeDot={{ r: 5, fill: "#1BAAD4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
