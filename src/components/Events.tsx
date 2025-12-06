import React, { useEffect, useState } from "react";
import { Heart, Calendar, MapPin, Search, ExternalLink } from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  start_date: string;
  end_date?: string;
  place?: string;
  city?: string;
  state?: string;
  category?: string;
  description?: string;
  source_name?: string;
  source_url?: string;
};

export default function Events(): JSX.Element {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"cards" | "calendar">("cards");
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<EventItem | null>(null); // modal

  useEffect(() => {
    fetch("/events.json")
      .then((r) => r.json())
      .then((data: EventItem[]) => {
        data.sort((a, b) => (a.start_date > b.start_date ? 1 : -1));
        setEvents(data);
      })
      .catch((err) => console.error("Failed to load events.json", err))
      .finally(() => setLoading(false));

    const stored = localStorage.getItem("events_rsvp") || "{}";
    try {
      setRsvps(JSON.parse(stored));
    } catch {
      setRsvps({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events_rsvp", JSON.stringify(rsvps));
  }, [rsvps]);

  const toggleRsvp = (id: string) => setRsvps((p) => ({ ...p, [id]: !p[id] }));

  const categories = Array.from(new Set(["All", ...events.map((e) => e.category || "Other")]));

  const filtered = events.filter((e) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      e.title.toLowerCase().includes(q) ||
      (e.description || "").toLowerCase().includes(q) ||
      (e.city || "").toLowerCase().includes(q) ||
      (e.state || "").toLowerCase().includes(q);
    const matchesCategory = category === "All" || (e.category || "Other") === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* HERO / Heading */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-sky-50 to-rose-50 rounded-2xl p-8 shadow-[var(--shadow-soft)] overflow-hidden relative">
          <div className="absolute -right-20 -top-14 opacity-20 transform rotate-12">
            <Heart className="w-56 h-56 text-primary" />
          </div>

          <div className="relative z-10">
            <h1 className="gradient-text text-4xl md:text-5xl font-extrabold leading-tight mb-2">
              Events & Community Calendar
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover transgender-focused festivals, pride marches, workshops and meetups across India. Search,
              filter, RSVP and add events to your calendar — all in one place.
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-[420px]">
                  <Search className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    className="pl-10 pr-4 py-3 w-full border rounded-xl focus:outline-none focus:ring focus:ring-primary/30 bg-white shadow-sm"
                    placeholder="Search events, city, or description..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <select
                  className="px-3 py-2 border rounded-xl focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("cards")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${view === "cards" ? "bg-primary text-white" : "border"}`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${view === "calendar" ? "bg-primary text-white" : "border"}`}
                >
                  Calendar
                </button>
                <a
                  className="ml-2 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border hover:bg-muted transition"
                  href="/events.json"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-4 h-4" /> JSON
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-24">Loading events…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">No events match your search.</div>
      ) : view === "cards" ? (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => (
              <article
                key={e.id}
                className="relative bg-white rounded-2xl p-5 shadow-[var(--shadow-soft)] transform hover:-translate-y-1 hover:scale-[1.01] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-xs font-medium">
                        <Calendar className="w-4 h-4" /> {e.start_date}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{e.category}</span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold leading-snug">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{e.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{e.place}{e.city ? ` · ${e.city}` : ""}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => toggleRsvp(e.id)}
                      className={`px-3 py-1 rounded-md font-medium transition ${rsvps[e.id] ? "bg-success text-white" : "border"}`}
                      aria-pressed={!!rsvps[e.id]}
                    >
                      {rsvps[e.id] ? "Going ✓" : "Participate"}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        className="text-xs px-3 py-1 rounded-md border inline-flex items-center gap-2 hover:bg-muted"
                        href={createGoogleCalendarLink(e)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Add to Calendar
                      </a>

                      <button
                        onClick={() => setActive(e)}
                        className="text-xs px-3 py-1 rounded-md border hover:bg-muted"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        // calendar-like grouped view
        <section>
          <h2 className="text-2xl font-semibold mb-4">Events by Month</h2>
          <div className="space-y-6">
            {groupByMonth(filtered).map((grp) => (
              <div key={grp.month}>
                <h3 className="text-xl font-medium mb-3">{grp.month}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {grp.items.map((e) => (
                    <div key={e.id} className="p-4 rounded-xl border flex justify-between items-start">
                      <div>
                        <div className="text-sm text-muted-foreground">{e.start_date}</div>
                        <h4 className="font-medium">{e.title}</h4>
                        <p className="text-sm text-muted-foreground">{e.city} · {e.state}</p>
                        <p className="mt-2 text-sm line-clamp-2">{e.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => toggleRsvp(e.id)}
                          className={`px-3 py-1 rounded-md font-medium transition ${rsvps[e.id] ? "bg-success text-white" : "border"}`}
                        >
                          {rsvps[e.id] ? "Going ✓" : "Participate"}
                        </button>
                        <a href={e.source_url || "#"} target="_blank" rel="noreferrer" className="text-xs underline">
                          Source
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Details Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          onClick={() => setActive(null)}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{active.title}</h3>
                <div className="text-sm text-muted-foreground">{active.start_date}{active.end_date ? ` — ${active.end_date}` : ""}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleRsvp(active.id)} className={`px-3 py-1 rounded-md ${rsvps[active.id] ? "bg-success text-white" : "border"}`}>
                  {rsvps[active.id] ? "Going ✓" : "Participate"}
                </button>
                <button onClick={() => setActive(null)} className="px-3 py-1 rounded-md border">Close</button>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{active.description}</p>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <MapPin className="inline-block mr-2" /> {active.place} {active.city ? `· ${active.city}` : ""}
              </div>
              <div className="flex items-center gap-3">
                <a href={createGoogleCalendarLink(active)} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border text-sm">
                  Add to Calendar
                </a>
                {active.source_url && (
                  <a href={active.source_url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border text-sm inline-flex items-center gap-2">
                    Source <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* Helpers */

function createGoogleCalendarLink(e: any) {
  const start = (e.start_date || "").replace(/-/g, "");
  const end = (e.end_date || e.start_date || "").replace(/-/g, "");
  const dates = start ? `${start}/${end || start}` : "";
  const text = encodeURIComponent(e.title || "");
  const details = encodeURIComponent(e.description || (e.source_url ? `Source: ${e.source_url}` : ""));
  const location = encodeURIComponent((e.place || "") + (e.city ? `, ${e.city}` : ""));
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

function groupByMonth(items: any[]) {
  const months: Record<string, any[]> = {};
  items.forEach((i) => {
    const m = i.start_date ? new Date(i.start_date).toLocaleString(undefined, { month: "long", year: "numeric" }) : "Unknown";
    months[m] = months[m] || [];
    months[m].push(i);
  });
  // sort months by date ascending
  return Object.keys(months)
    .sort((a, b) => {
      const da = new Date(months[a][0]?.start_date || 0).getTime();
      const db = new Date(months[b][0]?.start_date || 0).getTime();
      return da - db;
    })
    .map((m) => ({ month: m, items: months[m] }));
}
