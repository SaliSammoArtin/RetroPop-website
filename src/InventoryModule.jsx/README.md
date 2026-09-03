# InventoryModule

## Purpose
Calculates current stock balance based on stock movements and gives a warning when the balance reaches the reorder point.

## User Story
As an admin, i want to see stock balance and get a warning when stock levels are low.

## Classes
- `StockItem` – represents an article (id, name, reorder point)
- `StockMovement` – represents a stock event (type, quantity, timestamp)
- `InventoryService` – fetches data, calculates balance, builds report

- ## API
- Endpoint: `/api/inventory`
- Method: GET (reads stock movements and items)
