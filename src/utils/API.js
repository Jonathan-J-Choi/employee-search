import axios from "axios";

export default {
  // API for grabbing 50 random employees
  getEmployee: function() {
    return axios.get("https://randomuser.me/api/?results=50&nat=us")
}};
