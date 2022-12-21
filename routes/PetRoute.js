// Add Pet API

// Route: ‘/pet’ [POST] (Protected to admin only)
// The add pet api is responsible for adding new pets
// Validate all the user input is valid
// Handle photo upload
// Store pet information in the database

// Fields: 
// Type 
// Name
// Adoption Status (Adopted, Fostered, Available)
// Picture (Picture location URL/Path)
// Height (number)
// Weight (Number)
// Color
// Bio
// Hypoallergenic (Boolean)
// Dietary restrictions
// Breed
// Get Pet By ID API
// Route: ‘/pet/:id’ [GET]
// Get a pet by ID should take an id and return the corresponding pet from the database. 

// Edit Pet API

// Route: ‘/pet/:id’ [PUT] (protected to admin only)
// The add pet api is responsible for editing pets
// Validate all the user input is valid
// Handle photo upload
// Store pet information in the database

// Fields: Same as Add Pet API

// Get Pets API
// Route: ‘/pet’ [GET] 

// The get pets API is responsible for retrieving pets that match the criteria given.
// Can receive query parameters to search the database
// Retrieve results to match query. If no parameters are passed it should return all the results.
// Should only return the fields necessary 

// Search Fields: 
// Adoption Status
// Type
// Height
// Weight
// Name

// Adopt/Foster API

// Route ‘/pet/:id/adopt’ [POST] (protected to logged in users)
// The Adopt/Foster API is responsible for adding the pet to the current users pets.
// This API also should change the pet’s adoption status. 

// Field: 
// Type (Adopt or foster)

// Return Pet API

// Route ‘/pet/:id/return’ [POST] (protected to logged in users)
// The Return Pet API is responsible for returning the pet to the agency. 
// The API should change the pets status back to available
// The API should remove the pet from the users pets.

// Save Pet API
// Route ‘/pet/:id/save’ [POST] (protected to logged in users)
// The save PET api allows a user to save a pet for later
// The saved pet should be stored as saved in the users account

// Delete Saved Pet API
// Route ‘/pet/:id/save’ [DELETE] (protected to logged in users)
// The save PET api allows a user to remove a saved pet.

// Get Pets By User ID API
// Route ‘/pet/user/:id’ [GET]
// This api allows a user to get the pets owned by (or saved) by a user based on the user id.
