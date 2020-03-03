import React,{useState, useEffect} from "react";
import API from "../../utils/API";

function Search(props) {
  // Setting state
  const[state, setState] = useState({
    // employee array first made for testing functionality
    empArray: [
      {
        image:"",
        name: "Tom",
        email: "tom@tom.com",
        dob: "05-05-95",
        phone: "555-555-5555"
      },
      {
        image: "",
        name: "Jon",
        email: "jon@jon.com",
        dob: "06-06-96",
        phone: "666-666-6666"
      }
    ],
    
    // Filtered array after calling API
    filtArray: [
      {
        image:"",
        name: "Tom",
        email: "tom@tom.com",
        dob: "05-05-95",
        phone: "555-555-5555"
      },
      {
        image: "",
        name: "Jon",
        email: "jon@jon.com",
        dob: "06-06-96",
        phone: "666-666-6666"
      }
    ]
  })

  // Calling API
  useEffect( () => {
    API.getEmployee().then( (data)=>{
      // console.log for testing
      console.log(data)
      // Empty array to be pushed into later
      var cleanEmpArr = []
      // Using map for data
      data.data.results.map((singleUser)=>{
        // Empty object
        var cleanUser = {}
        // Selecting data that we want to display
        cleanUser.name = singleUser.name.first+" "+singleUser.name.last
        cleanUser.email = singleUser.email
        cleanUser.phone = singleUser.phone
        cleanUser.dob = singleUser.dob.date
        cleanUser.image = singleUser.picture.thumbnail
        cleanEmpArr.push(cleanUser)
      })
      // console log for testing
      console.log(cleanEmpArr)
      // setting new state
      setState({...state, filtArray:cleanEmpArr,empArray:cleanEmpArr})
    })
    // Stopping the map loop with []
  },[])

// Grabbing the info from search bar
  const handleTyping= (e) => {
    // console logs for testing
    console.log(e.target.value)
    console.log(e.target.value.length)
    // empty array for filtered by typing
    var newFiltArray = []
    // looping to "filter" employees
    state.empArray.map((singleEmp) => {
      var compareStr = ""
      for (var i = 0; i < e.target.value.length; i++){
        // comparing typed string to employee name
        compareStr += singleEmp.name[i]
      }
      // console log for testing
      console.log(compareStr)
      // comparing target value to the compared string
      if (e.target.value.toLowerCase() === compareStr.toLocaleLowerCase()){
        console.log("returned from the search", singleEmp.name)
        // pushing into the filtered array
        newFiltArray.push(singleEmp)
      }
    })
    // setting the state of the filtered array
    setState({...state, filtArray:newFiltArray})
  }

  // html elements
  return (
    <div className="container">
      <br></br>
      <div className="card">
        <div className="container text-center">
          <br></br>
          <form className="form">
            {/* handle typing called to compare typed search with arrays */}
            <input onChange={handleTyping} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <br></br>
        </div>
        <div className="content">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">DOB</th>
              </tr>
            </thead>
            <tbody>
              {/* looping through the filtered array and printing each employee in array */}
              { state.filtArray.map((singleEmp)=>{
                  return(
                    <tr>
                      <th scope="row"><img src={singleEmp.image}/></th>
                      <td>{singleEmp.name}</td>
                      <td>{singleEmp.phone}</td>
                      <td>{singleEmp.email}</td>
                      <td>{singleEmp.dob}</td>
                    </tr>
                  )
                })
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Search;