import backendURL from "./backendURL";


export const getUserByAnimalId = (animalId) => {

    return fetch( backendURL + "/animalinfo/userinfo", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id : animalId})
    }).then(res => {
        if(res.status === 200) {
            return res.json().then(data => data.uuid);
        }else if(res.status >= 400){
            throw new Error("Fail to get user by animal id");
        }
    });
};
