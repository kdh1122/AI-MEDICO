var aws = require('aws-sdk');
var docClient  = new aws.DynamoDB.DocumentClient();
exports.handler =  (event,context,callback) => {
   let date = new Date();
   let params={
        TableName:'dynamo9a9db6ca-dev',
        Item:{
          'email':event.request.userAttributes.email,
          'address':event.request.userAttributes.address,
          'createdAt': date.toISOString(),
          'updatedAt': date.toISOString(),
            }
   		};
  docClient.put(params, (err,data)=>{
  			if(err) {
                     var error = new Error("Failed to save new user");
                     callback(error, event);
            }else{
              		console.log(params.Item);
                    callback(null, event);
            }
  });
};