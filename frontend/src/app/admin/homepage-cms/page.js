"use client";
import { useState, useCallback } from "react";
import {
  Image,
  Tag,
  Star,
  ShieldCheck,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  X,
  Save,
  Send,
  Check,
  ChevronDown,
  ChevronUp,
  GripVertical,
  LayoutDashboard,
  Move,
  Monitor,
  Smartphone,
  MessageSquare,
  Building2,
  Layers,
  ChevronRight,
  Pencil,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const initialHeroSlides = [
  {
    id: 1,
    heading: "Premium Auto Parts",
    subheading: "Discover top-quality parts for every vehicle",
    ctaText: "Shop Now",
    ctaLink: "/products",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b23ac5b8b8?w=1200",
    order: 1,
  },
  {
    id: 2,
    heading: "Engine Oil Sale",
    subheading: "Get up to 40% off on premium engine oils",
    ctaText: "View Offers",
    ctaLink: "/offers",
    image:
      "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=1200",
    order: 2,
  },
];

const initialPromoBanners = [
  {
    id: 1,
    title: "Summer Sale",
    text: "Up to 50% off",
    image: "",
    url: "/sale",
    columns: 2,
    visible: true,
  },
  {
    id: 2,
    title: "New Arrivals",
    text: "Latest parts",
    image: "",
    url: "/new",
    columns: 2,
    visible: true,
  },
];

const initialFeatured = {
  type: "categories",
  selectedItems: ["Engine Parts", "Brake Systems", "Filters"],
  limit: 8,
};

const initialReviews = [
  {
    id: 1,
    customer: "Ahmed Khan",
    rating: 5,
    text: "Great service!",
    photo: "",
    pinned: true,
  },
  {
    id: 2,
    customer: "Sara Ali",
    rating: 5,
    text: "Fast delivery",
    photo: "",
    pinned: false,
  },
  {
    id: 3,
    customer: "Mohammad Usman",
    rating: 4,
    text: "Good quality parts",
    photo: "",
    pinned: true,
  },
];

const initialB2B = {
  enabled: true,
  title: "Are you a Garage Owner?",
  subtitle: "Join our B2B program and get exclusive benefits",
  benefits: ["Up to 40% Off", "Free Delivery", "Dedicated Support"],
  bgColor: "#1e3a5f",
  bgPattern: "none",
};

const initialTrustBadges = [
  {
    id: 1,
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: "shield",
    enabled: true,
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "On orders over $50",
    icon: "truck",
    enabled: true,
  },
];

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);
  const [viewMode, setViewMode] = useState("desktop");
  const [expandedSections, setExpandedSections] = useState({
    hero: true,
    promo: true,
    featured: true,
    reviews: true,
    b2b: true,
    trust: true,
  });
  const [previews, setPreviews] = useState({
    hero: false,
    promo: false,
    featured: false,
    reviews: false,
    b2b: false,
    trust: false,
  });

  const [heroSlides, setHeroSlides] = useState(initialHeroSlides);
  const [editingSlide, setEditingSlide] = useState(null);
  const [showSlideModal, setShowSlideModal] = useState(false);

  const [promoBanners, setPromoBanners] = useState(initialPromoBanners);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);

  const [featured, setFeatured] = useState(initialFeatured);

  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [manualReview, setManualReview] = useState({
    customer: "",
    text: "",
    photo: "",
    rating: 5,
  });

  const [b2b, setB2B] = useState(initialB2B);
  const [trustBadges, setTrustBadges] = useState(initialTrustBadges);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const togglePreview = (section) => {
    setPreviews((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const addHeroSlide = () => {
    setEditingSlide({
      id: Date.now(),
      heading: "",
      subheading: "",
      ctaText: "Shop Now",
      ctaLink: "",
      image: "",
      order: heroSlides.length + 1,
    });
    setShowSlideModal(true);
  };

  const editHeroSlide = (slide) => {
    setEditingSlide({ ...slide });
    setShowSlideModal(true);
  };

  const saveHeroSlide = () => {
    if (editingSlide.id && heroSlides.find((s) => s.id === editingSlide.id)) {
      setHeroSlides(
        heroSlides.map((s) => (s.id === editingSlide.id ? editingSlide : s)),
      );
    } else {
      setHeroSlides([...heroSlides, { ...editingSlide, id: Date.now() }]);
    }
    setShowSlideModal(false);
    setEditingSlide(null);
  };

  const deleteHeroSlide = (id) => {
    setHeroSlides(heroSlides.filter((s) => s.id !== id));
  };

  const addPromoBanner = () => {
    setEditingBanner({
      id: Date.now(),
      title: "",
      text: "",
      image: "",
      url: "",
      columns: 2,
      visible: true,
    });
    setShowBannerModal(true);
  };

  const editPromoBanner = (banner) => {
    setEditingBanner({ ...banner });
    setShowBannerModal(true);
  };

  const savePromoBanner = () => {
    if (
      editingBanner.id &&
      promoBanners.find((b) => b.id === editingBanner.id)
    ) {
      setPromoBanners(
        promoBanners.map((b) =>
          b.id === editingBanner.id ? editingBanner : b,
        ),
      );
    } else {
      setPromoBanners([...promoBanners, { ...editingBanner, id: Date.now() }]);
    }
    setShowBannerModal(false);
    setEditingBanner(null);
  };

  const deletePromoBanner = (id) => {
    setPromoBanners(promoBanners.filter((b) => b.id !== id));
  };

  const togglePinReview = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, pinned: !r.pinned } : r)),
    );
  };

  const addManualReview = () => {
    if (manualReview.customer && manualReview.text) {
      setReviews([
        ...reviews,
        { ...manualReview, id: Date.now(), pinned: true },
      ]);
      setManualReview({ customer: "", text: "", photo: "", rating: 5 });
      setShowReviewModal(false);
    }
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const addTrustBadge = () => {
    setTrustBadges([
      ...trustBadges,
      {
        id: Date.now(),
        title: "",
        description: "",
        icon: "shield",
        enabled: true,
      },
    ]);
  };

  const deleteTrustBadge = (id) => {
    setTrustBadges(trustBadges.filter((b) => b.id !== id));
  };

  const updateTrustBadge = (id, field, value) => {
    setTrustBadges(
      trustBadges.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    );
  };

  const tabs = [
    { id: "hero", label: "Hero Section", icon: LayoutDashboard },
    { id: "promo", label: "Promo Banners", icon: Image },
    { id: "featured", label: "Featured", icon: Tag },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "b2b", label: "B2B Banner", icon: Building2 },
    { id: "trust", label: "Trust Badges", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 -mx-6 -mt-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-[1400px] mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Homepage CMS</h1>
            <p className="text-slate-500 text-sm">
              Dynamic control of homepage content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("desktop")}
                className={`px-3 py-2 text-sm flex items-center gap-1 ${viewMode === "desktop" ? "bg-indigo-50 text-indigo-600" : "text-slate-600"}`}
              >
                <Monitor size={16} /> Desktop
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`px-3 py-2 text-sm flex items-center gap-1 ${viewMode === "mobile" ? "bg-indigo-50 text-indigo-600" : "text-slate-600"}`}
              >
                <Smartphone size={16} /> Mobile
              </button>
            </div>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <Save size={16} /> Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
            >
              <Send size={16} /> Publish Changes
            </button>
          </div>
        </div>
      </div>

      {saved && (
        <div className="fixed top-20 right-6 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check size={18} /> Draft saved successfully!
        </div>
      )}
      {published && (
        <div className="fixed top-20 right-6 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check size={18} /> Homepage updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600 bg-white"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === "hero" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Hero Section Slides
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePreview("hero")}
                        className="text-sm text-slate-500 flex items-center gap-1"
                      >
                        {previews.hero ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                        {previews.hero ? "Hide Preview" : "Show Preview"}
                      </button>
                      <button
                        onClick={addHeroSlide}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Slide
                      </button>
                    </div>
                  </div>

                  {previews.hero && (
                    <div
                      className={`border border-slate-200 rounded-lg overflow-hidden ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
                    >
                      <div className="bg-indigo-600 text-white p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">
                          {heroSlides[0]?.heading}
                        </h2>
                        <p className="mb-4">{heroSlides[0]?.subheading}</p>
                        <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium">
                          {heroSlides[0]?.ctaText}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="border border-slate-200 rounded-lg p-4 flex items-center gap-4"
                      >
                        <GripVertical
                          size={18}
                          className="text-slate-400 cursor-move"
                        />
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500">Heading:</span>
                            <p className="font-medium text-slate-900">
                              {slide.heading}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-500">CTA:</span>
                            <p className="font-medium text-slate-900">
                              {slide.ctaText}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-500">Link:</span>
                            <p className="font-medium text-slate-900">
                              {slide.ctaLink}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => editHeroSlide(slide)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteHeroSlide(slide.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "promo" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Promotional Banners
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePreview("promo")}
                        className="text-sm text-slate-500 flex items-center gap-1"
                      >
                        {previews.promo ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                        {previews.promo ? "Hide Preview" : "Show Preview"}
                      </button>
                      <button
                        onClick={addPromoBanner}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Banner
                      </button>
                    </div>
                  </div>

                  {previews.promo && (
                    <div
                      className={`border border-slate-200 rounded-lg overflow-hidden p-4 ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {promoBanners
                          .filter((b) => b.visible)
                          .map((banner) => (
                            <div
                              key={banner.id}
                              className="bg-slate-100 rounded-lg p-4 text-center"
                            >
                              <h4 className="font-semibold">{banner.title}</h4>
                              <p className="text-sm text-slate-600">
                                {banner.text}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {promoBanners.map((banner) => (
                      <div
                        key={banner.id}
                        className="border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-slate-900">
                            {banner.title || "New Banner"}
                          </h4>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setPromoBanners(
                                  promoBanners.map((b) =>
                                    b.id === banner.id
                                      ? { ...b, visible: !b.visible }
                                      : b,
                                  ),
                                )
                              }
                              className="text-sm"
                            >
                              {banner.visible ? (
                                <ToggleRight
                                  size={18}
                                  className="text-emerald-500"
                                />
                              ) : (
                                <ToggleLeft
                                  size={18}
                                  className="text-slate-400"
                                />
                              )}
                            </button>
                            <button
                              onClick={() => editPromoBanner(banner)}
                              className="text-indigo-600"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => deletePromoBanner(banner.id)}
                              className="text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                          <span>Columns: {banner.columns}</span>
                          <span>
                            Status: {banner.visible ? "Visible" : "Hidden"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "featured" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Featured Collections
                    </h3>
                    <button
                      onClick={() => togglePreview("featured")}
                      className="text-sm text-slate-500 flex items-center gap-1"
                    >
                      {previews.featured ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                      {previews.featured ? "Hide Preview" : "Show Preview"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Selection Type
                      </label>
                      <select
                        value={featured.type}
                        onChange={(e) =>
                          setFeatured({ ...featured, type: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      >
                        <option value="categories">Categories</option>
                        <option value="brands">Brands</option>
                        <option value="products">Products</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Selected Items
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {featured.selectedItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center gap-1"
                          >
                            {item}
                            <button
                              onClick={() =>
                                setFeatured({
                                  ...featured,
                                  selectedItems: featured.selectedItems.filter(
                                    (_, i) => i !== idx,
                                  ),
                                })
                              }
                              className="text-indigo-500 hover:text-indigo-700"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Type to search..."
                          className="px-3 py-1 border border-slate-200 rounded-full text-sm flex-1 min-w-[150px]"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value) {
                              setFeatured({
                                ...featured,
                                selectedItems: [
                                  ...featured.selectedItems,
                                  e.target.value,
                                ],
                              });
                              e.target.value = "";
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Limit: {featured.limit} items
                      </label>
                      <input
                        type="range"
                        min="4"
                        max="16"
                        step="4"
                        value={featured.limit}
                        onChange={(e) =>
                          setFeatured({
                            ...featured,
                            limit: parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>4</span>
                        <span>8</span>
                        <span>12</span>
                        <span>16</span>
                      </div>
                    </div>
                  </div>

                  {previews.featured && (
                    <div
                      className={`border border-slate-200 rounded-lg p-4 ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
                    >
                      <h4 className="font-semibold mb-3">
                        Featured {featured.type}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {featured.selectedItems
                          .slice(0, featured.limit)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-100 rounded-lg p-3 text-center text-sm"
                            >
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Reviews & Testimonials
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePreview("reviews")}
                        className="text-sm text-slate-500 flex items-center gap-1"
                      >
                        {previews.reviews ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                        {previews.reviews ? "Hide Preview" : "Show Preview"}
                      </button>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Testimonial
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                              {review.customer[0]}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {review.customer}
                              </p>
                              <div className="flex text-amber-400">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} size={14} fill="currentColor" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePinReview(review.id)}
                              className={`text-sm px-3 py-1 rounded-full ${review.pinned ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}
                            >
                              {review.pinned ? "Pinned" : "Pin"}
                            </button>
                            <button
                              onClick={() => deleteReview(review.id)}
                              className="text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {previews.reviews && (
                    <div
                      className={`border border-slate-200 rounded-lg p-4 ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
                    >
                      <h4 className="font-semibold mb-3">Customer Reviews</h4>
                      {reviews
                        .filter((r) => r.pinned)
                        .map((review) => (
                          <div
                            key={review.id}
                            className="bg-slate-50 rounded-lg p-4 mb-2"
                          >
                            <p className="text-sm italic">"{review.text}"</p>
                            <p className="text-sm font-medium mt-2">
                              - {review.customer}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "b2b" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      B2B Partnership Banner
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePreview("b2b")}
                        className="text-sm text-slate-500 flex items-center gap-1"
                      >
                        {previews.b2b ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                        {previews.b2b ? "Hide Preview" : "Show Preview"}
                      </button>
                      <button
                        onClick={() =>
                          setB2B({ ...b2b, enabled: !b2b.enabled })
                        }
                        className="text-sm"
                      >
                        {b2b.enabled ? (
                          <ToggleRight size={18} className="text-emerald-500" />
                        ) : (
                          <ToggleLeft size={18} className="text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={b2b.title}
                        onChange={(e) =>
                          setB2B({ ...b2b, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={b2b.subtitle}
                        onChange={(e) =>
                          setB2B({ ...b2b, subtitle: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Benefits (one per line)
                      </label>
                      <textarea
                        value={b2b.benefits.join("\n")}
                        onChange={(e) =>
                          setB2B({
                            ...b2b,
                            benefits: e.target.value
                              .split("\n")
                              .filter((b) => b),
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={b2b.bgColor}
                        onChange={(e) =>
                          setB2B({ ...b2b, bgColor: e.target.value })
                        }
                        className="w-20 h-10 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  {previews.b2b && (
                    <div
                      className={`border border-slate-200 rounded-lg overflow-hidden ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : ""}`}
                    >
                      <div
                        className="p-6 text-white"
                        style={{ backgroundColor: b2b.bgColor }}
                      >
                        <h4 className="text-xl font-bold mb-2">{b2b.title}</h4>
                        <p className="mb-4">{b2b.subtitle}</p>
                        <ul className="space-y-1">
                          {b2b.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check size={14} /> {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "trust" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Trust Badges
                    </h3>
                    <button
                      onClick={addTrustBadge}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Badge
                    </button>
                  </div>

                  <div className="space-y-3">
                    {trustBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              updateTrustBadge(
                                badge.id,
                                "enabled",
                                !badge.enabled,
                              )
                            }
                            className="text-sm"
                          >
                            {badge.enabled ? (
                              <ToggleRight
                                size={18}
                                className="text-emerald-500"
                              />
                            ) : (
                              <ToggleLeft
                                size={18}
                                className="text-slate-400"
                              />
                            )}
                          </button>
                          <input
                            type="text"
                            value={badge.title}
                            onChange={(e) =>
                              updateTrustBadge(
                                badge.id,
                                "title",
                                e.target.value,
                              )
                            }
                            className="flex-1 px-3 py-1 border border-slate-200 rounded text-sm"
                            placeholder="Badge title"
                          />
                          <input
                            type="text"
                            value={badge.description}
                            onChange={(e) =>
                              updateTrustBadge(
                                badge.id,
                                "description",
                                e.target.value,
                              )
                            }
                            className="flex-1 px-3 py-1 border border-slate-200 rounded text-sm"
                            placeholder="Description"
                          />
                          <button
                            onClick={() => deleteTrustBadge(badge.id)}
                            className="text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Eye size={18} /> Live Preview
              </h3>
              <p className="text-xs text-slate-500 mt-1">Updates as you edit</p>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              <div
                className={`${viewMode === "mobile" ? "max-w-[320px] mx-auto border-2 border-slate-300 rounded-[2rem] p-4" : ""}`}
              >
                {activeTab === "hero" && heroSlides.length > 0 && (
                  <div className="bg-indigo-600 text-white p-6 rounded-lg text-center mb-4">
                    <h2 className="text-xl font-bold mb-1">
                      {heroSlides[0].heading}
                    </h2>
                    <p className="text-sm mb-3">{heroSlides[0].subheading}</p>
                    <span className="bg-white text-indigo-600 px-4 py-1.5 rounded text-sm font-medium">
                      {heroSlides[0].ctaText}
                    </span>
                  </div>
                )}

                {activeTab === "promo" && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {promoBanners
                      .filter((b) => b.visible)
                      .map((banner) => (
                        <div
                          key={banner.id}
                          className="bg-slate-100 rounded-lg p-3 text-center"
                        >
                          <p className="text-xs font-medium">{banner.title}</p>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === "featured" && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">
                      Featured {featured.type}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {featured.selectedItems.slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-100 rounded p-2 text-xs text-center"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Testimonials</p>
                    {reviews
                      .filter((r) => r.pinned)
                      .slice(0, 2)
                      .map((review) => (
                        <div
                          key={review.id}
                          className="bg-slate-50 rounded p-3 mb-2"
                        >
                          <p className="text-xs italic">"{review.text}"</p>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === "b2b" && b2b.enabled && (
                  <div
                    className="rounded-lg p-4 text-white mb-4"
                    style={{ backgroundColor: b2b.bgColor }}
                  >
                    <p className="text-sm font-bold">{b2b.title}</p>
                    <p className="text-xs mt-1">{b2b.subtitle}</p>
                  </div>
                )}

                {activeTab === "trust" && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Trust Badges</p>
                    <div className="space-y-1">
                      {trustBadges
                        .filter((b) => b.enabled)
                        .map((badge) => (
                          <div
                            key={badge.id}
                            className="flex items-center gap-2 text-xs"
                          >
                            <ShieldCheck
                              size={12}
                              className="text-emerald-500"
                            />
                            {badge.title}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSlideModal && editingSlide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                {editingSlide.id &&
                heroSlides.find((s) => s.id === editingSlide.id)
                  ? "Edit Slide"
                  : "Add Slide"}
              </h3>
              <button
                onClick={() => {
                  setShowSlideModal(false);
                  setEditingSlide(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  value={editingSlide.heading}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      heading: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subheading
                </label>
                <input
                  type="text"
                  value={editingSlide.subheading}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      subheading: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={editingSlide.ctaText}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        ctaText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={editingSlide.ctaLink}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        ctaLink: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Background Image URL
                </label>
                <input
                  type="text"
                  value={editingSlide.image}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, image: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-500">
                  Drag & drop image here or click to upload
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowSlideModal(false);
                  setEditingSlide(null);
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveHeroSlide}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
              >
                Save Slide
              </button>
            </div>
          </div>
        </div>
      )}

      {showBannerModal && editingBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                {editingBanner.id &&
                promoBanners.find((b) => b.id === editingBanner.id)
                  ? "Edit Banner"
                  : "Add Banner"}
              </h3>
              <button
                onClick={() => {
                  setShowBannerModal(false);
                  setEditingBanner(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingBanner.title}
                  onChange={(e) =>
                    setEditingBanner({
                      ...editingBanner,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Overlay Text
                </label>
                <input
                  type="text"
                  value={editingBanner.text}
                  onChange={(e) =>
                    setEditingBanner({ ...editingBanner, text: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  value={editingBanner.url}
                  onChange={(e) =>
                    setEditingBanner({ ...editingBanner, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Grid Columns
                </label>
                <select
                  value={editingBanner.columns}
                  onChange={(e) =>
                    setEditingBanner({
                      ...editingBanner,
                      columns: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                >
                  <option value={2}>2 Columns</option>
                  <option value={3}>3 Columns</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Visible
                </span>
                <button
                  onClick={() =>
                    setEditingBanner({
                      ...editingBanner,
                      visible: !editingBanner.visible,
                    })
                  }
                >
                  {editingBanner.visible ? (
                    <ToggleRight size={20} className="text-emerald-500" />
                  ) : (
                    <ToggleLeft size={20} className="text-slate-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowBannerModal(false);
                  setEditingBanner(null);
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={savePromoBanner}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
              >
                Save Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Add Featured Testimonial
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={manualReview.customer}
                  onChange={(e) =>
                    setManualReview({
                      ...manualReview,
                      customer: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Testimonial
                </label>
                <textarea
                  value={manualReview.text}
                  onChange={(e) =>
                    setManualReview({ ...manualReview, text: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={manualReview.photo}
                  onChange={(e) =>
                    setManualReview({ ...manualReview, photo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setManualReview({ ...manualReview, rating: star })
                      }
                      className={
                        star <= manualReview.rating
                          ? "text-amber-400"
                          : "text-slate-300"
                      }
                    >
                      <Star size={20} fill="currentColor" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={addManualReview}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
              >
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
