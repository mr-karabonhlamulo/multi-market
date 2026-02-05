-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'partner', 'customer')) default 'customer',
  referrer_id uuid references users(id),
  rank text check (rank in ('bronze', 'silver', 'gold', 'platinum')) default 'bronze',
  wallet_balance numeric(10, 2) default 0.00,
  team_size int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Products Table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  image_url text,
  retail_price numeric(10, 2) not null,
  wholesale_price numeric(10, 2) not null, -- For partners
  moq int default 1, -- Minimum Order Quantity for wholesale
  stock int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Orders Table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) not null,
  total_amount numeric(10, 2) not null,
  status text check (status in ('pending', 'paid', 'shipped', 'delivered')) default 'pending',
  is_wholesale boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Order Items Table
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) not null,
  product_id uuid references products(id) not null,
  quantity int not null,
  price_at_purchase numeric(10, 2) not null
);

-- Commissions Table
create table commissions (
  id uuid primary key default uuid_generate_v4(),
  partner_id uuid references users(id) not null,
  order_id uuid references orders(id) not null,
  amount numeric(10, 2) not null,
  status text check (status in ('pending', 'paid')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Security Policies (RLS) - Examples
alter table users enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

-- Policies can be added later (e.g., users can view own data)
