import backendURL from "./backendURL";

export const addToWishList = (animal, user) => {
    const newItem = {
        animalId: animal,
        userId: user,
    };

    return fetch(backendURL + "/api/wishlist/add", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(newItem)
    }).then(res => {
        if(res.status === 200) {
            return true;
        }else if(res.status >= 400){
            throw new Error("Fail to add animal to wishlist");
        }
    });
};

export const isInWishList = (animal, user) => {
    return fetch(backendURL + "/api/wishlist/"+ animal + "&" + user, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
        })
    }).then(res => {
        if(res.status === 200) {
            return res.json().then(data => {
                return data.length > 0
            });
        }else if(res.status >= 400){
            throw new Error("Fail to get animal from wishlist");
        }
    });
};



export const removeFromWishList = (animal, user) => {
    const item = {
        animalId: animal,
        userId: user,
    };

    return fetch(backendURL + "/api/wishlist/delete", {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(item)
    }).then(res => {
        if(res.status === 200) {
            return true;
        }else if(res.status >= 400){
            throw new Error("Fail to remove animal from wishlist");
        }
    });

};


