import type { MenuItem } from './types'

const burger: MenuItem = {
  id: 'burger-item',
  name: 'Burger',
  description: 'Our classic burger is served with a side of fries.',
  cuisine: 'American',
  sizes: [
    {
      size: 'Regular',
      price: 9.99
    },
    {
      size: 'Large',
      price: 12.99
    }
  ],
  upgrades: [
    {
      id: 'extra-patty-upgrade',
      name: 'Extra Patty',
      price: 3.0,
      description: 'Add an extra patty to your burger'
    },
    {
      id: 'bacon-upgrade',
      name: 'Bacon',
      price: 1.5,
      description: 'Add bacon to your burger'
    }
  ]
}

const wings: MenuItem = {
  id: 'wings-item',
  name: 'Wings',
  description: 'Our classic wings are served with a side of fries.',
  cuisine: 'American',
  sizes: [
    {
      size: 'Regular',
      price: 10.99
    },
    {
      size: 'Large',
      price: 14.99
    }
  ],
  upgrades: [
    {
      id: 'extra-sauce-upgrade',
      name: 'Extra Sauce',
      price: 1.0,
      description: 'Add extra sauce to your wings'
    },
    {
      id: 'blue-cheese-upgrade',
      name: 'Blue Cheese',
      price: 1.5,
      description: 'Add blue cheese to your wings'
    }
  ]
}

const fishAndChips: MenuItem = {
  id: 'fish-and-chips-item',
  name: 'Fish and Chips',
  description: 'Our classic fish and chips is served with a side of tartar sauce.',
  cuisine: 'British',
  sizes: [
    {
      size: 'Regular',
      price: 11.99
    },
    {
      size: 'Large',
      price: 15.99
    }
  ],
  upgrades: [
    {
      id: 'extra-fish-upgrade',
      name: 'Extra Fish',
      price: 3.0,
      description: 'Add an extra fish filet to your order'
    },
    {
      id: 'extra-tartar-upgrade',
      name: 'Extra Tartar Sauce',
      price: 1.5,
      description: 'Add extra tartar sauce to your order'
    }
  ]
}

export default [burger, wings, fishAndChips]
