export type Size = {
  size: string
  price: number
}

export type Upgrade = {
  id: string
  name: string
  price: number
  description: string
}

export type MenuItem = {
  id: string
  name: string
  description: string
  cuisine: string
  sizes: Size[]
  upgrades: Upgrade[]
}

export type OrderItem = {
  menuItem: string
  size: string
  upgrades: string[]
}

export type Order = OrderItem[]
