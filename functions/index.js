const functions = require('firebase-functions');
// Importing cors package, and running a function to set origin to true. Allowing a Native device to work and communicate to the server
const cors = require('cors')({origin: true});
// filestorage
const fs = require('fs');
// Importing unique ID package
const UUID = require('uuid-v4');

// Google Cloud Config
const gcconfig = {
    projectId: "my-project-1559060339539",
    keyFilename: "native-project.json"
}
// Cloud config passed as an immediate function to ensure access rights
const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// This is written in NODE.js! Don't be a fool you have to play by the rules!
// If you want to use a different language then you will have to write your own back end, SIMPLEZ :) 
exports.storeImage = functions.https.onRequest((request, response) => {
    // cors forwarding the request, response and then run the function
    return cors(request, response, () => {
        const body = JSON.parse(request.body); 
        // will write the file and block the executiton till done
        // 1. Stores, 2. Parse -> Body.image, 3. File Type, 4. IF error
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
            console.log(err);
            // Return the response status if error on server then passing json payload fetching the error message.
            return response.status(500).json({error: err})
        });
        // Google Cloud Storage bucket targetting the bucket made
        const bucket = gcs.bucket('my-project-1559060339539.appspot.com');
        const uuid = UUID();

        return bucket.upload('/tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            // If NOT an error
            if (!err) {
                return response.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' + 
                        bucket.name + 
                        '/o/' +
                        encodeURIComponent(file.name) +
                        '?alt=media&token=' +
                        uuid
                });
            } else {
                console.log(err);
                return response.status(500).json({error: err});
            }
        });
    });
});
