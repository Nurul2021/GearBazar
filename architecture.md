# GearBazar - High-Level System Architecture

## 1. System Overview

**Platform Type:** Multi-vendor B2B/B2C E-commerce Marketplace for Auto Parts & Garage Services

**Tech Stack:**
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Redux Toolkit, RTK Query
- **Backend:** Node.js, Express.js, MongoDB with Mongoose
- **Authentication:** JWT-based with Role-Based Access Control (RBAC)
- **State Management:** Redux Toolkit with persistent storage

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Next.js)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │
│  │   Pages     │  │ Components  │  │   Hooks     │  │  Redux Store    │   │
│  │  (App Dir)  │  │  (UI Kit)   │  │ (Custom)    │  │  (RTK Query)    │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│                          Next.js API Routes (BFF)                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVER (Node.js)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        API Gateway / Express                       │   │
│  │              (Rate Limiting, CORS, Validation, Logging)             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Auth       │  │   Product    │  │    Order     │  │   Payment    │   │
│  │   Module     │  │   Module     │  │   Module     │  │   Module     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   User       │  │   Garage     │  │   Inventory  │  │   Report     │   │
│  │   Module     │  │   Module     │  │   Module     │  │   Module     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│                          Database (MongoDB)                                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐   │
│  │  Users  │  │Products │  │ Orders  │  │Garages  │  │   Analytics    │   │
│  │Collection│ │Collection│ │Collection│ │Collection│ │   Collection   │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Authentication & Role-Based Access Control

### User Roles
| Role | Description | Permissions |
|------|-------------|-------------|
| **Admin** | Platform Superuser | Full system access, user management, reports, pricing rules |
| **Seller** | Auto Parts Vendor | Manage products, view orders, pricing management |
| **Garage Owner** | B2B Customer | Bulk orders, appointment booking, credit system |
| **Customer** | B2C Retail Customer | Browse, purchase, track orders |

### Authentication Flow
```
User Login → JWT Token Generation → Token stored in HTTP-Only Cookie
                                                    │
                            ┌───────────────────────┼───────────────────────┐
                            │                       │                       │
                            ▼                       ▼                       ▼
                    Validate Token          Check Role           Load Permissions
                    (Middleware)           (Middleware)            (Redux Slice)
```

### Dual-Pricing System Logic
```javascript
// Pricing Strategy Based on User Role
const getPrice = (product, userRole) => {
  const { retailPrice, wholesalePrice, garagePrice } = product;
  
  switch (userRole) {
    case 'Admin':
      return wholesalePrice * 0.5; // Cost price
    case 'Seller':
      return wholesalePrice;       // Wholesale
    case 'Garage Owner':
      return garagePrice;           // B2B special rate
    case 'Customer':
      return retailPrice;           // Standard retail
    default:
      return retailPrice;
  }
};
```

---

## 4. Clean Architecture - Directory Structure

### Frontend (Next.js)

```
gearbazar-frontend/
├── public/                          # Static assets
├── src/
│   ├── app/                         # Next.js App Router (Pages)
│   │   ├── (auth)/                  # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/             # Protected dashboard routes
│   │   │   ├── admin/
│   │   │   ├── seller/
│   │   │   ├── garage/
│   │   │   └── customer/
│   │   ├── (shop)/                  # Public shop routes
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── api/                     # API routes (BFF)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/                  # UI Components (Clean Architecture)
│   │   ├── common/                  # Shared components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   └── Loader/
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   └── features/               # Feature-specific components
│   │       ├── auth/
│   │       ├── products/
│   │       ├── cart/
│   │       ├── orders/
│   │       └── garage/
│   │
│   ├── features/                   # Redux Feature Modules
│   │   ├── auth/                    # Auth slice, API
│   │   ├── products/                # Product management
│   │   ├── cart/                    # Shopping cart
│   │   ├── orders/                  # Order management
│   │   ├── users/                   # User management
│   │   └── garage/                  # Garage services
│   │       └── slices/
│   │       └── api/
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── usePricing.ts
│   │
│   ├── lib/                         # Utilities & Config
│   │   ├── api/                     # API client
│   │   ├── constants/               # App constants
│   │   ├── utils/                   # Helper functions
│   │   └── validations/             # Zod schemas
│   │
│   ├── store/                       # Redux Store
│   │   ├── index.ts                 # Store configuration
│   │   └── middleware.ts            # Custom middleware
│   │
│   ├── types/                       # TypeScript Types
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   ├── order.types.ts
│   │   └── index.ts
│   │
│   └── config/                      # App Configuration
│       └── constants.ts
│
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Backend (Node.js/Express)

```
gearbazar-backend/
├── src/
│   ├── config/                      # Configuration
│   │   ├── db.ts                    # MongoDB connection
│   │   ├── env.ts                   # Environment variables
│   │   └── cors.ts                  # CORS config
│   │
│   ├── core/                        # Core Business Logic (Domain)
│   │   ├── entities/                # Domain Entities
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Order.ts
│   │   │   └── Garage.ts
│   │   ├── interfaces/             # Repository Interfaces
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IProductRepository.ts
│   │   │   └── IOrderRepository.ts
│   │   └── services/               # Domain Services (Use Cases)
│   │       ├── AuthService.ts
│   │       ├── PricingService.ts    # Dual-pricing logic
│   │       ├── OrderService.ts
│   │       └── InventoryService.ts
│   │
│   ├── modules/                     # Application Modules (Controllers)
│   │   ├── auth/
│   │   │   ├── controller.ts
│   │   │   ├── routes.ts
│   │   │   ├── middleware.ts
│   │   │   └── validation.ts
│   │   ├── products/
│   │   │   ├── controller.ts
│   │   │   ├── routes.ts
│   │   │   ├── middleware.ts
│   │   │   └── validation.ts
│   │   ├── orders/
│   │   ├── users/
│   │   ├── garage/
│   │   └── payments/
│   │
│   ├── infrastructure/             # External Services & DB
│   │   ├── database/
│   │   │   ├── models/              # Mongoose Models
│   │   │   │   ├── UserModel.ts
│   │   │   │   ├── ProductModel.ts
│   │   │   │   ├── OrderModel.ts
│   │   │   │   └── GarageModel.ts
│   │   │   └── repositories/        # Repository Implementations
│   │   │       ├── UserRepository.ts
│   │   │       ├── ProductRepository.ts
│   │   │       └── OrderRepository.ts
│   │   ├── email/                   # Email service
│   │   └── payment/                 # Payment gateway
│   │
│   ├── shared/                      # Shared Utilities
│   │   ├── decorators/              # Custom decorators
│   │   ├── middlewares/            # Global middleware
│   │   ├── utils/                  # Helper functions
│   │   ├── constants/             # App constants
│   │   └── exceptions/            # Custom exceptions
│   │
│   ├── app.ts                      # Express app setup
│   ├── server.ts                   # Server entry point
│   └── routes.ts                   # Main routes configuration
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 5. Database Schema (MongoDB)

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: Enum['admin', 'seller', 'garage_owner', 'customer'],
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    companyName: String (for garage/seller),
    address: Object,
    avatar: String
  },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  sellerId: ObjectId (ref: User),
  name: String,
  category: String,
  brand: String,
  partNumber: String,
  vehicleCompatibility: [String],
  pricing: {
    retailPrice: Number,
    wholesalePrice: Number,
    garagePrice: Number
  },
  stock: {
    quantity: Number,
    warehouse: String
  },
  images: [String],
  description: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  customerId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    quantity: Number,
    unitPrice: Number,        // Role-based price applied
    subtotal: Number
  }],
  totalAmount: Number,
  status: Enum['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
  shippingAddress: Object,
  paymentStatus: Enum['pending', 'paid', 'failed'],
  createdAt: Date,
  updatedAt: Date
}
```

### Garage Collection
```javascript
{
  _id: ObjectId,
  ownerId: ObjectId (ref: User),
  name: String,
  address: Object,
  services: [{
    name: String,
    description: String,
    price: Number,
    duration: Number (minutes)
  }],
  workingHours: Object,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. API Endpoints Overview

### Authentication
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | User login |
| POST | /api/auth/logout | All | Logout |
| GET | /api/auth/me | All | Get current user |

### Products
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | /api/products | All | List products (with role-based pricing) |
| GET | /api/products/:id | All | Get product details |
| POST | /api/products | Seller/Admin | Create product |
| PUT | /api/products/:id | Seller/Admin | Update product |
| DELETE | /api/products/:id | Seller/Admin | Delete product |

### Orders
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | /api/orders | Customer | Get my orders |
| POST | /api/orders | Customer | Create order |
| GET | /api/orders/:id | Customer | Get order details |
| PUT | /api/orders/:id/status | Seller/Admin | Update order status |

### Garage Services
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | /api/garages | All | List garages |
| POST | /api/garages | Garage Owner | Register garage |
| GET | /api/garages/:id/services | All | Get garage services |
| POST | /api/garages/:id/book | Customer | Book appointment |

---

## 7. Security & Performance Considerations

### Security
- JWT tokens in HTTP-only cookies
- Role-based middleware for route protection
- Input validation with Zod
- Rate limiting on API endpoints
- XSS & CSRF protection
- SSL/TLS encryption

### Performance
- MongoDB indexing on frequently queried fields
- Redis for session caching (optional)
- Next.js server-side rendering & static generation
- Image optimization with next/image
- API response pagination

---

## 8. Technology Version Recommendations

| Package | Version |
|---------|---------|
| Node.js | 18.x or 20.x LTS |
| Next.js | 14.x |
| React | 18.x |
| MongoDB | 6.x or 7.x |
| Express | 4.x |
| Redux Toolkit | 2.x |
| Tailwind CSS | 3.x |
| TypeScript | 5.x |

---

## 9. Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=GearBazar
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gearbazar
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```