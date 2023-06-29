exports.userResponse = (users) => {

    let userResult = []
    users.array.forEach(user => {
        
        userResult.push ({
            name : user.name,
            userId : user.userid,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
        })
    });
    return userResult;
}