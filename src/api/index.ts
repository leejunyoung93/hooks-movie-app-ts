import Ajax from "./ajax";

class ResourceService extends Ajax {
    public constructor(link: string) {
        super({
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            baseURL: link
        });
    }
}

const link = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const service = new ResourceService(link);

export default service;
