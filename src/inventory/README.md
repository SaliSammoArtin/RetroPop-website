# InventoryModule

## Purpose
Calculates current stock balance based on stock movements and gives a warning when the balance reaches the reorder point.

## User Story
As an admin, i want to see stock balance and get a warning when stock levels are low.

## Classes
- `StockItem` – represents an inventory item (id, name, reorder point)
- `StockMovement` – represents a stock event (product id, type, quantity, timestamp)
- `InventoryPage` – displays products, stock levels and low-stock warnings
- `InventoryService` – calculates stock balance and builds the inventory report

## API
- Endpoint: `/products`
- Method: GET 
- Purpose: retrieves the current products and their stock levels
