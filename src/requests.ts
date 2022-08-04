import { HTTPHandler } from "./helpers/httpHandler";

export async function loadSingleForm() {
    return await HTTPHandler.get<{}>('/form')
}