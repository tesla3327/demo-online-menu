<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MenuItem, OrderItem, Order } from './types'
import menu from './menu'

const useOrder = () => {
  const currentSelection = ref<OrderItem | undefined>(undefined)
  const order = ref<Order>([])

  const selectItem = (item: MenuItem) => {
    currentSelection.value = {
      menuItem: item.id,
      size: item.sizes[0].size,
      upgrades: []
    }
  }

  const addToOrder = () => {
    if (!currentSelection.value) {
      return
    }

    order.value.push(currentSelection.value)
    currentSelection.value = undefined
  }

  const findMenuItem = (id: string): MenuItem | undefined => menu.find((item) => item.id === id)
  const orderTotal = computed((): number => {
    let total = 0

    order.value.forEach((orderItem) => {
      const menuItem = findMenuItem(orderItem.menuItem)
      if (!menuItem) {
        return
      }

      const size = menuItem.sizes.find(({ size }) => size === orderItem.size)
      if (!size) {
        return
      }

      total += size.price

      orderItem.upgrades.forEach((upgradeId) => {
        const upgrade = menuItem.upgrades.find(({ id }) => id === upgradeId)
        if (!upgrade) {
          return
        }

        total += upgrade.price
      })
    })

    return total
  })

  const orderSummary = computed(() => {
    const summary: Record<string, { quantity: number; price: number }> = {}

    order.value.forEach((orderItem) => {
      const menuItem = findMenuItem(orderItem.menuItem)
      if (!menuItem) {
        return
      }

      const size = menuItem.sizes.find(({ size }) => size === orderItem.size)
      if (!size) {
        return
      }

      let upgradesString = ''
      orderItem.upgrades.forEach((upgradeId) => {
        const upgrade = menuItem.upgrades.find(({ id }) => id === upgradeId)
        if (!upgrade) {
          return
        }

        upgradesString += ` - ${upgrade.name}`
      })

      const key = `${menuItem.name} (${size.size})${upgradesString}`
      summary[key] = summary[key]
        ? { quantity: summary[key].quantity + 1, price: size.price }
        : { quantity: 1, price: size.price }
    })

    return summary
  })

  return {
    currentSelection,
    selectItem,
    addToOrder,
    orderTotal,
    orderSummary
  }
}

const { currentSelection, selectItem, addToOrder, orderTotal, orderSummary } = useOrder()
</script>

<template>
  <div>
    <h1>Menu</h1>
    <div v-for="item in menu" :key="item.id">
      <h3>{{ item.name }} — ${{ item.sizes[0].price }}</h3>
      <p>{{ item.description }}</p>

      <!-- Select button -->
      <button @click="selectItem(item)">Select</button>

      <div v-if="currentSelection?.menuItem === item.id">
        <!-- Choose the size -->
        <div>
          <label>Size:</label>
          <select v-model="currentSelection.size">
            <option v-for="size in item.sizes" :key="size.size" :value="size.size">
              {{ size.size }} - ${{ size.price }}
            </option>
          </select>
        </div>

        <!-- Choose upgrades -->
        <div>
          <label>Upgrades:</label>
          <div v-for="upgrade in item.upgrades" :key="upgrade.id">
            <input type="checkbox" v-model="currentSelection.upgrades" :value="upgrade.id" />
            {{ upgrade.name }} - ${{ upgrade.price }}
          </div>
        </div>

        <button @click="addToOrder">+ Add to Order</button>
      </div>
    </div>

    <h2>Order Summary</h2>
    <div class="order-item" v-for="(item, key) in orderSummary" :key="key">
      <div>
        <strong>{{ key }}</strong>
      </div>
      <div>Quantity: {{ item.quantity }}</div>
      <div>Price each: ${{ item.price }}</div>
    </div>
    <div>Total: ${{ orderTotal }}</div>
  </div>
</template>

<style scoped>
.order-item {
  border: 1px solid black;
  padding: 10px;
  margin: 10px 0;
}
</style>
