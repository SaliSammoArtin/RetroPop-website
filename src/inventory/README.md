# Inventory Module

## User Story
As an admin, I want to see the current stock balance and receive a warning when stock levels are low.

## Classes
- `StockItem` – represents an inventory item (id, name, stock, reorder point)
- `StockMovement` – represents a stock movement (product id, type, quantity, timestamp)
- `InventoryPage` – fetches and displays products, current balances and low-stock warnings
- `InventoryService` – calculates balances, builds the inventory report and saves new stock movements

## API

### Products
- Endpoint: `/products`
- Method: `GET`
- Purpose: retrieves products and their starting stock levels

### Stock movements
- Endpoint: `/stockMovements`
- Method: `GET`
- Purpose: retrieves existing `IN` and `OUT` stock movements

- Endpoint: `/stockMovements`
- Method: `POST`
- Purpose: saves a new stock movement