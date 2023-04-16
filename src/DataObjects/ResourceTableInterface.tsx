import axios from "axios";

export interface ResourceTableRow {
        id: Number,
        Resources: String,
        ResourcesName: String,
        ResourcesCurrentNum: Number,
        ResourceRandom: Number
    }


    export interface ResourceTableJsonObject {
        id: -1,
        resources_pic: " ",
        resources_name: " ",
        resources_current_num: 1,
        resource_random: 1
    }


    export async function getResourceTable() {
        const response = await axios.get(
          'http://localhost:8040/resources',
          {}
        );

        return response;
    }