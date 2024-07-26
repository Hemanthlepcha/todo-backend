import graphql from "./graphql.js";
import auth from "./auth.js";

const routes =(app)=>{
    auth(app)
    graphql(app);
    
}
export default routes