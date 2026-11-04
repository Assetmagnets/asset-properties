"use client";

import React, { useState, useRef } from "react";
import {
  X,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Clock,
  Layers,
  Send,
  UploadCloud,
  Trash2,
} from "lucide-react";

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const CATEGORIES = [
  "Statutory & Legal",
  "Forensic Due Diligence",
  "Corridor Intelligence",
  "Underwriting Standards",
  "Risk Elimination",
];

const CORRIDORS = [
  "Patia – Infocity Corridor",
  "Pahala – NH-16 Villa Belt",
  "Saheed Nagar Core Luxury",
  "Trisulia Metro Growth Belt",
  "Kalinga Nagar – AIIMS Corridor",
  "Statewide • Odisha & Bhubaneswar",
];

export default function CreateBlogModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreateBlogModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Corridor Intelligence");
  const [corridor, setCorridor] = useState("Patia – Infocity Corridor");
  const [readingTime, setReadingTime] = useState("6 min read");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageFileName, setImageFileName] = useState<string>("");
  const [keywords, setKeywords] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPEG, PNG, WebP, etc.).");
      return;
    }

    // Limit to 4MB for optimal database persistence & web speed
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 4MB. Please select an image under 4MB.");
      return;
    }

    setErrorMsg(null);
    setImageFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageBase64("");
    setImageFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg("Please enter an article title.");
      return;
    }

    if (!excerpt.trim()) {
      setErrorMsg("Please provide an executive summary/excerpt.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": "SUPER_ADMIN",
        },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || undefined,
          category,
          corridor,
          readingTime,
          excerpt: excerpt.trim(),
          content: content.trim(),
          featuredImage: imageBase64 || undefined,
          keyTakeaways: keyTakeaways.trim() || undefined,
          keywords: keywords.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Failed to publish article.");
      } else {
        setSuccessMsg(`Article "${title}" published live to Neon Database!`);
        if (onPostCreated) onPostCreated();
        setTimeout(() => {
          handleReset();
        }, 1200);
      }
    } catch {
      setErrorMsg("Network error connecting to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setSubtitle("");
    setExcerpt("");
    setContent("");
    setKeyTakeaways("");
    setImageBase64("");
    setImageFileName("");
    setKeywords("");
    setErrorMsg(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#05070B]/85 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#D4AF37]/35 bg-[#0B101B] p-6 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/25 p-2 text-[#949BA6] hover:border-[#D4AF37] hover:text-[#F4F1EA] transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#05070B] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            DIRECT NEON DATABASE PUBLISHER
          </div>

          <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#F8F9FA]">
            Publish New Intelligence Article
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[#A6B0BF]">
            Upload an image from your device and publish directly to <strong className="text-white">/blog</strong> via Neon PostgreSQL.
          </p>

          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Why Patia & Infocity Lead Bhubaneswar Real Estate in 2026"
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-sm text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Subtitle / Deck (Optional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. A comprehensive forensic audit on tech corridor land value & appreciation."
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2.5 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3 py-2 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                  Target Corridor
                </label>
                <select
                  value={corridor}
                  onChange={(e) => setCorridor(e.target.value)}
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3 py-2 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                >
                  {CORRIDORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                  Reading Time
                </label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  placeholder="e.g. 6 min read"
                  className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3 py-2 text-xs text-[#F8F9FA] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Device Image Uploader */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Featured Cover Image (Upload Directly From Your Device)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="blog-image-upload"
              />

              {imageBase64 ? (
                <div className="relative rounded-2xl border border-[#D4AF37]/40 bg-[#05070B] p-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={imageBase64}
                      alt="Uploaded preview"
                      className="h-16 w-24 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium text-[#F8F9FA] truncate">
                        {imageFileName || "Uploaded Device Image"}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                        Ready to store directly in Neon DB
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 transition shrink-0"
                    title="Remove Image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="blog-image-upload"
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4AF37]/30 bg-[#05070B] p-6 text-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#05070B]/80 transition group"
                >
                  <UploadCloud className="h-8 w-8 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition mb-2" />
                  <span className="text-xs font-semibold text-[#F8F9FA]">
                    Click to browse and choose an image from your device
                  </span>
                  <span className="text-[11px] text-stone-muted mt-1">
                    Supports PNG, JPG, WebP (Stored directly in database)
                  </span>
                </label>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Executive Excerpt / Summary *
              </label>
              <textarea
                rows={2}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 2-3 sentence overview that appears on the blog feed card and meta description."
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Main Article Body / Content *
              </label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full analytical body of your article here. Paragraphs and insights will format cleanly into the article page."
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1] mb-1.5">
                Key Takeaways (1 per line)
              </label>
              <textarea
                rows={2}
                value={keyTakeaways}
                onChange={(e) => setKeyTakeaways(e.target.value)}
                placeholder="12.8% annual capital appreciation&#10;Zero Gharabari dispute in approved pockets"
                className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#05070B] px-3.5 py-2 text-xs text-[#F8F9FA] placeholder-white/25 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3.5 text-xs font-bold uppercase tracking-wider text-[#05070B] shadow-gold-glow hover:bg-[#e5c349] transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Storing Image & Publishing to Database...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publish Live to Website
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
