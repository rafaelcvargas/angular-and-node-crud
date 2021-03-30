import { Client } from "./client.model";

export interface ClientSearchResults {
    count: number;
    result: Client[];
}