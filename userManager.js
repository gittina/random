//list of participants
var partList = [
    ["username", 1],
    ["username2", 2],
];

/**
 * @brief This function check the username and substitute the fust U with _
 * @param String username the username to check
 * @return The useraname without the first U
 */
var safeUsername = function safeUsername(username){
    username = username.replace("U", "_"); 
    
    return username;
}

/**
 * @brief This function store the username in input
 * @param String username the username to store
 */
var storeUsername = function (username){
    
    //if it is already present increment number
    for (i=0; i < partList.length; i++){
            if (partList[i][0] == username)
                {
                    partList[i][1] = partList[i][1]+1;
                    return;//stop here if found
                }
        }
    
    //if reach this point push a new element
    partList.push([username, 1]);
    
}

/**
 * @brief getter of the list of user
 * @return the list of user
 */
var getList = function getList(){
    return partList;
}

/**
 * @brief this function returns the user with the highest value.
 * @return the username with the highest value in the list of user.
 */
var mostUsed = function mostUsed(){
    var position =0;
    var users=0;
    
    //if it is already present increment number
    for (i=0; i < partList.length; i++){
            if (partList[i][1] > users)
                {
                    position = i;
                    users = partList[i][1]
                }
        }
    
    return partList[position][0];
    
}

//export functions
exports.safeUsername = safeUsername; 
exports.storeUsername = storeUsername; 
exports.getList = getList; 
exports.mostUsed = mostUsed; 