import axios from "axios";

export interface ClientTableInventoryRow {
        id: Number,
        InventoryName: String,
        InventoryAddress: String,
        InventoryCount: Number,
        InventoryMaxCount: Number
    }


    export interface ClientTableJsonObject {
        id: Number,
        inventory_name: String,
        inventory_address: String,
        inventory_current_num: Number,
        inventory_max_num: Number
    }


    export async function getClientTable() {
        const response = await axios.get(
          'http://localhost:8040/inventory',
          {}
        );

        return response;
    }