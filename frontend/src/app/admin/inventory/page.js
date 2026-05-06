"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Package,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Search,
  Filter,
  Download,
  Edit,
  History,
  ChevronDown,
  Check,
  X,
  Plus,
  Minus,
  Truck,
  Store,
  Warehouse,
  Tag,
  BarChart3,
  Layers,
  ShoppingBag,
  Save,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowUpDown,
} from "lucide-react";

const allProducts = [
  {
    id: 1,
    sku: "GB-ENG-001",
    barcode: "123456789012",
    name: "Engine Oil 5W-30",
    thumbnail:
      "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=100",
    vendor: { name: "AutoParts Pro", type: "shop" },
    category: "Engine Parts",
    brand: "Castrol",
    publicPrice: 4500,
    wholesalePrice: 3200,
    warehouse: { name: "Central Warehouse", shelf: "A-12" },
    stock: 15,
    lowStockThreshold: 5,
    lastUpdated: "2026-05-02",
    auditHistory: [
      {
        date: "2026-05-02",
        user: "Admin",
        oldStock: 12,
        newStock: 15,
        reason: "Restock",
      },
      {
        date: "2026-04-28",
        user: "AutoParts Pro",
        oldStock: 15,
        newStock: 12,
        reason: "Sale",
      },
    ],
  },
  {
    id: 2,
    sku: "GB-BRK-002",
    barcode: "123456789013",
    name: "Brake Pads Set",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100",
    vendor: { name: "Garage X", type: "garage" },
    category: "Brake Systems",
    brand: "Bosch",
    publicPrice: 8900,
    wholesalePrice: 6500,
    warehouse: { name: "North Warehouse", shelf: "B-07" },
    stock: 3,
    lowStockThreshold: 5,
    lastUpdated: "2026-05-03",
    auditHistory: [
      {
        date: "2026-05-03",
        user: "Garage X",
        oldStock: 5,
        newStock: 3,
        reason: "Installation",
      },
    ],
  },
  {
    id: 3,
    sku: "GB-FLT-003",
    barcode: "123456789014",
    name: "Oil Filter",
    thumbnail:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100",
    vendor: { name: "AutoParts Pro", type: "shop" },
    category: "Filters",
    brand: "Denso",
    publicPrice: 1200,
    wholesalePrice: 850,
    warehouse: { name: "Central Warehouse", shelf: "C-23" },
    stock: 0,
    lowStockThreshold: 10,
    lastUpdated: "2026-05-01",
    auditHistory: [
      {
        date: "2026-05-01",
        user: "Admin",
        oldStock: 8,
        newStock: 0,
        reason: "Damaged",
      },
    ],
  },
  {
    id: 4,
    sku: "GB-ELE-004",
    barcode: "123456789015",
    name: "Spark Plugs (4pcs)",
    thumbnail:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=100",
    vendor: { name: "Garage X", type: "garage" },
    category: "Electrical",
    brand: "NGK",
    publicPrice: 3400,
    wholesalePrice: 2400,
    warehouse: { name: "North Warehouse", shelf: "D-15" },
    stock: 45,
    lowStockThreshold: 10,
    lastUpdated: "2026-05-04",
    auditHistory: [
      {
        date: "2026-05-04",
        user: "Garage X",
        oldStock: 40,
        newStock: 45,
        reason: "Restock",
      },
    ],
  },
  {
    id: 5,
    sku: "GB-BDY-005",
    barcode: "123456789016",
    name: "Headlight Assembly",
    thumbnail:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100",
    vendor: { name: "AutoParts Pro", type: "shop" },
    category: "Body Parts",
    brand: "Bosch",
    publicPrice: 15600,
    wholesalePrice: 11200,
    warehouse: { name: "Central Warehouse", shelf: "E-09" },
    stock: 8,
    lowStockThreshold: 5,
    lastUpdated: "2026-05-03",
    auditHistory: [
      {
        date: "2026-05-03",
        user: "Admin",
        oldStock: 10,
        newStock: 8,
        reason: "Return",
      },
    ],
  },
  {
    id: 6,
    sku: "GB-ENG-006",
    barcode: "123456789017",
    name: "Air Filter",
    thumbnail:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100",
    vendor: { name: "Garage Y", type: "garage" },
    category: "Filters",
    brand: "Denso",
    publicPrice: 1800,
    wholesalePrice: 1200,
    warehouse: { name: "South Warehouse", shelf: "F-22" },
    stock: 2,
    lowStockThreshold: 5,
    lastUpdated: "2026-05-02",
    auditHistory: [
      {
        date: "2026-05-02",
        user: "Garage Y",
        oldStock: 7,
        newStock: 2,
        reason: "Sale",
      },
    ],
  },
];

const vendors = [
  { id: 1, name: "AutoParts Pro", type: "shop" },
  { id: 2, name: "Garage X", type: "garage" },
  { id: 3, name: "Garage Y", type: "garage" },
];

const categories = [
  "Engine Parts",
  "Brake Systems",
  "Filters",
  "Electrical",
  "Body Parts",
];
const brands = ["Bosch", "Denso", "NGK", "Castrol", "Mobil"];

export default function MasterInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [showStockModal, setShowStockModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [stockReason, setStockReason] = useState("");
  const [showAuditDrawer, setShowAuditDrawer] = useState(false);
  const [auditData, setAuditData] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const globalStats = useMemo(() => {
    const totalSku = allProducts.length;
    const outOfStock = allProducts.filter((p) => p.stock === 0).length;
    const lowStock = allProducts.filter(
      (p) => p.stock > 0 && p.stock < p.lowStockThreshold,
    ).length;
    const totalValue = allProducts.reduce(
      (sum, p) => sum + p.stock * p.wholesalePrice,
      0,
    );
    return { totalSku, outOfStock, lowStock, totalValue };
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.barcode.includes(query);
        if (!matchesSearch) return false;
      }
      if (selectedVendor !== "all" && product.vendor.name !== selectedVendor)
        return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      )
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false;
      if (stockFilter === "inStock") return product.stock > 0;
      if (stockFilter === "lowStock")
        return product.stock > 0 && product.stock < product.lowStockThreshold;
      if (stockFilter === "outOfStock") return product.stock === 0;
      return true;
    });
  }, [
    searchQuery,
    selectedVendor,
    selectedCategories,
    selectedBrands,
    stockFilter,
  ]);

  const toggleProductSelection = (id) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((pid) => pid !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const openStockModal = (product) => {
    setCurrentProduct(product);
    setNewStock(product.stock);
    setStockReason("");
    setShowStockModal(true);
  };

  const saveStockUpdate = () => {
    // Mock save logic
    setToast({
      show: true,
      message: `Stock updated for ${currentProduct.name}`,
      type: "success",
    });
    setShowStockModal(false);
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const openAuditDrawer = (product) => {
    setAuditData(product.auditHistory);
    setShowAuditDrawer(true);
  };

  const handleBulkAction = (action) => {
    setToast({
      show: true,
      message: `${action} applied to ${selectedProductIds.length} items`,
      type: "success",
    });
    setSelectedProductIds([]);
    setSelectAll(false);
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const updateThreshold = (productId, newThreshold) => {
    // Mock threshold update
    console.log(`Updated threshold for ${productId} to ${newThreshold}`);
  };

  const getStockColor = (stock, threshold) => {
    if (stock === 0) return "text-red-600 bg-red-50";
    if (stock < threshold) return "text-amber-600 bg-amber-50";
    return "text-emerald-600 bg-emerald-50";
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Master Inventory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage all products from vendors, shops, and garages
          </p>
        </div>
        <button
          onClick={() => handleBulkAction("Export to CSV")}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500">
              Total SKUs
            </span>
            <Package size={18} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {globalStats.totalSku}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500">
              Out of Stock
            </span>
            <AlertCircle size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {globalStats.outOfStock}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500">
              Low Stock Items
            </span>
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {globalStats.lowStock}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500">
              Total Inventory Value
            </span>
            <DollarSign size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            PKR {globalStats.totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search product, SKU, barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.name}>
                  {vendor.name} ({vendor.type})
                </option>
              ))}
            </select>
            <div className="relative">
              <select
                multiple
                value={selectedCategories}
                onChange={(e) =>
                  setSelectedCategories(
                    Array.from(e.target.selectedOptions, (opt) => opt.value),
                  )
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm min-h-[40px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Layers
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <div className="relative">
              <select
                multiple
                value={selectedBrands}
                onChange={(e) =>
                  setSelectedBrands(
                    Array.from(e.target.selectedOptions, (opt) => opt.value),
                  )
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm min-h-[40px]"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <Tag
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <div className="flex gap-2">
              {["all", "inStock", "lowStock", "outOfStock"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStockFilter(filter)}
                  className={`px-3 py-2 rounded-lg text-sm capitalize ${
                    stockFilter === filter
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                      : "bg-slate-50 text-slate-600 border border-slate-200"
                  }`}
                >
                  {filter === "all"
                    ? "All"
                    : filter.replace(/([A-Z])/g, " $1").trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedProductIds.length > 0 && (
          <div className="px-4 py-2 bg-indigo-50 border-t border-indigo-100 flex items-center justify-between">
            <span className="text-sm text-indigo-700">
              {selectedProductIds.length} items selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("Change Price")}
                className="px-3 py-1 text-sm bg-white rounded border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                Change Price
              </button>
              <button
                onClick={() => handleBulkAction("Update Stock")}
                className="px-3 py-1 text-sm bg-white rounded border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                Update Stock
              </button>
              <button
                onClick={() => handleBulkAction("Export to CSV")}
                className="px-3 py-1 text-sm bg-white rounded border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                Export
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px]">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Product Info
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Owner/Source
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Pricing
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Warehouse/Location
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Current Stock
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Alert At
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Last Updated
                </th>
                <th className="p-3 text-left text-sm font-medium text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {product.sku} | {product.barcode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {product.vendor.type === "shop" ? (
                        <Store size={16} className="text-indigo-600" />
                      ) : (
                        <Truck size={16} className="text-amber-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {product.vendor.name}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">
                          {product.vendor.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        PKR {product.publicPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        Wholesale: PKR {product.wholesalePrice.toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {product.warehouse.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Shelf: {product.warehouse.shelf}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(product.stock, product.lowStockThreshold)}`}
                      >
                        {product.stock}
                      </span>
                      <button
                        onClick={() => openStockModal(product)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      defaultValue={product.lowStockThreshold}
                      onBlur={(e) =>
                        updateThreshold(product.id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-slate-200 rounded text-sm text-center"
                    />
                  </td>
                  <td className="p-3 text-sm text-slate-600">
                    {product.lastUpdated}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAuditDrawer(product)}
                        className="text-slate-500 hover:text-slate-700"
                        title="Audit Trail"
                      >
                        <History size={16} />
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <Package size={48} className="mx-auto mb-3 text-slate-300" />
            <p>No products found matching your filters</p>
          </div>
        )}
      </div>

      {showStockModal && currentProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Update Stock: {currentProduct.name}
              </h3>
              <button
                onClick={() => setShowStockModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Current Stock:</span>
                <span className="font-medium">{currentProduct.stock}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Stock Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNewStock(Math.max(0, newStock - 1))}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-center"
                  />
                  <button
                    onClick={() => setNewStock(newStock + 1)}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason for Change
                </label>
                <select
                  value={stockReason}
                  onChange={(e) => setStockReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                >
                  <option value="">Select reason</option>
                  <option value="Restock">Restock</option>
                  <option value="Sale">Sale</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Return">Return</option>
                  <option value="Adjustment">Adjustment</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveStockUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAuditDrawer && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setShowAuditDrawer(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Stock Audit Trail
              </h3>
              <button
                onClick={() => setShowAuditDrawer(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {auditData.map((entry, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">
                      {entry.user}
                    </span>
                    <span className="text-xs text-slate-500">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600">{entry.oldStock}</span>
                    <ArrowUpDown size={14} className="text-slate-400" />
                    <span className="text-emerald-600 font-medium">
                      {entry.newStock}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Reason: {entry.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <Check size={18} />
          {toast.message}
        </div>
      )}
    </div>
  );
}
