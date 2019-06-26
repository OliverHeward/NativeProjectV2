import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
// Importing Set Places and Remove Place from Redux
import { uiStartLoading, uiStopLoading, authGetToken } from './index';
// Import Loading Circle and Stop loading circle function

// Running placeName through addplace function
export const addPlace = (placeName, location, image) => {
    // Add Place is now a return Dispatch function to FireBase
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found");
        })
        .then(token => {
            authToken = token;
            return fetch("https://us-central1-my-project-1559060339539.cloudfunctions.net/storeImage", {
                method: "POST",
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    Authorization: "Bearer " + authToken
                }
            }
            );
        })
        // Catching data and storing in an Object
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try again please");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            // Fetch API POST to FireBase
            return fetch("https://my-project-1559060339539.firebaseio.com/places.json?auth=" + authToken, {
                method: "POST",
                body: JSON.stringify(placeData)
            });
        })
        // Success send response in JSON
        .then(res => res.json())
        // log the parsed Response
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong, please try ERROR");
            dispatch(uiStopLoading());
        });
    };
};

// Get Places export fetching content from google cloud
export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://my-project-1559060339539.firebaseio.com/places.json?auth=" + token)
            })
            .catch(() => {
                alert("No valid token found");
            }).then(res => res.json())
            /* FOR loop that iterates through each key in parsedRes on google database and pushes each place into an array of 'places' whilst grabbing base64 image from Storage 
            */
            .then(parsedRes => {
                parsedRes.error && alert(`${parsedRes.error}`);
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    });
                }
                dispatch(setPlaces(places));
                // Dispatch results to setPlaces
            })
            .catch(err => {
                alert("Something went wrong, sorry");
                console.log(err);
            });
        };
};

// Export for Deleting a Place
export const deletePlace = key => {
    // Return the Key with Fetch and DELETE

    return dispatch => {
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found");
        })
        .then(token => {
            dispatch(removePlace(key));
            return fetch("https://my-project-1559060339539.firebaseio.com/places/" + key + ".json?auth=" + token, {
                method: 'DELETE',
            })
        }).then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        })
        .catch(err => {
            alert('it didn`t work');
            console.log(err);
        });
    };
};

// Remove place from Local Redux Store
export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    }
}

// Set places of Local Redux Store 
export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
}